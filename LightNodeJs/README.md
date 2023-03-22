## Light Node (JS)

This example demostrates how to use the Streamr Client in a Node environment. Node version 14/16 or higher is recommended.


- [Existing docs](https://github.com/streamr-dev/network-monorepo/blob/main/packages/client/README.md)
- [Examples directory](https://github.com/streamr-dev/examples/blob/ECODR-34-broker-and-client/NodeJs/src/client/)
- [Brubeck Client](https://github.com/streamr-dev/network-monorepo/blob/NET-201-brubeck-client/)

The Streamr JavaScript Client imports and runs a Streamr light node as a library which participates in the Streamr Network.

- Install and setup (NodeJS and browser)
- StreamrClient constructor 
- `client` class
    - connect
    - subscribe
    - unsubscribe
    - unsubscribeAll
    - getSubscriptions
    - resend
    - createStream
    - getStream
    - getOrCreateStream
    - publish
- `stream` class
    - stream.addToStorageNode
    - stream.getPermissions
    - stream.hasPermissions
    - stream.grantPermission
    - stream.revokePermission
    - stream.publish
- data unions 


______________________________________________________

### Running the examples:
```shell
npm run subscribe
npm run unsubscribe
npm run unsubscribeAll
npm run getSubscriptions
npm run resend
npm run createStream
npm run getStream
npm run getOrCreateStream
npm run publish
npm run searchStream
npm run stream:addToStorageNode
npm run stream:publish
npm run stream:delete
npm run stream:getStorageNodes
npm run stream:removeFromStorageNode
npm run stream:hasPermission
npm run stream:getPermissions
npm run stream:grantPermissions
npm run stream:revokePermissions
npm run stream:update
```

### Running the examples using dev environment:
To run the examples with a local dev environment ([streamr-docker-dev](https://github.com/streamr-dev/streamr-docker-dev)) pass an extra argument `--dev`
```shell
npm run subscribe -- --dev
npm run unsubscribe -- --dev
npm run unsubscribeAll -- --dev
npm run getSubscriptions -- --dev
npm run resend -- --dev
npm run createStream -- --dev
npm run getStream -- --dev
npm run getOrCreateStream -- --dev
npm run publish -- --dev
npm run searchStream -- --dev
npm run stream:addToStorageNode -- --dev
npm run stream:publish -- --dev
npm run stream:delete -- --dev
npm run stream:getStorageNodes -- --dev
npm run stream:removeFromStorageNode -- --dev
npm run stream:hasPermission -- --dev
npm run stream:getPermissions -- --dev
npm run stream:grantPermissions -- --dev
npm run stream:revokePermissions -- --dev
npm run stream:update -- --dev
```