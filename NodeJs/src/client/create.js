import { StreamrClient, StreamOperation } from 'streamr-client'
import { config } from './config.js'
import { utils } from '../utils.js'

export const createClient = async () => {
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


    const stream = await client.getOrCreateStream({
        id: `${await client.getAddress()}/node-example-data`
    })

    await stream.grantPermission(StreamOperation.STREAM_GET, undefined)
    await stream.grantPermission(StreamOperation.STREAM_SUBSCRIBE, undefined)
    await stream.grantPermission(StreamOperation.STREAM_PUBLISH, undefined)

    return {client, stream}
}