const HttpPublish = require('../src/http-publish')
const BrokerConfig = require('../src/config.json')
const { expectConsoleLogs, startBroker} = require('./util')

describe('HTTP:Publish', () => {
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
        const {interval, httpResponse} = await HttpPublish()
        expectConsoleLogs([
            'Sent successfully: '
        ])
        expect(httpResponse.statusCode).toBe(200)
        clearInterval(interval)
    })
})