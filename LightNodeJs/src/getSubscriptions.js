import { StreamrClient } from 'streamr-client'
import { config } from './config.js'
import { utils } from './utils.js'

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
    // subscribe to the default stream 
    await client.subscribe({ stream: stream.id })
    const subs = client.getSubscriptions()
    console.log('subscriptions', subs)
    await client.destroy()
    process.exit(0)
}

main()