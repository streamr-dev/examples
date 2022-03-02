const MqttPublish = require("../src/mqtt-publish");
const MqttSubscribe = require("../src/mqtt-subscribe");

let BrokerConfig = require("../src/config.json");
const {
  TimeoutMs,
  expectConsoleLogs,
  startBroker,
  assignPluginPorts,
} = require("./util");

describe("MQTT", () => {
  let broker;

  BrokerConfig = assignPluginPorts(BrokerConfig, {
    http: 4021,
    websocket: 4022,
    mqtt: 4023,
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
    await MqttSubscribe(BrokerConfig.plugins.mqtt.port);
    expectConsoleLogs(["mqtt listener connected"]);
  });

  it(
    "should exercise the `publish` example",
    async () => {
      const { interval } = await MqttPublish(BrokerConfig.plugins.mqtt.port);
      expectConsoleLogs(["mqtt listener connected", "Sent successfully: "]);
      clearInterval(interval);
    },
    TimeoutMs
  );
});
