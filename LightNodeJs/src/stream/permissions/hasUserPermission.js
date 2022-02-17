const { StreamPermission, StreamrClient } =
  require("streamr-client").StreamrClient;
const utils = require("../../utils.js");
const { PrivateKey } = require("../../config.js");

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
  const { address } = StreamrClient.generateEthereumAccount();
  // grant public permissions for subscribe
  let hasPermission = await stream.hasUserPermission(
    StreamPermission.SUBSCRIBE,
    address
  );
  console.log(`hasPermission? ${hasPermission ? "yes" : "no"}`);

  await stream.grantUserPermission(StreamPermission.SUBSCRIBE, address);
  hasPermission = await stream.hasUserPermission(
    StreamPermission.SUBSCRIBE,
    address
  );

  console.log(`hasPermission? ${hasPermission ? "yes" : "no"}`);
  await client.destroy();
  return stream.id;
};

if (utils.isRunFlagPresent(process.argv)) {
  main();
}

module.exports = main;
