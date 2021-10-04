import { createClient } from './create.js'

const main = async () => {
    // Create a stream for this example if it doesn't exist
    const { stream, client } = await createClient()

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
