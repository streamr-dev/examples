const create = require('../src/encryption/create.js')
const publish = require('../src/encryption/publish.js')
const subscribe = require('../src/encryption/subscribe.js')

const expectConsoleLogs = (logs) => {
    // only evaluates the first element of the console log, if given comma-separated
    for (let i = 0; i < logs.length; i++){
        expect(console.log.mock.calls[i][0]).toBe(logs[i])
    }
}

describe('Client', () => {
    beforeEach (() => {
        console.log = jest.fn()
    })
    
    it ('should exercise the `create` example', async () => {
        const res = await create()
        expectConsoleLogs([
            'Encrypted stream created'
        ])
    })

    it ('should exercise the `publish` example', async () => {
        const { client, interval} = await publish()
        clearInterval(interval)
        expectConsoleLogs([
            'Sent successfully: '
        ])   
        await client.destroy()     
    })

    it ('should exercise the `subscribe` example', async () => {
        const { client, subscription} = await subscribe()
        expectConsoleLogs([
            'subscription created'
        ])   
        await client.destroy()   
    })
})