const StreamrClient = require("streamr-client");
const utils = require("./utils.js");
const { PrivateKey } = require("./config.js");
const main = async () => {
  utils.isValidPrivateKey(PrivateKey);
  // Create the client using the validated private key
  const client = new StreamrClient({
    auth: {
      privateKey: PrivateKey,
    },
  });

  // Get or create the default stream
  const stream = await client.getOrCreateStream({
    id: `/light-node-js-example/${Date.now()}`,
  });

  console.log("Stream fetched/created: ", stream.id);
  await client.destroy();
  return stream.id;
};

if (utils.isRunFlagPresent(process.argv)) {
  main();
}

module.exports = main;
