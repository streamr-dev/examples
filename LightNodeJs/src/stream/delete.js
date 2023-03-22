const StreamrClient = require("streamr-client");
const utils = require("../utils.js");
const { PrivateKey } = require("../config.js");

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
    id: `/light-node-js-example/delete`,
  });

  console.log("Stream created", stream.id);
  await stream.delete();

  console.log("Stream deleted");
};

if (utils.isRunFlagPresent(process.argv)) {
  main();
}

module.exports = main;
