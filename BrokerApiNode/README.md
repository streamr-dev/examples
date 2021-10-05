# Broker APIs
This example demostrates how to use the Streamr Broker API's from NodeJS. Node version 14/16 or higher is recommended.

## Broker & SDKs
- [Examples directory](https://github.com/streamr-dev/examples/blob/ECODR-34-broker-and-client/NodeJs/src/broker/)

The Broker acts as a relayer node from it's HTTP/WS/MQTT APIs into the Streamr Network

### Broker setup
```shell
$ npm install streamr-broker --global
$ npm run broker:start
```
The [default config](https://github.com/streamr-dev/examples/blob/ECODR-34-broker-and-client/NodeJs/broker-config.json) has the HTTP, WS and MQTT plugins enabled by default to allow for SDK interaction.

You can also start the broker with the apiKey `0x1c4343df92f5370208232782c373fa691c3543bdf4c40adfd406c87103b18fc2` by running:

```
$ npm run broker:start-api-key
```

In this setup you'll have to provide one of the registered apiKeys under `src/config-api-key.json` to be able to interact with the broker node. 

### HTTP Endpoint
- [API Reference](https://api-explorer.streamr.com/)

One can exercise the [`publish`](https://github.com/streamr-dev/examples/blob/ECODR-34-broker-and-client/NodeJs/src/broker/http-publish.js) using the HTTP plugin on the broker. 


In order to run the example execute from your terminal:
```shell
$ npm run http:publish
```

If you are running your broker config with apiKeys you'll need to run:
```shell
$ npm run http:api-key-publish
```

### WS Endpoint
> Lacks apiKey examples for authorized brokers

One can exercise the [`publish`](https://github.com/streamr-dev/examples/blob/ECODR-34-broker-and-client/NodeJs/src/broker/ws-publish.js) and [`subscribe`](https://github.com/streamr-dev/examples/blob/ECODR-34-broker-and-client/NodeJs/src/broker/ws-subscribe.js) using the WebSockets plugin on the broker. 

In order to run the respective examples execute from your terminal:
```shell
$ npm run ws:subscribe
$ npm run ws:publish
```

If you are running your broker config with apiKeys you'll need to run:
```shell
$ npm run ws:api-key-subscribe
$ npm run ws:api-key-publish
```

**Things to remember**
- Any ws client library can be used to interact with the broker
- You must connect to different paths (`/streams/{streamId}/publish` vs `/streams/{streamId}/subscribe`) to interact with the network

### MQTT Endpoint
> Lacks apiKey examples for authorized brokers

One can exercise the [`publish`](https://github.com/streamr-dev/examples/blob/ECODR-34-broker-and-client/NodeJs/src/broker/mqtt-publish.js) and [`subscribe`](https://github.com/streamr-dev/examples/blob/ECODR-34-broker-and-client/NodeJs/src/broker/mqtt-subscribe.js) using the MQTT plugin on the broker. 

In order to run the respective examples execute from your terminal:
```shell
$ npm run mqtt:subscribe
$ npm run mqtt:publish
```

If you are running your broker config with apiKeys you'll need to run:
```shell
$ npm run mqtt:api-key-subscribe
$ npm run mqtt:api-key-publish
```


## Resources
- [Fix permissions when globally installing broker](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally)


