import { Wallet } from 'ethers'
import { StreamrClient, StreamOperation } from 'streamr-client'
import { config } from '../config.js'
import { utils } from '../utils.js'


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
    const deletePermission = await stream.grantPermission(StreamOperation.STREAM_DELETE, undefined)
    const editPermission = await stream.grantPermission(StreamOperation.STREAM_EDIT, undefined)
    const getPermission = await stream.grantPermission(StreamOperation.STREAM_GET, undefined)
    const publishPermission = await stream.grantPermission(StreamOperation.STREAM_PUBLISH, undefined)
    const sharePermission = await stream.grantPermission(StreamOperation.STREAM_SHARE, undefined)
    const subscribePermission = await stream.grantPermission(StreamOperation.STREAM_SUBSCRIBE, undefined)

    let permissions = await stream.getPermissions()
    console.log('All permissions granted', permissions)

    
    await stream.revokePermission(deletePermission.id)
    await stream.revokePermission(editPermission.id)
    await stream.revokePermission(getPermission.id)
    await stream.revokePermission(publishPermission.id)
    await stream.revokePermission(sharePermission.id)
    await stream.revokePermission(subscribePermission.id)

    permissions = await stream.getPermissions()
    console.log('All permissions revoked', permissions)
    process.exit(0)
}

main()
