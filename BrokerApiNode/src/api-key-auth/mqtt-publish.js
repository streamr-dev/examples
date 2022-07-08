const mqtt = require("mqtt");
const BrokerConfig = require("./config.json");
const { isRunFlagPresent, getRandomPublisherName } = require("../util");

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

      const publisherName = getRandomPublisherName();

      console.log(`Started MQTT publisher with name ${publisherName}`);

      client.on("connect", () => {
        console.log("mqtt listener connected");
        const interval = setInterval(async () => {
          const message = {
            publisher: publisherName,
            type: "broker:mqtt:publish",
            ts: Date.now(),
          };
          const publishResponse = client.publish(
            streamId,
            JSON.stringify(message)
          );

          console.log("Sent successfully: ", message);
        }, 1000);
        resolve({ interval });
      });
    } catch (e) {
      reject(e);
    }
  });
};

if (isRunFlagPresent(process.argv)) {
  main();
}

module.exports = main;
