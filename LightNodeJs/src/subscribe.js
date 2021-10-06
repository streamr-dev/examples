import { StreamrClient } from 'streamr-client'
import { config } from './config.js'
import { utils } from './utils.js'

const onMessage = (message) => {
    console.log(JSON.stringify(message))
}
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

    const sub = await client.subscribe(
        { stream: stream.id },
        onMessage
    )
}

main()
