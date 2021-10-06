import { StreamrClient } from 'streamr-client'
import { config } from '../config.js'
import { utils } from '../utils.js'

// Error: VALIDATION_ERROR: Request Streamr:StreamrClient:27146-0:Rest-0 to https://streamr.network/api/v1/streams/0x75a34e85d8aA9ff106740f60CB37fEFc2f0deAF9%2F1633514146659/storageNodes returned with error code 422. '{"code":"VALIDATION_ERROR","message":"Invalid address:  (validator.invalid)"}'

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
        }
    })

    // Create the default stream
    const stream = await client.createStream({
        id: `${await client.getAddress()}/light-node-js-example`
    })
    
    console.log(`Stream ${stream.id} created`)

    await stream.addToStorageNode({
        address: '0x31546eEA76F2B2b3C5cC06B1c93601dc35c9D916',
        url: 'https://testnet2.streamr.network:8001'
    })

    console.log('Stream added to storage node')
    process.exit(0)
}

main()
