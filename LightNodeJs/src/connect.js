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

  console.log(
    "streamr client connected with address",
    await client.getAddress()
  );
  console.log(`is client destroyed? ${client.isDestroyed() ? "yes" : "no"}`);
  await client.destroy();
  console.log(`is client destroyed? ${client.isDestroyed() ? "yes" : "no"}`);
};

if (utils.isRunFlagPresent(process.argv)) {
  main();
}

module.exports = main;
