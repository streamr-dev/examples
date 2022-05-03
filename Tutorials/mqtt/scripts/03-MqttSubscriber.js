const mqtt = require('mqtt')

const StreamId = '0x2f1418bbe3512156175efa3ef466f40df0161990/sensor/firehose'
const ApiKey = 'MmZjMTMzZDAxMzAwNGIyZDg4ZTNmMzYzZjU3NWU2YTY'

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