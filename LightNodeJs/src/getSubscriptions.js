import { utils } from './utils.js'

const main = async () => {
    
    const { stream, client } = await utils.createClient()
    
    // subscribe to the default stream 
    await client.subscribe({ stream: stream.id })
    const subs = client.getSubscriptions()
    console.log('subscriptions', subs)
    await client.destroy()
    process.exit(0)
}

main()