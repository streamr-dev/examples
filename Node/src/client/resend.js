import StreamrClient from 'streamr-client'
import { config } from './config.js'
import { utils } from '../utils.js'

const PRIVATE_KEY = config.privateKey

if (!utils.isValidPrivateKey(PRIVATE_KEY)) {
    console.log('You need to register a Streamr account and get a Private Key before you can use this example.')
    process.exit(0)
}

const client = new StreamrClient({
    auth: {
        privateKey: PRIVATE_KEY,
    },
})


const main = async () => {
    // Create a stream for this example if it doesn't exist
    const stream = await client.getOrCreateStream({
        id: `${await client.getAddress()}/node-example-data`,
    })
    // ensure that the stream is being stored!
    await stream.addToStorageNode({
        address: '0x31546eEA76F2B2b3C5cC06B1c93601dc35c9D916',
        url: 'https://testnet2.streamr.network:8001'
    })
    console.log('Stream fetched:', stream.id)
    const sub = await client.resendSubscribe(
        {
            stream: stream.id,
            resend: {
                last: 10,
            },
        },
        (message) => {
            // Do something with the messages as they are received
            console.log(JSON.stringify(message))
        },
    )
}

main()
