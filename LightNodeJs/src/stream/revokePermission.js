const { StreamrClient, StreamOperation } = require('streamr-client').StreamrClient
const utils = require('../utils.js')
const config = require('../config.js')


/*
Error: NOT_FOUND: Request Streamr:StreamrClient:29892-0:Rest-0 to 
https://streamr.network/api/v1/streams/0x75a34e85d8aA9ff106740f60CB37fEFc2f0deAF9%2F1633515124025/permissions/stream_publish 
returned with error code 404. '{"code":"NOT_FOUND","message":"Permission not found"}'
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
        id: `${await client.getAddress()}/${Date.now()}`
    })
    
    // grant public permission
    await stream.grantPermission(StreamOperation.STREAM_SUBSCRIBE, undefined)

    let permissions = await stream.getPermissions()
    console.log('Permission granted', permissions)
    // revoke our last given permission
    await stream.revokePermission(permissions[permissions.length - 1].id)
    
    permissions = await stream.getPermissions()
    console.log('Permission revoked', permissions)
    await client.destroy()     
    return stream.id
}


if (utils.isRunFlagPresent(process.argv)){
    main()
}

module.exports = main
