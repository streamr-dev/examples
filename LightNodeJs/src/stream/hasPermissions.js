import { StreamrClient, StreamOperation } from 'streamr-client'
import { config } from '../config.js'
import { utils } from '../utils.js'

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
        id: `${await client.getAddress()}/${Date.now()}`
    })
    
    console.log(`Stream ${stream.id} created`)
    // grant public permissions for subscribe
    let hasPermission = await stream.hasPermission(StreamOperation.STREAM_SUBSCRIBE, undefined)
    console.log('hasPermission?', hasPermission)

    await stream.grantPermission(StreamOperation.STREAM_SUBSCRIBE, undefined)
    hasPermission = await stream.hasPermission(StreamOperation.STREAM_SUBSCRIBE, undefined)

    console.log('hasPermission?', hasPermission)
    process.exit(0)
}

main()
