const HttpApiPublish = require('../src/http-api-publish')
const BrokerConfig = require('../src/config-api-key.json')

const expectConsoleLogs = (logs) => {
    // only evaluates the first element of the console log, if given comma-separated
    for (let i = 0; i < logs.length; i++){
        expect(console.log.mock.calls[i][0]).toBe(logs[i])
    }
}

describe('HTTP:Api-Key', () => {
    console.log('REMEMBER TO RUN `$ npm start broker:start-api-key` before launching the tests')

    beforeEach (() => {
        console.log = jest.fn()
    })
    
    it ('should excercise the `publish` example', async () => {
        const {interval, httpResponse} = await HttpApiPublish()
        expectConsoleLogs([
            'Sent successfully: '
        ])
        expect(httpResponse.statusCode).toBe(200)
        clearInterval(interval)
    })
})