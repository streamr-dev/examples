const WebSocket = require("ws").WebSocket;
const util = require("./util");

// Documented on the following test:
// https://github.com/streamr-dev/network-monorepo/blob/main/packages/broker/test/integration/plugins/websocket/WebsocketPlugin.test.ts

const main = async (port = 9091) => {
  return new Promise((resolve, reject) => {
    try {
      const streamId = encodeURIComponent(
        "0x734b1035c36202236b1c009efe2d5e27bed2ff9c/broker-node-example"
      );
      const ws = new WebSocket(
        `ws://localhost:${port}/streams/${streamId}/subscribe`
      );

      ws.on("message", (json) => {
        const data = JSON.parse(json);
        console.log("Received data: ", data);
        resolve(data);
      });
      console.log("websocket listener connected");
    } catch (e) {
      reject(e);
    }
  });
};

if (util.isRunFlagPresent(process.argv)) {
  main();
}

module.exports = main;
