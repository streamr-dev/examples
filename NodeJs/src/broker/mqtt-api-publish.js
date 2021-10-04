

import mqtt from 'mqtt'
import { Wallet } from 'ethers'
import { config } from '../client/config.js'
import { utils } from '../utils.js'

// Documented on the following test:
// https://github.com/streamr-dev/network-monorepo/blob/main/packages/broker/test/integration/plugins/mqtt/MqttPlugin.test.ts

const PRIVATE_KEY = config.privateKey

if (!utils.isValidPrivateKey(PRIVATE_KEY)) {
    console.log('You need to register a Streamr account and get a Private Key before you can use this example.')
    process.exit(0)
}

const main = async () => {
    const address = new Wallet(PRIVATE_KEY).address
    const streamId = `${address}/node-example-data`
    const apiKey = 'MTgzYTM3NzVmOTIzNDA2NThiMjEwZDJhYzE1MjcyNTU'
    const client = mqtt.connect(`mqtt://localhost:1883`, {
        username: '',
        password: apiKey
    })
    
    client.on('connect', () => {
        client.subscribe(streamId, (err) => {
            setInterval(async () => {
                const message = { 
                    type: 'broker:mqtt:publish',
                    ts: Date.now()
                } 
                client.publish(streamId, JSON.stringify(message))
                console.log('Sent successfully: ', message)
            }, 1000)
        })
    })
}

main()
