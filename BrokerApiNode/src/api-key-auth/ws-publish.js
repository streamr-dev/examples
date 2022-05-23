const WebSocket = require("ws").WebSocket;
const BrokerConfig = require("./config.json");
const { isRunFlagPresent, getRandomPublisherName } = require("../util");

const API_KEY = BrokerConfig.apiAuthentication.keys[0];

const main = async (PORT = 7071) => {
  return new Promise((resolve, reject) => {
    try {
      const streamId =
        "0x00de714cbad811af322f539a043ec71eab7fa3a5/broker-example";
      const ws = new WebSocket(
        `ws://localhost:${PORT}/streams/${streamId}/publish?apiKey=${API_KEY}`
      );

      const publisherName = getRandomPublisherName();

      console.log(`Started WS publisher with name ${publisherName}`);

      ws.on("open", () => {
        const interval = setInterval(async () => {
          const message = {
            publisher: publisherName,
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

if (isRunFlagPresent(process.argv)) {
  main();
}

module.exports = main;
