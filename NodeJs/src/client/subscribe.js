import { createClient } from './create.js'

const onMessage = (message) => {
    console.log(JSON.stringify(message))
}

const main = async () => {
    const { stream, client } = await createClient()
    console.log('Stream fetched:', stream.id)
    const sub = await client.subscribe(
        { stream: stream.id },
        onMessage
    )
}

main()
