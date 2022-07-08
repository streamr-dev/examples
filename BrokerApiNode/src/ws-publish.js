const WebSocket = require("ws").WebSocket;
const { isRunFlagPresent, getRandomPublisherName } = require("./util");

const main = async (port = 9091) => {
  return new Promise((resolve, reject) => {
    try {
      const streamId =
        "0x00de714cbad811af322f539a043ec71eab7fa3a5/broker-example";
      const ws = new WebSocket(
        `ws://localhost:${port}/streams/${streamId}/publish`
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
