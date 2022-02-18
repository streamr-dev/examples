const { StreamrClient } = require("streamr-client");
const utils = require("../utils.js");
const { PrivateKey } = require("../config.js");

const main = async () => {
  return new Promise(async (resolve, reject) => {
    try {
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

      const sub = await client.subscribe({ stream: stream.id }, (message) => {
        console.log("client.subscribe:", message);
      });

      const interval = setInterval(async () => {
        const message = {
          type: "stream:publish",
          ts: Date.now(),
        };
        await stream.publish(message);
        console.log("Sent successfully: ", message);
        resolve({ client, interval });
      }, 1000);
    } catch (e) {
      reject(e);
    }
  });
};

if (utils.isRunFlagPresent(process.argv)) {
  main();
}

module.exports = main;
