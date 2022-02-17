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

  // grant public permission
  await stream.grantPublicPermission(StreamPermission.SUBSCRIBE);
  console.log("Granted public permission for subscribe");
  let permissions = await stream.getPermissions();
  console.log("Permission granted", permissions);
  // revoke the public permission
  await stream.revokePublicPermission(StreamPermission.SUBSCRIBE);
  console.log("Revoked public permission");
  permissions = await stream.getPermissions();
  console.log("Permission revoked", permissions);
  await client.destroy();
  return stream.id;
};

if (utils.isRunFlagPresent(process.argv)) {
  main();
}

module.exports = main;
