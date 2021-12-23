const WebSocket = require('ws').WebSocket
const BrokerConfig = require('./config-api-key.json')
const util = require('../util')


// Documented on the following test:
// https://github.com/streamr-dev/network-monorepo/blob/main/packages/broker/test/integration/plugins/websocket/WebsocketPlugin.test.ts

const API_KEY = BrokerConfig.apiAuthentication.keys[0]

const main = async () => {
    return new Promise((resolve, reject) => {
        try {
            const streamId = encodeURIComponent(`${address}/node-example-data`)
            const ws = new WebSocket(`ws://localhost:7071/streams/${streamId}/subscribe?apiKey=${API_KEY}`)

            ws.on('message', (json) => {
                const data = JSON.parse(json)
                console.log('Received data: ', data)
                resolve(data)
            })
        } catch (e){
            reject(e)
        }
    })
}


if (util.isRunFlagPresent(process.argv)){
    main()
}

module.exports = main