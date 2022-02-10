module.exports = {
  isRunFlagPresent: (args) => {
    args = args.slice(2);
    return args.length > 0 && args[0] === "--run";
  },
};
