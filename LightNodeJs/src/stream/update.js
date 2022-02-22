const StreamrClient = require("streamr-client");
const utils = require("../utils.js");
const { PrivateKey } = require("../config.js");

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
  console.log("created stream", stream.id);
  stream.description = `Description ${Date.now()}`;
  await stream.update();
  console.log("Stream updated:", stream.id, stream.description);
};

if (utils.isRunFlagPresent(process.argv)) {
  main();
}

module.exports = main;
