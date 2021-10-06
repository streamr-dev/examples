import superagent from 'superagent'
import { Wallet } from 'ethers'
import * as BrokerConfig from './config.json'

const PRIVATE_KEY = BrokerConfig.default.ethereumPrivateKey

// (node:42493) UnhandledPromiseRejectionWarning: Error: connect ECONNREFUSED 127.0.0.1:7171

const main = async () => {
    const address = new Wallet(PRIVATE_KEY).address
    const stream_id = encodeURIComponent(`${address}/node-example-data`)
    const apiKey = 'MTgzYTM3NzVmOTIzNDA2NThiMjEwZDJhYzE1MjcyNTU'
    const url = `http://localhost:7171/streams/${stream_id}?apiKey=${apiKey}`

    setInterval(async () => {
        const message = { 
            type: 'broker:http:publish',
            ts: Date.now()
        } 

        const res = await superagent.post(url)
        .set('Content-Type', 'application/json')
        .send(message)

        console.log('Sent successfully: ', message)
    }, 1000)
}

main()