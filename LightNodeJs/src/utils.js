import { StreamrClient, StreamOperation } from 'streamr-client'
import { Wallet } from 'ethers'
import { config } from './config.js'

export const utils = {
    isValidPrivateKey: (privateKey) => {
        try {
            new Wallet(privateKey)
            return true
        } catch (e){
            console.error(e)
            return false
        }
    },

    createClient: async () => {
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
    
        // Get or create the default stream
        const stream = await client.getOrCreateStream({
            id: `${await client.getAddress()}/node-example-data`
        })
        // And ensure it is publically available
        await stream.grantPermission(StreamOperation.STREAM_GET, undefined)
        await stream.grantPermission(StreamOperation.STREAM_SUBSCRIBE, undefined)
        await stream.grantPermission(StreamOperation.STREAM_PUBLISH, undefined)
    
        return {client, stream}
    }

}

