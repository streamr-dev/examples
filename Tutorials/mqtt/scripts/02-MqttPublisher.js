const mqtt = require('async-mqtt')

const StreamId = '0x123/your/stream/id'
const ApiKey = 'YOUR_API_KEY'

const main = async () => {
    const client = await mqtt.connectAsync('mqtt://localhost:1883', 
    {
        username: '',
        password: ApiKey,
    })
    console.log('connected')
    
    setInterval(async () => {
        const msg = {
            "greeting": "Hello world!",
        }
        await client.publish(StreamId, JSON.stringify(msg))
        console.log('Publishing: ', msg)
    }, 1000)
}

main()