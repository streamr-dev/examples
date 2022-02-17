const { STREAMR_STORAGE_NODE_GERMANY, StreamrClient } =
  require("streamr-client");
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
  const stream = await client.getOrCreateStream({
    id: `/light-node-js-example/storage-node`,
  });
  console.log('fetched/created stream', stream.id);
  const storageNodes = await stream.getStorageNodes()
  if (storageNodes.length === 0){
    await stream.addToStorageNode(STREAMR_STORAGE_NODE_GERMANY);
    console.log("Stream added to storage node");
  } else {
    console.log('stream was already in storage node')
  }


  await client.destroy();
  return stream.id;
};

if (utils.isRunFlagPresent(process.argv)) {
  main();
}

module.exports = main;
