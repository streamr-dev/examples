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
    // auth
    const wallet = new Wallet(PRIVATE_KEY)
    const address = wallet.address
    const path = `api/v1/login/challenge/${address}`
    const res = await superagent.post(`http://localhost:7171/${path}`).send()
    const challenge = res.body.challenge 
    const signedChallenge = wallet.signMessage(challenge)

    // publish
    const msg = { random: Math.random() } 
    const streamId = `${address}/node-example-data`
    const publishRes = await superagent
    .post(`http://localhost:7171/api/v1/streams/${streamId}/data`)
    .set('Authorization', `Bearer: ${signedChallenge}`)
    .send(msg)

    console.log(publishRes.body)
}

main()