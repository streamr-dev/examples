import { StreamrClient } from 'streamr-client'
import { config } from './config.js'
import { utils } from './utils.js'



/*
(node:40016) UnhandledPromiseRejectionWarning: TypeError: client.unsubscribeAll is not a function
*/
const main = async () => {
    const PRIVATE_KEY = config.privateKey

    if (!utils.isValidPrivateKey(PRIVATE_KEY)) {
        console.log('You need to register a Streamr account and get a Private Key before you can use this example.')
        process.exit(1)
    }
    // Create the client using the validated private key
    const client = new StreamrClient({
        auth: {
            privateKey: PRIVATE_KEY,
        },
    })

    // Create the default stream
    const stream = await client.getOrCreateStream({
        id: `${await client.getAddress()}/light-node-js-example`
    })
    console.log('Stream fetched:', stream.id)
    const sub = await client.subscribe({ stream: stream.id })
    console.log(`Subscribed to stream ${stream.id}`)
    const streams = await client.unsubscribeAll()
    console.log(`Unsubscribed from all streams`)
    console.log(streams)
    process.exit(0)
}

main()
