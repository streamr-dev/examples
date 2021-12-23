const superagent = require('superagent')
const BrokerConfig = require('./config-api-key.json')
const util = require('../util')

const API_KEY = BrokerConfig.apiAuthentication.keys[0]

const main = async () => {
    return new Promise((resolve, reject) => {
        try {
            const stream_id = encodeURIComponent('0x75a34e85d8aa9ff106740f60cb37fefc2f0deaf9/broker-node-example')
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