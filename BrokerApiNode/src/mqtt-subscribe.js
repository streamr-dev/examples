const mqtt = require("mqtt");
const util = require("./util");

// Documented on the following test:
// https://github.com/streamr-dev/network-monorepo/blob/main/packages/broker/test/integration/plugins/mqtt/MqttPlugin.test.ts

const main = async (port = 9092) => {
  return new Promise((resolve, reject) => {
    try {
      const streamId =
        "0x00de714cbad811af322f539a043ec71eab7fa3a5/broker-example";
      const client = mqtt.connect(`mqtt://localhost:${port}`);

      client.on("connect", () => {
        console.log("mqtt listener connected");
        client.subscribe(streamId, (err) => {
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
