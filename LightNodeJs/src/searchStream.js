const { StreamrClient, StreamPermission } = require("streamr-client");
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

  const streams = client.searchStreams("light-node-js-example", {
    user: await client.getAddress(),
    //allOf?: StreamPermission[];
    anyOf: [StreamPermission.SUBSCRIBE],
    allowPublic: true,
  });

  const foundStreams = [];

  for await (const stream of streams) {
    foundStreams.push(stream.id);
  }

  console.log("streams found:", foundStreams.length, foundStreams);

  return streams;
};

if (utils.isRunFlagPresent(process.argv)) {
  main();
}

module.exports = main;
