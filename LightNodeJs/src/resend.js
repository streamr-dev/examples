const { STREAMR_STORAGE_NODE_GERMANY, StreamrClient } =
  require("streamr-client").StreamrClient;
const utils = require("./utils.js");
const config = require("./config.js");

const main = async () => {
  const PRIVATE_KEY = config.privateKey;

  if (!utils.isValidPrivateKey(PRIVATE_KEY)) {
    console.log(
      "You need to register a Streamr account and get a Private Key before you can use this example."
    );
    process.exit(1);
  }
  // Create the client using the validated private key
  const client = new StreamrClient({
    auth: {
      privateKey: PRIVATE_KEY,
    },
  });

  // Create the default stream
  const stream = await client.getOrCreateStream({
    id: `${await client.getAddress()}/light-node-js-example`,
  });

  const storageNodes = await stream.getStorageNodes();
  if (storageNodes.length === 0) {
    await stream.addToStorageNode(STREAMR_STORAGE_NODE_GERMANY);
    console.log("Stream added to storage node");
  }

  await stream.publish({ id: 0 });
  await stream.publish({ id: 1 });
  await stream.publish({ id: 2 });

  // ensure that the stream is being stored!
  console.log("Stream fetched:", stream.id);
  const sub = await client.resendSubscribe(
    {
      stream: stream.id,
      resend: {
        // should see the recently send messages, along with 3 identical ones from storage
        last: 6,
      },
    },
    (message) => {
      // Do something with the messages as they are received
      console.log(JSON.stringify(message));
    }
  );
};

if (utils.isRunFlagPresent(process.argv)) {
  main();
}

module.exports = main;
