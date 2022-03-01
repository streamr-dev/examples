const addToStorageNode = require('../src/stream/addToStorageNode.js')
const getPermissions = require('../src/stream/getPermissions.js')
const grantPermission = require('../src/stream/grantPermission.js')
const hasPermission = require('../src/stream/hasPermission.js')
const publish = require('../src/stream/publish.js')
const revokePermission = require('../src/stream/revokePermission.js')

const expectConsoleLogs = (logs) => {
    // only evaluates the first element of the console log, if given comma-separated
    for (let i = 0; i < logs.length; i++){
        expect(console.log.mock.calls[i][0]).toBe(logs[i])
    }
}

describe('Stream', () => {
    beforeEach (() => {
        console.log = jest.fn()
    })
    
    it ('should exercise the `addToStorageNode` example', async () => {
        const streamId = await addToStorageNode()
        expectConsoleLogs([
            `Stream ${streamId} created`,
            'Stream added to storage node'
        ])
    })

    it ('should exercise the `getPermissions` example', async () => {
        const {streamId, permissions} = await getPermissions()
        expect(permissions.length).toBe(6)
        expectConsoleLogs([
            `Stream ${streamId} created`,
            'Permissions'
        ])
    })

    it ('should exercise the `grantPermission` example', async () => {
        const streamId = await grantPermission()
        expectConsoleLogs([
            `Stream ${streamId} created`,
            'Permissions'
        ])
    })

    it ('should exercise the `hasPermission` example', async () => {
        const streamId = await hasPermission()
        expectConsoleLogs([
            `Stream ${streamId} created`,
            'hasPermission? no',
            'hasPermission? yes'
        ])
    })

    it ('should exercise the `publish` example', async () => {
        const { client, interval} = await publish()
        clearInterval(interval)
        expectConsoleLogs([
            'Sent successfully: '
        ])   
        await client.destroy()     
    })

    it ('should exercise the `revokePermission` example', async () => {
        const streamId = await revokePermission()
        expectConsoleLogs([
            'Permission granted', 
            'Permission revoked'
        ])   
    })
})