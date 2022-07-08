const {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} = require("unique-names-generator");

module.exports = {
  isRunFlagPresent: (args) => {
    args = args.slice(2);
    return args.length > 0 && args[0] === "--run";
  },

  getRandomPublisherName: () => {
    return uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
      separator: "-",
      length: 3,
    });
  },
};
