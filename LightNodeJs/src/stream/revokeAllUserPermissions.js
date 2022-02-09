const { StreamrClient, StreamPermission } = require('streamr-client').StreamrClient
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
    
    // grant public permission
    let permissions = await stream.getPermissions()
    console.log('Permission fetched', permissions)
    // revoke the public permission
    await stream.revokeAllUserPermissions(await client.getAddress())
    console.log('Revoked public permission')
    permissions = await stream.getPermissions()
    console.log('Permission revoked', permissions)
    await client.destroy()     
    return stream.id
}


if (utils.isRunFlagPresent(process.argv)){
    main()
}

module.exports = main
