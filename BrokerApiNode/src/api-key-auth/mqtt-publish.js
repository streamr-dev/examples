

const mqtt = require('mqtt')
const Wallet = require('ethers').Wallet
const BrokerConfig = require('./config-api-key.json')
const util = require('../util')
// Documented on the following test:
// https://github.com/streamr-dev/network-monorepo/blob/main/packages/broker/test/integration/plugins/mqtt/MqttPlugin.test.ts

const PRIVATE_KEY = BrokerConfig.ethereumPrivateKey
const API_KEY = BrokerConfig.apiAuthentication.keys[0]


const main = async (PORT) => {
    return new Promise((resolve, reject) => {
        try {
            const address = new Wallet(PRIVATE_KEY).address
            const streamId = `${address}/node-example-data`
            const apiKey = 'MTgzYTM3NzVmOTIzNDA2NThiMjEwZDJhYzE1MjcyNTU'
            const client = mqtt.connect(`mqtt://localhost:${PORT}`, {
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