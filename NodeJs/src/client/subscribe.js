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

const onMessage = (message) => {
    console.log(JSON.stringify(message))
}

const main = async () => {
    const stream = await client.getOrCreateStream({
        id: `${await client.getAddress()}/node-example-data`,
    })
    console.log('Stream fetched:', stream.id)
    const sub = await client.subscribe(
        { stream: stream.id },
        onMessage
    )
}

main()
