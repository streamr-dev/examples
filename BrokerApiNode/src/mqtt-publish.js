import mqtt from 'mqtt'
import { Wallet } from 'ethers'

import * as BrokerConfig from './config.json'


// Documented on the following test:
// https://github.com/streamr-dev/network-monorepo/blob/main/packages/broker/test/integration/plugins/mqtt/MqttPlugin.test.ts

const PRIVATE_KEY = BrokerConfig.default.ethereumPrivateKey


const main = async () => {
    const address = new Wallet(PRIVATE_KEY).address
    const streamId = `${address}/node-example-data`
    const client = mqtt.connect(`mqtt://localhost:1883`)

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
