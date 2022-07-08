const WsApiPublish = require("../../src/api-key-auth/ws-publish");
const WsApiSubscribe = require("../../src/api-key-auth/ws-subscribe");

let BrokerConfig = require("../../src/api-key-auth/config.json");
const {
  expectConsoleLogs,
  startBroker,
  assignPluginPorts,
} = require("../util");

describe("WS:Api-Key", () => {
  let broker;

  BrokerConfig = assignPluginPorts(BrokerConfig, {
    http: 9021,
    websocket: 9022,
    mqtt: 9023,
  });

  beforeAll(async () => {
    broker = await startBroker(BrokerConfig);
  }, 5 * 1000);

  afterAll(async () => {
    await broker.stop();
  });

  beforeEach(() => {
    console.log = jest.fn();
  });

  it("should exercise the `subscribe` example", async () => {
    WsApiSubscribe(BrokerConfig.plugins.websocket.port);
    expectConsoleLogs(["websocket listener connected"]);
  });

  it("should exercise the `publish` example", async () => {
    const { interval } = await WsApiPublish(
      BrokerConfig.plugins.websocket.port
    );
    expectConsoleLogs(["Sent successfully: "]);
    clearInterval(interval);
  });
});
