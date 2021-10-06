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
    
    console.log(`Stream ${stream.id} created`)
    // grant public permissions
    await stream.grantPermission(StreamOperation.STREAM_DELETE, undefined)
    await stream.grantPermission(StreamOperation.STREAM_EDIT, undefined)
    await stream.grantPermission(StreamOperation.STREAM_GET, undefined)
    // or to a specific address
    await stream.grantPermission(StreamOperation.STREAM_PUBLISH, '0x87a34e85d8aa9ff105740f60cb37fefc2f0deaff')
    await stream.grantPermission(StreamOperation.STREAM_SHARE, '0x87a34e85d8aa9ff105740f60cb37fefc2f0deaff')
    await stream.grantPermission(StreamOperation.STREAM_SUBSCRIBE, '0x87a34e85d8aa9ff105740f60cb37fefc2f0deaff')

    const permissions = await stream.getPermissions()
    console.log('Permissions', permissions)
    process.exit(0)
}

main()
