const superagent = require("superagent");
const BrokerConfig = require("./config.json");
const util = require("../util");

const API_KEY = BrokerConfig.apiAuthentication.keys[0];

const main = async () => {
  return new Promise((resolve, reject) => {
    try {
      const streamId = encodeURIComponent(
        "0x734b1035c36202236b1c009efe2d5e27bed2ff9c/broker-node-example"
      );
      const url = `http://localhost:7073/streams/${streamId}`;

      const interval = setInterval(async () => {
        const message = {
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

if (util.isRunFlagPresent(process.argv)) {
  main();
}

module.exports = main;
