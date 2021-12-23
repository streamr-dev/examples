const superagent = require('superagent')
const Wallet = require('ethers').Wallet
const BrokerConfig = require('./config-api-key.json')
const util = require('../util')

const PRIVATE_KEY = BrokerConfig.ethereumPrivateKey
const API_KEY = BrokerConfig.apiAuthentication.keys[0]

const main = async () => {
    return new Promise((resolve, reject) => {
        try {
            const address = new Wallet(PRIVATE_KEY).address
            const stream_id = encodeURIComponent(`${address}/node-example-data`)
            const url = `http://localhost:7073/streams/${stream_id}`
        
            const interval = setInterval(async () => {
                const message = { 
                    type: 'broker:http:publish',
                    ts: Date.now()
                } 
        
                const httpResponse = await superagent.post(url)
                .set('Authorization', `bearer ${API_KEY}`)
                .set('Content-Type', 'application/json')
                .send(message)
        
                console.log('Sent successfully: ', message)
                resolve({interval, httpResponse})
            }, 1000)
        } catch (e){
            reject(e)
        }
    })
    
}

if (util.isRunFlagPresent(process.argv)){
    main()
}

module.exports = main