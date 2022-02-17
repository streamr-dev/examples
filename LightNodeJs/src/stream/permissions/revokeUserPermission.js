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
  const stream = await client.createStream({
    id: `/light-node-js-example/${Date.now()}`,
  });

  const { address } = StreamrClient.generateEthereumAccount();

  // grant user permission
  await stream.grantUserPermission(StreamPermission.SUBSCRIBE, address);
  console.log("Granted user permission for subscribe");
  let permissions = await stream.getPermissions();
  console.log("Permission granted", permissions);
  // revoke the user permission
  await stream.revokeUserPermission(StreamPermission.SUBSCRIBE, address);
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
