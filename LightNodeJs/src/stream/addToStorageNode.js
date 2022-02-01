const { STREAMR_STORAGE_NODE_GERMANY, StreamrClient } = require('streamr-client').StreamrClient
const utils = require('../utils.js')
const config = require('../config.js')

/* ERROR 
Stream 0x00de714cbad811af322f539a043ec71eab7fa3a5/light-node-js-example/1643712887373 created
0x31546eEA76F2B2b3C5cC06B1c93601dc35c9D916
/home/bearni/streamr/examples/LightNodeJs/node_modules/streamr-client/src/NodeRegistry.js:108
            throw new _1.NotFoundError('Node not found, id: ' + nodeAddress);
                  ^

TypeError: _1.NotFoundError is not a constructor
    at NodeRegistry.getStorageNodeUrl (/home/bearni/streamr/examples/LightNodeJs/node_modules/streamr-client/src/NodeRegistry.js:108:19)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
    at async StreamrStream.addToStorageNode (/home/bearni/streamr/examples/LightNodeJs/node_modules/streamr-client/src/Stream.js:298:36)
    at async main (/home/bearni/streamr/examples/LightNodeJs/src/stream/addToStorageNode.js:26:5)

*/
const main = async () => {
    const PRIVATE_KEY = config.privateKey

    if (!utils.isValidPrivateKey(PRIVATE_KEY)) {
        console.log('You need to register a Streamr account and get a Private Key before you can use this example.')
        process.exit(1)
    }
    // Create the client using the validated private key
    const client = new StreamrClient({
        auth: {
            privateKey: PRIVATE_KEY,
        }
    })

    // Create the default stream
    const stream = await client.createStream({
        id: `${await client.getAddress()}/light-node-js-example/${Date.now()}`
    })
    
    console.log(`Stream ${stream.id} created`)
    console.log(STREAMR_STORAGE_NODE_GERMANY)
    await stream.addToStorageNode(STREAMR_STORAGE_NODE_GERMANY)

    console.log('Stream added to storage node')
    await client.destroy()
    return stream.id
}

if (utils.isRunFlagPresent(process.argv)){
    main()
}

module.exports = main