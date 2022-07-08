const WsPublish = require("../src/ws-publish");
const WsSubscribe = require("../src/ws-subscribe");

let BrokerConfig = require("../src/config.json");
const { expectConsoleLogs, startBroker, assignPluginPorts } = require("./util");

describe("WS", () => {
  let broker;

  BrokerConfig = assignPluginPorts(BrokerConfig, {
    http: 5021,
    websocket: 5022,
    mqtt: 5023,
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
    await WsSubscribe(BrokerConfig.plugins.websocket.port);
    expectConsoleLogs(["websocket listener connected"]);
  });

  it("should exercise the `publish` example", async () => {
    const { interval } = await WsPublish(BrokerConfig.plugins.websocket.port);
    expectConsoleLogs(["Sent successfully: "]);
    clearInterval(interval);
  });
});
