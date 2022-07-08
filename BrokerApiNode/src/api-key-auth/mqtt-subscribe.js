const mqtt = require("mqtt");
const BrokerConfig = require("./config.json");
const util = require("../util");

const API_KEY = BrokerConfig.apiAuthentication.keys[0];

const main = async (PORT = 7072) => {
  return new Promise((resolve, reject) => {
    try {
      const streamId =
        "0x00de714cbad811af322f539a043ec71eab7fa3a5/broker-example";
      const client = mqtt.connect(`mqtt://localhost:${PORT}`, {
        username: "",
        password: API_KEY,
      });

      client.on("connect", () => {
        client.subscribe(streamId, (err) => {
          console.log("mqtt subscribe connected");
          client.on("message", (streamId, rawData) => {
            const json = rawData.toString();
            const data = JSON.parse(json);
            console.log("Received data: ", data);
          });
          resolve();
        });
      });
    } catch (e) {
      reject(e);
    }
  });
};

if (util.isRunFlagPresent(process.argv)) {
  main();
}

module.exports = main;
