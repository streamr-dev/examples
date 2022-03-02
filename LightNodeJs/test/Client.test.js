const createStream = require("../src/createStream.js");
const getOrCreateStream = require("../src/getOrCreateStream.js");
const getStream = require("../src/getStream.js");
const getSubscriptions = require("../src/getSubscriptions.js");
const publish = require("../src/publish.js");
const subscribe = require("../src/subscribe.js");
const unsubscribe = require("../src/unsubscribe.js");
const unsubscribeAll = require("../src/unsubscribeAll.js");
const resend = require("../src/resend.js");
const { expectConsoleLogs, TimeoutMs } = require("./utils.js");


describe("Client", () => {
  beforeEach(() => {
    console.log = jest.fn();
  });

  it(
    "should exercise the `createStream` example",
    async () => {
      await createStream();
      expectConsoleLogs(["Stream created:"]);
    },
    TimeoutMs
  );

  it(
    "should exercise the `getOrCreateStream` example",
    async () => {
      await getOrCreateStream();
      expectConsoleLogs(["Stream fetched/created: "]);
    },
    TimeoutMs
  );

  it("should exercise the `getStream` example", async () => {
    const streamId = await getStream();
    expectConsoleLogs([`Stream ${streamId} fetched`]);
  });

  it("should exercise the `getSubscriptions` example", async () => {
    const subscriptions = await getSubscriptions();
    expectConsoleLogs(["subscriptions"]);
    expect(subscriptions.length).toBe(1);
  });

  it("should exercise the `publish` example", async () => {
    await publish({ isTest: true });
    expectConsoleLogs(["Sent successfully: "]);
  });

  it(
    "should exercise the `resend` example",
    async () => {
      await resend();
      expectConsoleLogs([
        "Stream fetched:",
        "publish:",
        "publish:",
        "publish:",
        "publish:",
        "publish:",
        "publish:",
        "all messages resent",
        "resend:",
        "resend:",
        "resend:",
        "resend:",
        "resend:",
        "resend:",
        "all messages resent",
      ]);
    },
    TimeoutMs
  );

  it(
    "should exercise the `subscribe` example",
    async () => {
      await subscribe({ isTest: true });
      expectConsoleLogs(["client created", "subscription created"]);
    },
    TimeoutMs
  );

  it("should exercise the `unsubscribe` example", async () => {
    const streamId = await unsubscribe();
    expectConsoleLogs([
      "Stream fetched:",
      `Subscribed to stream ${streamId}`,
      `Unsubscribed from stream ${streamId}`,
    ]);
  });

  it("should exercise the `unsubscribeAll` example", async () => {
    const streamId = await unsubscribeAll();
    expectConsoleLogs([
      "Stream fetched:",
      `Subscribed to stream ${streamId}`,
      `Unsubscribed from all streams`,
    ]);
  });
});
