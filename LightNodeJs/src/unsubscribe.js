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
  const stream = await client.getOrCreateStream({
    id: `/light-node-js-example`,
  });
  console.log("Stream fetched:", stream.id);
  const sub = await client.subscribe({ stream: stream.id });
  console.log(`Subscribed to stream ${stream.id}`);
  await client.unsubscribe({ stream: stream.id });
  console.log(`Unsubscribed from stream ${stream.id}`);
  await client.destroy();
  return stream.id;
};

if (utils.isRunFlagPresent(process.argv)) {
  main();
}

module.exports = main;
