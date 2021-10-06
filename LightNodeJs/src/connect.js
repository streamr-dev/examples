import { StreamrClient } from 'streamr-client'
import { utils }from './utils.js'
import { config } from './config.js'

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
    // You can manually connect/disconnect the client 
    //await client.stop()
    console.log('is client connected?', client.isOpen)
    //await client.destroy()
    console.log('is client connected?', client.isStopped)
}

main()