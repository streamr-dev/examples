const { StreamrClient, StreamPermission } = require("streamr-client");
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


  const { address } = StreamrClient.generateEthereumAccount();

  await client.setPermissions({
    streamId: `${await client.getAddress()}/light-node-js-example/permissions`,
    assignments: [{
        user: address,
        permissions: [StreamPermission.SUBSCRIBE],
    }]
  }, {
    streamId: `${await client.getAddress()}/light-node-js-example`,
    assignments: [{
        user: address,
        permissions: [StreamPermission.PUBLISH],
    }, {
        public: true,
        permissions: [StreamPermission.SUBSCRIBE],
    }]
  })
  
  await client.destroy();
};

if (utils.isRunFlagPresent(process.argv)) {
  main();
}

module.exports = main;
