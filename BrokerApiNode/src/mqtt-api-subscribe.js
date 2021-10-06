import mqtt from 'mqtt'
import { Wallet } from 'ethers'

import * as BrokerConfig from './config.json'


// Documented on the following test:
// https://github.com/streamr-dev/network-monorepo/blob/main/packages/broker/test/integration/plugins/mqtt/MqttPlugin.test.ts

const PRIVATE_KEY = BrokerConfig.default.ethereumPrivateKey


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
            client.on('message', (streamId, rawData) => {
                const json = rawData.toString()
                const data = JSON.parse(json)
                console.log('Received data: ', data)
            })
        })
    })
}

main()
