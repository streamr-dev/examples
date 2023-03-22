const { StreamPermission, StreamrClient } = require("streamr-client");
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
  // grant public permissions for subscribe
  let hasPermission = await stream.hasPermission({
    user: address,
    permission: StreamPermission.SUBSCRIBE,
    allowPublic: true,
  });

  console.log(`hasPermission? ${hasPermission ? "yes" : "no"}`);

  await stream.grantPermissions({
    user: address,
    permissions: [StreamPermission.SUBSCRIBE],
  });

  hasPermission = await stream.hasPermission({
    user: address,
    permission: StreamPermission.SUBSCRIBE,
    allowPublic: true,
  });

  console.log(`hasPermission? ${hasPermission ? "yes" : "no"}`);
  await client.destroy();
  return stream.id;
};

if (utils.isRunFlagPresent(process.argv)) {
  main();
}

module.exports = main;
