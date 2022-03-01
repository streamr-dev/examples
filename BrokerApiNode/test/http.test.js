const HttpPublish = require('../src/http-publish')
let BrokerConfig = require('../src/config.json')
const { expectConsoleLogs, startBroker, assignPluginPorts} = require('./util')

BrokerConfig = assignPluginPorts(BrokerConfig, {
    http: 3021,
    websocket: 3022,
    mqtt: 3023,
})

describe('HTTP', () => {
    let broker
    beforeAll(async () => {
        broker = await startBroker(BrokerConfig)
    }, 5 * 1000)

    afterAll(async () => {
        await broker.stop()
    })

    beforeEach (() => {
        console.log = jest.fn()
    })
    
    it ('should exercise the `publish` example', async () => {
        const {interval, httpResponse} = await HttpPublish(BrokerConfig.httpServer.port)
        expectConsoleLogs([
            'Sent successfully: '
        ])
        expect(httpResponse.statusCode).toBe(200)
        clearInterval(interval)
    })
})