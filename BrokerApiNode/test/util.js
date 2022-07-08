const createBroker = require("streamr-broker/dist/src/broker.js").createBroker;
const { Wallet } = require("ethers");

exports.TimeoutMs = 30 * 1000;

(exports.wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))),
  (exports.expectConsoleLogs = (logs, ignoreSorting = false) => {
    // only evaluates the first element of the console log, if given comma-separated
    for (let i = 0; i < logs.length; i++) {
      if (
        // ignore the ethers warning about api usage
        console.log.mock.calls[i][0] === "========= NOTICE =========" ||
        //
        console.log.mock.calls[i][0] ===
          "Request-Rate Exceeded  (this message will not be repeated)"
      ) {
        logs.splice(i, 1);
        continue;
      }
      if (ignoreSorting) {
        // evaluate that the value exists in the log for highly-async cases, like resend
        //expect(console.log.mock.calls[i].includes(logs[i])).toBe(true)
        expect(logs.includes(console.log.mock.calls[i][0])).toBe(true);
      } else {
        // match each value in it's right position
        expect(console.log.mock.calls[i][0]).toBe(logs[i]);
      }
    }
  });

exports.TimeoutMs = 60 * 1000;

exports.startBroker = async (config) => {
  const broker = await createBroker({
    ...config,
    client: {
      ...config.client,
      auth: { privateKey: Wallet.createRandom().privateKey },
    },
  });
  await broker.start();
  return broker;
};

exports.assignPluginPorts = (config, ports) => {
  config.plugins.websocket.port = ports.websocket;
  config.plugins.mqtt.port = ports.mqtt;
  config.httpServer.port = ports.http;
  return config;
};
