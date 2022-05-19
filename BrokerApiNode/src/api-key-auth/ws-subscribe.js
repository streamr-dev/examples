const WebSocket = require("ws").WebSocket;
const BrokerConfig = require("./config.json");
const util = require("../util");

const API_KEY = BrokerConfig.apiAuthentication.keys[0];

const main = async (PORT = 7071) => {
  return new Promise((resolve, reject) => {
    try {
      const streamId = encodeURIComponent(
        "0x00de714cbad811af322f539a043ec71eab7fa3a5/broker-example"
      );
      const ws = new WebSocket(
        `ws://localhost:${PORT}/streams/${streamId}/subscribe?apiKey=${API_KEY}`
      );

      ws.on("message", (json) => {
        const data = JSON.parse(json);
        console.log("Received data: ", data);
      });
      console.log("websocket listener connected");

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

if (util.isRunFlagPresent(process.argv)) {
  main();
}

module.exports = main;
