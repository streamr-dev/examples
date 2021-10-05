import { utils } from './utils.js'

const onMessage = (message) => {
    console.log(JSON.stringify(message))
}

/*
(node:40016) UnhandledPromiseRejectionWarning: TypeError: client.unsubscribeAll is not a function
*/

const main = async () => {
    const { stream, client } = await utils.createClient()
    console.log('Stream fetched:', stream.id)
    const sub = await client.subscribe({ stream: stream.id })
    console.log(`Subscribed to stream ${stream.id}`)
    const streams = await client.unsubscribeAll()
    console.log(`Unsubscribed from all streams`)
    console.log(streams)
    process.exit(0)
}

main()
