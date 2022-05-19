const mqtt = require("mqtt");
const { isRunFlagPresent, getRandomPublisherName } = require("./util");

const main = async (port = 9092) => {
  return new Promise((resolve, reject) => {
    try {
      const streamId =
        "0x00de714cbad811af322f539a043ec71eab7fa3a5/broker-example";
      const client = mqtt.connect(`mqtt://localhost:${port}`);

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
          client.publish(streamId, JSON.stringify(message));
          console.log("Sent successfully: ", message);
          resolve({ interval });
        }, 1000);
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
