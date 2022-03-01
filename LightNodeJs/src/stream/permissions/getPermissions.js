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

  const stream = await client.getOrCreateStream({
    id: `/light-node-js-example/permissions`,
  });

  console.log(`Stream ${stream.id} created`);

  const permissions = await stream.getPermissions();

  console.log("Permissions", permissions);
  await client.destroy();
  return { permissions, streamId: stream.id };
};

if (utils.isRunFlagPresent(process.argv)) {
  main();
}

module.exports = main;
