const StreamrClient = require("streamr-client");
const utils = require("./utils.js");
const { PrivateKey } = require("./config.js");
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
  // subscribe to the default stream
  await client.subscribe({ stream: stream.id });
  const subs = await client.getSubscriptions();
  console.log("subscriptions", subs);
  await client.destroy();
  return subs;
};

if (utils.isRunFlagPresent(process.argv)) {
  main();
}

module.exports = main;
