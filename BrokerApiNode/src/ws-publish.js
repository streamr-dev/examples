const WebSocket = require('ws').WebSocket
const util = require('./util')

// Documented on the following test:
// https://github.com/streamr-dev/network-monorepo/blob/main/packages/broker/test/integration/plugins/websocket/WebsocketPlugin.test.ts


const main = async (port = 9091) => {
    return new Promise((resolve, reject) => {
        try {
            const streamId = '0x75a34e85d8aa9ff106740f60cb37fefc2f0deaf9/broker-node-example'
            const ws = new WebSocket(`ws://localhost:${port}/streams/${streamId}/publish`)

            ws.on('open', () => {
                const interval = setInterval(async () => {
                    const message = { 
                        type: 'broker:ws:publish',
                        ts: Date.now()
                    } 
            
                    ws.send(JSON.stringify(message))
                    console.log('Sent successfully: ', message)
                    resolve({interval})
                }, 1000)
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