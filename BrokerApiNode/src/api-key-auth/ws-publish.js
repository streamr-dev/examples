const WebSocket = require("ws").WebSocket;
const BrokerConfig = require("./config.json");
const util = require("../util");
// Documented on the following test:
// https://github.com/streamr-dev/network-monorepo/blob/main/packages/broker/test/integration/plugins/websocket/WebsocketPlugin.test.ts

const API_KEY = BrokerConfig.apiAuthentication.keys[0];

const main = async (PORT = 7071) => {
  return new Promise((resolve, reject) => {
    try {
      const streamId =
        "0x734b1035c36202236b1c009efe2d5e27bed2ff9c/broker-node-example";
      const ws = new WebSocket(
        `ws://localhost:${PORT}/streams/${streamId}/publish?apiKey=${API_KEY}`
      );

      ws.on("open", () => {
        const interval = setInterval(async () => {
          const message = {
            type: "broker:ws:publish",
            ts: Date.now(),
          };

          ws.send(JSON.stringify(message));
          console.log("Sent successfully: ", message);
          resolve({ interval });
        }, 1000);
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
