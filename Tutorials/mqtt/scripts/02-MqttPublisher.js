const mqtt = require('async-mqtt')

const StreamId = '0x2f1418bbe3512156175efa3ef466f40df0161990/sensor/firehose'
const ApiKey = 'MmZjMTMzZDAxMzAwNGIyZDg4ZTNmMzYzZjU3NWU2YTY'

const main = async () => {
    const client = await mqtt.connectAsync('mqtt://localhost:1883', 
    {
        username: '',
        password: ApiKey,
    })
    console.log('connected')
    
    setInterval(async () => {
        const msg = {
            "greeting": "hi Steve!",
        }
        await client.publish(StreamId, JSON.stringify(msg))
        console.log('🎉 published: ', msg)
    }, 1000)
}

main()