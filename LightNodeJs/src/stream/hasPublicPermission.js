const { StreamPermission, StreamrClient } = require('streamr-client').StreamrClient
const utils = require('../utils.js')
const config = require('../config.js')

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
    // grant public permissions for subscribe
    let hasPermission = await stream.hasPublicPermission(StreamPermission.SUBSCRIBE)
    console.log(`hasPermission? ${hasPermission ? 'yes' : 'no'}`)

    await stream.grantPublicPermission(StreamPermission.SUBSCRIBE)
    hasPermission = await stream.hasPublicPermission(StreamPermission.SUBSCRIBE)

    console.log(`hasPermission? ${hasPermission ? 'yes' : 'no'}`)
    await client.destroy()
    return stream.id
}

if (utils.isRunFlagPresent(process.argv)){
    main()
}

module.exports = main

