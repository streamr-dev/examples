const { StreamrClient } = require("streamr-client").StreamrClient;
const utils = require("../utils.js");
const { PrivateKey } = require("../config.js");

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
  const storageNodeAddress = utils.getStorageNodeAddress(process.argv);

  // Create the default stream
  const stream = await client.getOrCreateStream({
    id: `/light-node-js-example/storage-node`,
  });

  console.log("fetched/created stream", stream.id);
  if ((await stream.getStorageNodes().length) === 0) {
    await stream.addToStorageNode(storageNodeAddress);
  }

  const storageNodes = await stream.getStorageNodes();
  console.log("Storage nodes", storageNodes);
  await client.destroy();
  return stream.id;
};

if (utils.isRunFlagPresent(process.argv)) {
  main();
}

module.exports = main;
