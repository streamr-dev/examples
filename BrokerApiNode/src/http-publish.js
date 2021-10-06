import superagent from 'superagent'
import { Wallet } from 'ethers'
import * as BrokerConfig from './config.json'

const PRIVATE_KEY = BrokerConfig.default.ethereumPrivateKey
console.log(BrokerConfig)


const main = async () => {
    const address = new Wallet(PRIVATE_KEY).address
    const stream_id = encodeURIComponent(`${address}/node-example-data`)
    const url = `http://localhost:7171/streams/${stream_id}`

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