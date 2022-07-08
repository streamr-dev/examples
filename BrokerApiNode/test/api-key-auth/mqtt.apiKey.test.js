const MqttApiPublish = require("../../src/api-key-auth/mqtt-publish");
const MqttApiSubscribe = require("../../src/api-key-auth/mqtt-subscribe");

let BrokerConfig = require("../../src/api-key-auth/config.json");
const {
  expectConsoleLogs,
  startBroker,
  assignPluginPorts,
} = require("../util");

describe("MQTT:Api-Key", () => {
  let broker;

  BrokerConfig = assignPluginPorts(BrokerConfig, {
    http: 7021,
    websocket: 7022,
    mqtt: 7023,
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

  it("should exercise the `publish` example", async () => {
    const { interval } = await MqttApiPublish(BrokerConfig.plugins.mqtt.port);
    expectConsoleLogs(["mqtt listener connected"]);
    clearInterval(interval);
  });

  it("should exercise the `subscribe` example", async () => {
    await MqttApiSubscribe(BrokerConfig.plugins.mqtt.port);
    expectConsoleLogs(["mqtt subscribe connected"]);
  });
});
