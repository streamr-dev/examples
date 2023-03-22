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

  const { address } = StreamrClient.generateEthereumAccount();

  // grant user permission
  await stream.grantPermissions({
    user: address,
    permissions: [StreamPermission.SUBSCRIBE],
  });
  console.log("Granted user permission for subscribe");
  let permissions = await stream.getPermissions();
  console.log("Permission granted", permissions);
  // revoke the user permission
  await stream.revokePermissions({
    user: address,
    permissions: [StreamPermission.SUBSCRIBE],
  });
  // or for a public permission revoke:
  // await stream.revokePermissions({ public: true, permissions: [StreamPermission.SUBSCRIBE] });
  console.log("Revoked user permission");
  permissions = await stream.getPermissions();
  console.log("Permission revoked", permissions);
  await client.destroy();
  return stream.id;
};

if (utils.isRunFlagPresent(process.argv)) {
  main();
}

module.exports = main;
