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

  console.log(`Stream ${stream.id} created`);

  await stream.grantPublicPermission(StreamPermission.SUBSCRIBE);
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
