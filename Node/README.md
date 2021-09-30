# Node

This example demostrates how to use the Streamr Client in a Node environment. Node version 14 or higher is recommended.

## Standalone Client
[(Existing docs)](https://github.com/streamr-dev/network-monorepo/blob/main/packages/client/README.md)

Fully flexed Streamr Node that interacts with the p2p environment.
- import fashions (`require` vs `import`)
- StreamrClient constructor 
- `client` class
    - client.connect/disconnect
    - client.subscribe
    - client.unsubscribe
    - client.unsubcribeAll
    - client.getSubscriptions
    - client.resend 
    - client.createStream 
    - client.getStream 
    - client.getOrCreateStream
    - client.publish
- `stream` class
    - stream.addToStorageNode
    - stream.getPermissions
    - stream.hasPermissions
    - stream.grantPermission
    - stream.revokePermission
    - stream.publish
- data unions 

## Broker & SDKs
The Broker acts as a relayer node from it's HTTP/WS/MQTT APIs into the p2p environment
### Broker setup
```
$ npm install streamr-broker --global
$ broker broker-config.json
```
The [default config](./broker-config.json) has the HTTP, WS and MQTT plugins enabled by default to allow for SDK interaction

### HTTP Endpoint
- [API Reference](https://api-explorer.streamr.com/)

(Probably the same same methods demonstrated on the Standalone Client?)
### WS Endpoint
(Probably the same same methods demonstrated on the Standalone Client?)
### MQTT Endpoint
(Probably the same same methods demonstrated on the Standalone Client?)


## Resources
- [Fix permissions when globally installing broker](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally)