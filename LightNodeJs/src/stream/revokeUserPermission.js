const { StreamrClient, StreamPermission } =
  require("streamr-client").StreamrClient;
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

  const { address } = StreamrClient.generateEthereumAccount();

  // grant user permission
  await stream.grantUserPermission(StreamPermission.SUBSCRIBE, address);
  console.log("Granted user permission for subscribe");
  let permissions = await stream.getPermissions();
  console.log("Permission granted", permissions);
  // revoke the user permission
  await stream.revokeUserPermission(StreamPermission.SUBSCRIBE, address);
  console.log("Revoked user permission");
  permissions = await stream.getPermissions();
  console.log("Permission revoked", permissions);
  await client.destroy();
  return stream.id;
};

if (utils.isRunFlagPresent(process.argv)) {
  main();
}

module.exports = main;
