const WsApiPublish = require('../src/ws-publish')
const WsApiSubscribe = require('../src/ws-subscribe')

let BrokerConfig = require('../src/config.json')
const { expectConsoleLogs, startBroker, assignPluginPorts} = require('./util')

describe('WS', () => {
    let broker

    BrokerConfig = assignPluginPorts(BrokerConfig, {
        http: 5021,
        websocket: 5022,
        mqtt: 5023,
    })

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
        const {interval, publishResponse} = await WsApiPublish(BrokerConfig.plugins.websocket.port)
        expectConsoleLogs([
            'Sent successfully: '
        ])
        expect(publishResponse).toBe(200)
        clearInterval(interval)
    })

    it ('should exercise the `subscribe` example', async () => {
        const {interval, httpResponse} = await WsApiSubscribe(BrokerConfig.plugins.websocket.port)
        expectConsoleLogs([
            'Received data: '
        ])
        expect(httpResponse.statusCode).toBe(200)
        clearInterval(interval)
    })
})
