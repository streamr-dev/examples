

const mqtt = require('mqtt')
const BrokerConfig = require('./config-api-key.json')
const util = require('../util')

// Documented on the following test:
// https://github.com/streamr-dev/network-monorepo/blob/main/packages/broker/test/integration/plugins/mqtt/MqttPlugin.test.ts

const API_KEY = BrokerConfig.apiAuthentication.keys[0]


const main = async (PORT) => {
    return new Promise((resolve, reject) => {
        try {
            const streamId = '0x75a34e85d8aa9ff106740f60cb37fefc2f0deaf9/broker-node-example'
            const client = mqtt.connect(`mqtt://localhost:7072`, {
                username: '',
                password: API_KEY
            })
            
            client.on('connect', () => {
                client.subscribe(streamId, (err) => {
                    const interval = setInterval(async () => {
                        const message = { 
                            type: 'broker:mqtt:publish',
                            ts: Date.now()
                        } 
                        const publishResponse = client.publish(streamId, JSON.stringify(message))
                        console.log('Sent successfully: ', message)
                        resolve( {interval, publishResponse})
                    }, 1000)
                })
            })
        } catch (e){
            reject(e)
        }
    })
}   


if (util.isRunFlagPresent(process.argv)){
    main()
}

module.exports = main