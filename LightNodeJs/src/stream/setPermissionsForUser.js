const { StreamrClient } = require("streamr-client").StreamrClient;
const utils = require("../utils.js");
const config = require("../config.js");

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
  const stream = await client.createStream({
    id: `${await client.getAddress()}/light-node-js-example/${Date.now()}`,
  });

  console.log(`Stream ${stream.id} created`);

  const { address } = StreamrClient.generateEthereumAccount();

  await stream.setPermissionsForUser(
    address,
    false, // edit
    false, // delete
    true, // publish
    true, //subscribe
    true // share
  );
  console.log("Permissions updated for stream", stream.id);
  const permissions = await stream.getPermissions();
  console.log("Permissions", permissions);
  await client.destroy();
  return stream.id;
};

if (utils.isRunFlagPresent(process.argv)) {
  main();
}

module.exports = main;
