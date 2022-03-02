const revokePermissions = require("../src/stream/permissions/revokePermissions.js");
const hasPermission = require("../src/stream/permissions/hasPermission.js");
const getPermissions = require("../src/stream/permissions/getPermissions.js");
const grantPermissions = require("../src/stream/permissions/grantPermissions.js");

const { expectConsoleLogs, TimeoutMs } = require("./utils.js");

describe("Stream", () => {
  beforeEach(() => {
    console.log = jest.fn();
  });

  it("should exercise the `getPermissions` example", async () => {
    const { streamId, permissions } = await getPermissions();
    expect(permissions.length).toBeGreaterThan(0);
    expectConsoleLogs([`Stream ${streamId} created`, "Permissions"]);
  });

  
  it("should exercise the `grantPermission` example", async () => {
    const streamId = await grantPermissions();
    expectConsoleLogs([`Stream ${streamId} created`, "Subscribe user permission granted for stream",
    'Subscribe public permission granted for stream',
    'Permissions'
  ]);
  }, TimeoutMs);

  it("should exercise the `hasPermission` example", async () => {
    const streamId = await hasPermission();
    expectConsoleLogs([
      `Stream ${streamId} created`,
      "hasPermission? no",
      "hasPermission? yes",
    ]);
  }, 2 * TimeoutMs);

  it("should exercise the `revokePermission` example", async () => {
    await revokePermissions();
    expectConsoleLogs(["Permission granted", "Permission revoked"]);
  }, TimeoutMs);
});
