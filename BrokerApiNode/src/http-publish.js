const superagent = require('superagent')
const util = require('./util')

const main = async (port = 9093) => {
    return new Promise((resolve, reject) => {
        try {
            const streamId = encodeURIComponent('0x75a34e85d8aa9ff106740f60cb37fefc2f0deaf9/broker-node-example')
            const url = `http://localhost:${port}/streams/${streamId}`

            const interval = setInterval(async () => {
                const message = { 
                    type: 'broker:http:publish',
                    ts: Date.now()
                } 

                const httpResponse = await superagent.post(url)
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