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
    const stream = await client.getOrCreateStream({
        id: `${await client.getAddress()}/node-example-data`
    })
    setInterval(async () => {
        console.log('Stream fetched:', stream.id)
        // Generate a message payload with a random number
        const msg = { random: Math.random() } 
    
        // Publish the message to the Stream
        await client.publish(stream, msg)
        console.log('Sent successfully: ', msg)
    }, 1000)
    
}

main()