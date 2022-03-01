const { Wallet } = require("ethers");
const { PrivateKey } = require("./config.js");
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
    return args.length > 0 && args[0] === "--run";
  },
};
