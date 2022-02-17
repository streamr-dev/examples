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
  console.log("client created");

  // Create the default stream
  const stream = await client.getOrCreateStream({
    id: `/light-node-js-example`,
  });

  const subscription = await client.subscribe(
    { stream: stream.id },
    (message) => {
      console.log(JSON.stringify(message));
    }
  );
  console.log("subscription created");
  return { client, subscription };
};

if (utils.isRunFlagPresent(process.argv)) {
  main();
}

module.exports = main;
