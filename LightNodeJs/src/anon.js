const { StreamrClient, StreamPermission } = require("streamr-client");

const utils = require("./utils.js");
const { PrivateKey } = require("./config.js");

const main = async () => {
  utils.isValidPrivateKey(PrivateKey);

  // Create the client using the validated private key
  const authClient = new StreamrClient({
    auth: {
      privateKey: PrivateKey,
    },
  });

  const stream = await authClient.getOrCreateStream({
    id: "/light-node-js-example/anon",
  });

  console.log("created/fetched stream with id", stream.id);
  // public permissions per each action are required to interact with the anon streamr-client
  const permissions = await stream.getPermissions();
  if (
    !permissions.public ||
    !permissions.public.includes(StreamPermission.SUBSCRIBE)
  ) {
    await stream.grantPermissions({
      public: true,
      permissions: [StreamPermission.SUBSCRIBE],
    });
    console.log("granted public subscribe permission on stream", stream.id);
  }
  // Create the client using no private key
  const anonClient = new StreamrClient();

  // this client can subscribe to public streams
  anonClient.subscribe(stream.id, (msg) => {
    console.log("Received:", msg);
  });

  console.log("anon client subscribed to stream", stream.id);
  setInterval(async () => {
    const message = {
      type: "client:publish",
      ts: Date.now(),
    };
    await authClient.publish(stream.id, message);

    console.log("Sent:", message);
  }, 1000);
};

if (utils.isRunFlagPresent(process.argv)) {
  main();
}

module.exports = main;
