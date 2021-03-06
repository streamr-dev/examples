const superagent = require("superagent");
const BrokerConfig = require("./config.json");
const { isRunFlagPresent, getRandomPublisherName } = require("../util");

const API_KEY = BrokerConfig.apiAuthentication.keys[0];

const main = async (PORT = 7073) => {
  return new Promise((resolve, reject) => {
    try {
      const streamId = encodeURIComponent(
        "0x00de714cbad811af322f539a043ec71eab7fa3a5/broker-example"
      );
      const url = `http://localhost:${PORT}/streams/${streamId}`;

      const publisherName = getRandomPublisherName();

      console.log(`Started HTTP publisher with name ${publisherName}`);

      const interval = setInterval(async () => {
        const message = {
          publisher: publisherName,
          type: "broker:http:publish",
          ts: Date.now(),
        };

        const httpResponse = await superagent
          .post(url)
          .set("Authorization", `bearer ${API_KEY}`)
          .set("Content-Type", "application/json")
          .send(message);

        console.log("Sent successfully: ", message);
        resolve({ interval, httpResponse });
      }, 1000);
    } catch (e) {
      reject(e);
    }
  });
};

if (isRunFlagPresent(process.argv)) {
  main();
}

module.exports = main;
