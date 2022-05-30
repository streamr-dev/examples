const mqtt = require('mqtt')

const StreamId = '0x123/your/stream/id'
const ApiKey = 'YOUR_API_KEY'

const main = async () => {
    const client = mqtt.connect('mqtt://localhost:1883', 
    {
        username: '',
        password: ApiKey,
    })    
    
    client.subscribe(StreamId, (err) => {
        if (err) {
            console.log('💥 error subscribing: ', err)
        }
    })

    client.on('connect', () => {
        console.log('connected')
        client.on('message', (streamId, rawData) => {
            const data = JSON.parse(rawData.toString())
            console.log('🎉 received: ', streamId, data)
        })
    })
}

main()