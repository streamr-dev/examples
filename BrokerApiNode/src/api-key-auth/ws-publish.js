import WebSocket from 'ws'
import { Wallet } from 'ethers'

import * as BrokerConfig from '../config.json'


// Documented on the following test:
// https://github.com/streamr-dev/network-monorepo/blob/main/packages/broker/test/integration/plugins/websocket/WebsocketPlugin.test.ts

const PRIVATE_KEY = BrokerConfig.client.auth.privateKey


const main = async () => {
    const address = new Wallet(PRIVATE_KEY).address
    const apiKey = 'MTgzYTM3NzVmOTIzNDA2NThiMjEwZDJhYzE1MjcyNTU'
    const streamId = encodeURIComponent(`${address}/node-example-data`)
    const ws = new WebSocket(`ws://localhost:7170/streams/${streamId}/publish?apiKey=${apiKey}`)

    ws.on('open', () => {
        setInterval(async () => {
            const message = { 
                type: 'broker:ws:publish',
                ts: Date.now()
            } 
    
            ws.send(JSON.stringify(message))
            console.log('Sent successfully: ', message)
        }, 1000)
    })
}

main()