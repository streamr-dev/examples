import { utils } from './utils.js'

const main = async () => {
    const { stream, client } = await utils.createClient()
    console.log('Stream fetched:', stream.id)
    const sub = await client.subscribe({ stream: stream.id })
    console.log(`Subscribed to stream ${stream.id}`)
    await client.unsubscribe({stream: stream.id})
    console.log(`Unsubscribed from stream ${stream.id}`)
    process.exit(0)
}

main()
