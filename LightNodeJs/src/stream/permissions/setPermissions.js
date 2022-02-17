const { StreamrClient, StreamPermission } =
  require("streamr-client").StreamrClient;
const utils = require("../../utils.js");
const { PrivateKey } = require("../../config.js");

const main = async () => {
  utils.isValidPrivateKey(PrivateKey);
  // Create the client using the validated private key
  const client = new StreamrClient({
    auth: {
      privateKey: PrivateKey,
    },
  });

  // Create the default stream
  const stream = await client.getOrCreateStream({
    id: `/light-node-js-example`,
  });

  console.log(`Stream ${stream.id} created`);

  const users = [
    StreamrClient.generateEthereumAccount().address,
    StreamrClient.generateEthereumAccount().address,
    StreamrClient.generateEthereumAccount().address,
  ];

  await stream.setPermissions(users, [
    StreamPermission.SUBSCRIBE,
    StreamPermission.SUBSCRIBE,
    StreamPermission.SUBSCRIBE,
  ]);
  console.log("Permissions updated for stream", stream.id);
  const permissions = await stream.getPermissions();
  console.log("Permissions", permissions);
  await client.destroy();
  return stream.id;
};

if (utils.isRunFlagPresent(process.argv)) {
  main();
}

module.exports = main;
