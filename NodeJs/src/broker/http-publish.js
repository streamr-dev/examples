import superagent from 'superagent'
import { Wallet } from 'ethers'
import { config } from '../client/config.js'
import { utils } from '../utils.js'

const PRIVATE_KEY = config.privateKey

if (!utils.isValidPrivateKey(PRIVATE_KEY)) {
    console.log('You need to register a Streamr account and get a Private Key before you can use this example.')
    process.exit(0)
}

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