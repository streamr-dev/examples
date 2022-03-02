exports.TimeoutMs = 60 * 1000

exports.expectConsoleLogs = (logs) => {
    // only evaluates the first element of the console log, if given comma-separated
    for (let i = 0; i < logs.length; i++) {
        expect(console.log.mock.calls[i][0]).toBe(logs[i]);
    }
}
