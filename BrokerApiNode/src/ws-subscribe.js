const WebSocket = require('ws').WebSocket
const util = require('./util')

// Documented on the following test:
// https://github.com/streamr-dev/network-monorepo/blob/main/packages/broker/test/integration/plugins/websocket/WebsocketPlugin.test.ts

const main = async () => {
    return new Promise((resolve, reject) => {
        try {
            const streamId = '0x75a34e85d8aa9ff106740f60cb37fefc2f0deaf9/broker-node-example'
            const ws = new WebSocket(`ws://localhost:9091/streams/${streamId}/subscribe`)

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