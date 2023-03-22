const { StreamrClient, StreamPermission } = require("streamr-client");
const utils = require("../../utils.js");
const { PrivateKey } = require("../../config.js");

const main = async () => {
  utils.isValidPrivateKey(PrivateKey);
  // Create the client using the validated private key
  const clientConfig = utils.getClientConfig(process.argv);
  const client = new StreamrClient({
    ...clientConfig,
    auth: {
      privateKey: PrivateKey,
    },
  });

  // Create the default stream
  const stream = await client.getOrCreateStream({
    id: `/light-node-js-example/permissions`,
  });

  console.log(`Stream ${stream.id} created`);

  const { address } = StreamrClient.generateEthereumAccount();
  // granting a user permission
  await stream.grantPermissions({
    user: address,
    permissions: [StreamPermission.SUBSCRIBE],
  });
  console.log("Subscribe user permission granted for stream", stream.id);
  // or granting public permissions
  // await stream.grantPermissions({ public: true, permissions: [StreamPermission.SUBSCRIBE] });
  console.log("Subscribe public permission granted for stream", stream.id);
  const permissions = await stream.getPermissions();
  console.log("Permissions", permissions);

  await client.destroy();
  return stream.id;
};

if (utils.isRunFlagPresent(process.argv)) {
  main();
}

module.exports = main;
