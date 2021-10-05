import { utils }from './utils.js'

const main = async () => {
    const { stream, client } = await utils.createClient()
    // You can manually connect/disconnect the client 
    //await client.stop()
    console.log('is client connected?', client.isOpen)
    //await client.destroy()
    console.log('is client connected?', client.isStopped)
}

main()