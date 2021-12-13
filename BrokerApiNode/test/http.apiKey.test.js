const HttpApiPublish = require('../src/http-api-publish')
const BrokerConfig = require('../src/config-api-key.json')
const { expectConsoleLogs, startBroker, wait} = require('./util')

describe('HTTP:Api-Key:Publish', () => {
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
        const {interval, httpResponse} = await HttpApiPublish()
        expectConsoleLogs([
            'Sent successfully: '
        ])
        expect(httpResponse.statusCode).toBe(200)
        clearInterval(interval)
    })
})