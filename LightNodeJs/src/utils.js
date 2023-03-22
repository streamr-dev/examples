const { Wallet } = require("ethers");
const { CONFIG_TEST, STREAMR_STORAGE_NODE_GERMANY } = require("streamr-client");
const STREAMR_STORAGE_NODE_DOCKER = "0xde1112f631486CfC759A50196853011528bC5FA0";
module.exports = {
  isValidPrivateKey: (privateKey) => {
    try {
      const w = new Wallet(privateKey);
    } catch (e) {
      console.error(
        "You need to provide a Private Key under /src/config.js before you can execute this example."
      );
      process.exit(1);
    }
  },

  isRunFlagPresent: (args) => {
    args = args.slice(2);
    return args.includes("--run");
  },

  getClientConfig: (args) => {
    args = args.slice(2);
    if (args.includes("--dev")) {
      return CONFIG_TEST
    }

    return {}
  },

  getStorageNodeAddress: (args) => {
    args = args.slice(2);
    if (args.includes("--dev")) {
      return STREAMR_STORAGE_NODE_DOCKER
    }

    return STREAMR_STORAGE_NODE_GERMANY
  }
};
