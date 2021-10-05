import { utils } from './utils.js'

const main = async () => {
    const { stream, client } = await utils.createClient()
    setInterval(async () => {
        const message = { 
            type: 'client:publish',
            ts: Date.now(), 
        } 
        await client.publish(stream, message)
        console.log('Sent successfully: ', message)
    }, 1000)
}

main()