const addToStorageNode = require("../src/stream/addToStorageNode.js");
const deleteExample = require('../src/stream/delete.js')
const getStorageNodes = require("../src/stream/getStorageNodes.js");
const publish = require("../src/stream/publish.js");
const removeFromStorageNode = require("../src/stream/removeFromStorageNode.js");
const update = require("../src/stream/update.js");
const { expectConsoleLogs, TimeoutMs } = require("./utils.js");


describe("Stream", () => {
  beforeEach(() => {
    console.log = jest.fn();
  });

  it("should exercise the `addToStorageNode` example", async () => {
    const streamId = await addToStorageNode();
    expectConsoleLogs([
      'fetched/created stream',
      'stream was already in storage node',
    ]);
  }, TimeoutMs);

  it ('should exercise the `delete` example', async () => {
    await deleteExample();
    expectConsoleLogs([
      'Stream created',
      'Stream deleted'
    ]);
  }, 2 * TimeoutMs)

  it ('should exercise the `getStorageNodes` example', async () => {
    await getStorageNodes();
    expectConsoleLogs([
      'fetched/created stream',
      'Storage nodes'
    ]);
  })

  it("should exercise the `publish` example", async () => {
    const { client, interval } = await publish();
    clearInterval(interval);
    expectConsoleLogs(["Sent successfully: "]);
    await client.destroy();
  });

  it ('should exercise the `removeFromStorageNode` example', async () => {
    await removeFromStorageNode();
    expectConsoleLogs([
      'fetched/created stream',
      'Stream removed from storage node'
    ]);
  }, TimeoutMs)

  it ('should exercise the `update` example', async () => {
    await update();
    expectConsoleLogs([
      'created stream',
      'Stream updated:'
    ]);
  }, 2 * TimeoutMs)
});
