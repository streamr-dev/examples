const StreamrClient = require("streamr-client");
const utils = require("./utils.js");
const { PrivateKey } = require("./config.js");
/*
(node:40016) UnhandledPromiseRejectionWarning: TypeError: client.unsubscribeAll is not a function
*/
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
    id: `/light-node-js-example`,
  });
  console.log("Stream fetched:", stream.id);
  const sub = await client.subscribe({ stream: stream.id });
  console.log(`Subscribed to stream ${stream.id}`);
  // when no streamId is given, `unsubscribe` will unsubscribe from all streams
  const streams = await client.unsubscribe();
  console.log(`Unsubscribed from all streams`);
  console.log(streams);
  await client.destroy();
  return stream.id;
};

if (utils.isRunFlagPresent(process.argv)) {
  main();
}

module.exports = main;
