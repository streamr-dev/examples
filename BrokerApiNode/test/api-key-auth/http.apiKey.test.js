const HttpApiPublish = require("../../src/api-key-auth/http-publish");
let BrokerConfig = require("../../src/api-key-auth/config.json");
const {
  expectConsoleLogs,
  startBroker,
  assignPluginPorts,
} = require("../util");

BrokerConfig = assignPluginPorts(BrokerConfig, {
  http: 6021,
  websocket: 6022,
  mqtt: 6023,
});

describe("HTTP:Api-Key", () => {
  let broker;

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
    const { interval, httpResponse } = await HttpApiPublish(
      BrokerConfig.httpServer.port
    );
    expectConsoleLogs(["Sent successfully: "]);
    expect(httpResponse.statusCode).toBe(200);
    clearInterval(interval);
  });
});
