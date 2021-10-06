import { StreamrClient, StreamOperation } from 'streamr-client'
import { config } from '../config.js'
import { utils } from '../utils.js'

// Error: NOT_FOUND: Request Streamr:StreamrClient:29892-0:Rest-0 to https://streamr.network/api/v1/streams/0x75a34e85d8aA9ff106740f60CB37fEFc2f0deAF9%2F1633515124025/permissions/stream_publish returned with error code 404. '{"code":"NOT_FOUND","message":"Permission not found"}'

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
    
    // grant public permissions
    await stream.grantPermission(StreamOperation.STREAM_DELETE, undefined)
    await stream.grantPermission(StreamOperation.STREAM_EDIT, undefined)
    await stream.grantPermission(StreamOperation.STREAM_GET, undefined)
    await stream.grantPermission(StreamOperation.STREAM_PUBLISH, undefined)
    await stream.grantPermission(StreamOperation.STREAM_SHARE, undefined)
    await stream.grantPermission(StreamOperation.STREAM_SUBSCRIBE, undefined)

    let permissions = await stream.getPermissions()
    console.log('All permissions granted', permissions)

    /* 
        all of the revokePermission calls return this error:
        Error: NOT_FOUND: Request Streamr:StreamrClient:29892-0:Rest-0 to https://streamr.network/api/v1/streams/0x75a34e85d8aA9ff106740f60CB37fEFc2f0deAF9%2F1633515124025/permissions/stream_publish returned with error code 404. '{"code":"NOT_FOUND","message":"Permission not found"}'
    */
    //await stream.revokePermission(StreamOperation.STREAM_DELETE, undefined)
    //await stream.revokePermission(StreamOperation.STREAM_EDIT, undefined)
    //await stream.revokePermission(StreamOperation.STREAM_GET, undefined)
    //await stream.revokePermission(StreamOperation.STREAM_PUBLISH, undefined)
    //await stream.revokePermission(StreamOperation.STREAM_SHARE, undefined)
    //await stream.revokePermission(StreamOperation.STREAM_SUBSCRIBE, undefined)

    permissions = await stream.getPermissions()
    console.log('All permissions revoked', permissions)
    process.exit(0)
}

main()
