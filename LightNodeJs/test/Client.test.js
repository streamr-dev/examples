const connect = require('../src/connect.js')
const createStream = require('../src/createStream.js')
const getOrCreateStream = require('../src/getOrCreateStream.js')
const getStream = require('../src/getStream.js')
const getSubscriptions = require('../src/getSubscriptions.js')
const publish = require('../src/publish.js')
const subscribe = require('../src/subscribe.js')
const unsubscribe = require('../src/unsubscribe.js')
const unsubscribeAll = require('../src/unsubscribeAll.js')

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
    
    it ('should exercise the `connect` example', async () => {
        const res = await connect()
        expectConsoleLogs([
            'streamr client connected',
            'is client destroyed? no',
            'is client destroyed? yes'
        ])
    })

    it ('should exercise the `createStream` example', async () => {
        const streamId = await createStream()
        expectConsoleLogs([
            `Stream ${streamId} created`
        ])
    }).timeout(30 * 1000)

    it ('should exercise the `getOrCreateStream` example', async () => {
        const streamId = await getOrCreateStream()
        expectConsoleLogs([
            `Stream ${streamId} fetched/created`
        ])
    })

    it ('should exercise the `getStream` example', async () => {
        const streamId = await getStream()
        expectConsoleLogs([
            `Stream ${streamId} created`,
            `Stream ${streamId} fetched`
        ])
    })

    it ('should exercise the `getSubscriptions` example', async () => {
        const subscriptions = await getSubscriptions()
        expectConsoleLogs([
            'subscriptions'
        ])
        expect(subscriptions.length).toBe(1)
    })

    it ('should exercise the `publish` example', async () => {
        const { client, interval} = await publish()
        clearInterval(interval)
        expectConsoleLogs([
            'Sent successfully: '
        ])   
        await client.destroy()     
    })

    it ('should exercise the `resend` example', async () => {
        // PENDING
    })

    it ('should exercise the `subscribe` example', async () => {
        const { client, subscription} = await subscribe()
        expectConsoleLogs([
            'client created',
            'subscription created'
        ])   
        await client.destroy()   
    })

    it ('should exercise the `unsubscribe` example', async () => {
        const streamId = await unsubscribe()
        expectConsoleLogs([
            'Stream fetched:',
            `Subscribed to stream ${streamId}`,
            `Unsubscribed from stream ${streamId}`
        ])
    })

    it ('should exercise the `unsubscribeAll` example', async () => {
        const streamId = await unsubscribeAll()
        expectConsoleLogs([
            'Stream fetched:',
            `Subscribed to stream ${streamId}`,
            `Unsubscribed from all streams`
        ])
    })
})