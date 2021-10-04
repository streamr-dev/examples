import WebSocket from 'ws'
import { Wallet } from 'ethers'
import { config } from '../client/config.js'
import { utils } from '../utils.js'

// Documented on the following test:
// https://github.com/streamr-dev/network-monorepo/blob/main/packages/broker/test/integration/plugins/websocket/WebsocketPlugin.test.ts

const PRIVATE_KEY = config.privateKey

if (!utils.isValidPrivateKey(PRIVATE_KEY)) {
    console.log('You need to register a Streamr account and get a Private Key before you can use this example.')
    process.exit(0)
}

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