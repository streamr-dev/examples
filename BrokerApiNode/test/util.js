const createBroker = require('streamr-broker/dist/src/broker.js').createBroker

module.exports = {
    wait: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
    expectConsoleLogs: (logs) => {
        // only evaluates the first element of the console log, if given comma-separated
        for (let i = 0; i < logs.length; i++){
            expect(console.log.mock.calls[i][0]).toBe(logs[i])
        }
    },

    startBroker: async (config) => {
        const broker = await createBroker(config)
        await broker.start()
        return broker
    },

    assignPluginPorts: (config, ports) => {
        config.plugins.websocket.port = ports.websocket
        config.plugins.mqtt.port = ports.mqtt
        config.httpServer.port = ports.http
        return config
    }
}