const createBroker = require("streamr-broker/dist/src/broker.js").createBroker;
const { Wallet } = require('ethers')

exports.TimeoutMs = 30 * 1000;

(exports.wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))),
  (exports.expectConsoleLogs = (logs) => {
    // only evaluates the first element of the console log, if given comma-separated
    for (let i = 0; i < logs.length; i++) {
      expect(console.log.mock.calls[i][0]).toBe(logs[i]);
    }
  });

exports.startBroker = async (config) => {
  const broker = await createBroker({
    ...config, 
   client: { ...config.client, auth: {privateKey: Wallet.createRandom().privateKey}}
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
