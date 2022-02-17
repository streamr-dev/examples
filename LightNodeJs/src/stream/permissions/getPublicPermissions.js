const { StreamrClient } = require("streamr-client");
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
  const stream = await client.getStream(`/light-node-js-example`);

  console.log(`Stream ${stream.id} created`);

  const permissions = await stream.getPublicPermissions();

  console.log("Permissions", permissions);
  await client.destroy();
  return { permissions, streamId: stream.id };
};

if (utils.isRunFlagPresent(process.argv)) {
  main();
}

module.exports = main;
