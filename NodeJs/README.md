# Node

This example demostrates how to use the Streamr Client in a Node environment. Node version 14/16 or higher is recommended.

## Light Node (JS)
[(Existing docs)](https://github.com/streamr-dev/network-monorepo/blob/main/packages/client/README.md)

The Streamr JavaScript Client imports and runs a Streamr light node as a library which participates in the Streamr Network.
- Install and setup (NodeJS and browser)
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
The Broker acts as a relayer node from it's HTTP/WS/MQTT APIs into the Streamr Network
### Broker setup
```
$ npm install streamr-broker --global
$ broker broker-config.json
```
The [default config](./broker-config.json) has the HTTP, WS and MQTT plugins enabled by default to allow for SDK interaction

### HTTP Endpoint
- [API Reference](https://api-explorer.streamr.com/)

(Probably the same same methods demonstrated on the Light Node (JS)?)
### WS Endpoint
(Probably the same same methods demonstrated on the Light Node (JS)?)
### MQTT Endpoint
(Probably the same same methods demonstrated on the Light Node (JS)?)


## Resources
- [Fix permissions when globally installing broker](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally)