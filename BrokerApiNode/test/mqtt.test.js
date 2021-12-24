const MqttApiPublish = require('../src/mqtt-publish')
const MqttApiSubscribe = require('../src/mqtt-subscribe')

let BrokerConfig = require('../src/config.json')
const { expectConsoleLogs, startBroker, assignPluginPorts} = require('./util')

describe('MQTT', () => {
    let broker

    BrokerConfig = assignPluginPorts(BrokerConfig, {
        http: 4021,
        websocket: 4022,
        mqtt: 4023,
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
        const {interval, publishResponse} = await MqttApiPublish(BrokerConfig.plugins.mqtt.port)
        expectConsoleLogs([
            'Sent successfully: '
        ])
        expect(publishResponse).toBe(200)
        clearInterval(interval)
    })

    it ('should exercise the `subscribe` example', async () => {
        const {interval, httpResponse} = await MqttApiSubscribe(BrokerConfig.plugins.mqtt.port)
        expectConsoleLogs([
            'Sent successfully: '
        ])
        expect(httpResponse.statusCode).toBe(200)
        clearInterval(interval)
    })
})
