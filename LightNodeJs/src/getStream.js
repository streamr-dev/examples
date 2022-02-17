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

  // Create the default stream
  const stream = await client.createStream({
    id: `/light-node-js-example/${Date.now()}`,
  });

  console.log(`Stream ${stream.id} created`);

  // Now get the stream
  const fetchedStream = await client.getStream(stream.id);
  console.log(`Stream ${fetchedStream.id} fetched`);
  await client.destroy();
  return stream.id;
};

if (utils.isRunFlagPresent(process.argv)) {
  main();
}

module.exports = main;
