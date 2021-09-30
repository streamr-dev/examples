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
```console
$ npm install streamr-broker --global
$ npm run broker:start
```
The [default config](https://github.com/streamr-dev/examples/blob/ECODR-34-broker-and-client/NodeJs/broker-config.json) has the HTTP, WS and MQTT plugins enabled by default to allow for SDK interaction.

### HTTP Endpoint
- [API Reference](https://api-explorer.streamr.com/)

One can exercise the [`publish`](https://github.com/streamr-dev/examples/blob/ECODR-34-broker-and-client/NodeJs/src/broker/http-publish.js) using the HTTP plugin on the broker. 


In order to run the example execute from your terminal:
```console
$ npm run broker:http-publish
```

### WS Endpoint
One can exercise the [`publish`](https://github.com/streamr-dev/examples/blob/ECODR-34-broker-and-client/NodeJs/src/broker/ws-publish.js) and [`subscribe`](https://github.com/streamr-dev/examples/blob/ECODR-34-broker-and-client/NodeJs/src/broker/ws-subscribe.js) using the WebSockets plugin on the broker. 

In order to run the respective examples execute from your terminal:
```console
$ npm run broker:ws-subscribe
$ npm run broker:ws-publish
```

**Things to remember**
- Any ws client library can be used to interact with the broker
- You must connect to different paths (`/streams/{streamId}/publish` vs `/streams/{streamId}/subscribe`) to interact with the network

### MQTT Endpoint


## Resources
- [Fix permissions when globally installing broker](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally)