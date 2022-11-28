const {
  STREAMR_STORAGE_NODE_GERMANY,
  StreamrClient,
} = require("streamr-client");
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

  const subscription = await client.subscribe(
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

  const resend = await client.resend(
    stream.id,
    {
      // should see the recently send messages, along with 3 identical ones from storage
      last: 6,
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
