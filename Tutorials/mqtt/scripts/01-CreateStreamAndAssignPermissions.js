const { StreamrClient, StreamPermission } = require('streamr-client')
// This will need to be replaced with a private key that has MATIC tokens (Polygon blockchain gas token)
const PrivateKey = '0x4617f5af16e17d1864e2e20f56ea0e25fe3a29d1a3c4d2b3f13043c686379d37'
// See README.md, 1.2 - Initial broker setup
const BrokerNodeAddress = '0x8548E478f4F117125f76E455724C745615077924'

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
    const permissions = await stream.getPermissions()
    console.log(stream.id, permissions)
}
main()