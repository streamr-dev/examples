const { StreamrClient, StreamPermission } = require('streamr-client')
// This will need to be replaced with a private key that has MATIC tokens (Polygon blockchain gas token)
const PrivateKey = '...'
// See README.md, 1.2 - Initial broker setup
const BrokerNodeAddress = '...'

const main = async () => {
    // Create the Streamr Client instance with its own private key
    const streamr = new StreamrClient({
        auth: {
            privateKey: PrivateKey,
        }
    });
    
    // Create the stream
    const stream = await streamr.getOrCreateStream({
        id: '/sensor/firehose',
    })
    // Grant permissions to the broker node on the stream
    // Requires MATIC tokens (Polygon blockchain gas token)
    await streamr.setPermissions({
        streamId: stream.id,
        assignments: [
            {
                user: BrokerNodeAddress,
                permissions: [
                    StreamPermission.PUBLISH,
                    StreamPermission.SUBSCRIBE
                ]
            }
        ]
    })
    // Check the granted permissions
    // Temporary delay for The Graph indexing delay (not necessary, but nice for quick console logging!)
    await new Promise(r => setTimeout(r, 5000));
    
    const permissions = await stream.getPermissions()
    console.log(stream.id, permissions)
}
main()
