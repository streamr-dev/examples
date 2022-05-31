# Bridging data into the Streamr Network using the Broker node MQTT interface 
In this tutorial you will publish data into the Streamr Network using the MQTT interface of a Streamr Network Broker node.

## 1. Setup your Broker node.
This tutorial is applicable for MacOS/Linux environments. Windows environments may require minor adjustments (file locations, etc). For more in depth information on installing a Broker node, see the [installing a Broker node docs](https://streamr.network/docs/streamr-network/installing-broker-node).

Prerequisites: 
- NPM v8 
- NodeJS 16.13.x

### Install `streamr-broker` globally
```shell
$ npm i -g streamr-broker
```

This tutorial uses Broker node version `31.0.1` but always use the latest stable version when possible.

### Initial Broker node setup
Before the Broker node can be started its configuration files need to be created using the following command:
```shell
$ streamr-broker-init
```
After creating or importing your private key you will have to enable the `mqtt-plugin` and assign a port to it (default is 1883)

Once the script is done you can view your generated configuration file with:
```shell
$ cat ~/.streamr/config/default.json
```

### Start the Broker node
Start the broker by running:
```shell
$ streamr-broker
```

To include more verbose logging you can run the Broker with these additional flags:
```shell
$ LOG_LEVEL=trace DEBUG=Streamr* streamr-broker
```

## 2. Create a stream and update it's access control
In this step the Broker node is given permission to publish data points to the stream.

In order to create a stream you will need an Ethereum address with a small amount of `MATIC` to pay for gas during stream creation and permission assignment. `MATIC` is the native token of the Polygon blockchain.

This tutorial uses Streamr Client version `6.0.4` but always use the latest stable version when possible.

### Initialize the Streamr Client
Inside a NodeJS script, instantiate a `StreamrClient` instance called `streamr`, with the funded Ethereum account (private key) from the previous step:
```javascript
const streamr = new StreamrClient({
    auth: {
        privateKey: PRIVATE_KEY,
    }
})    
```

### Create the stream
With our `streamr` instance we can now create a stream:
```javascript
const stream = await streamr.createStream({
    id: '/sensor/firehose',
})    
```

The full stream ID contains the public key of the Ethereum identity (public key) that instantiated the `StreamrClient` instance. I.e. `0x123/sensor/firehose`.

You may also use Streamr's [UI](https://streamr.network/core) to create the stream and edit its access control. For more information on stream creation, see our docs secion on [creating streams](https://streamr.network/docs/streams/creating-streams).

### Assign stream permissions
This step will also consume a small amount of `MATIC` tokens.

We will be granting the Broker node `PUBLISH` and `SUBSCRIBE` permissions on the stream we just created.

We will need to provide the `StreamId`, as well as the `BrokerNodeAddress`. The `BrokerNodeAddress` (public key) is displayed when the Broker node is started:
```javascript
await streamr.setPermissions({
    streamId: StreamId,
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
```

Alternatively, you can easily create a stream and assign its permissions with the [Create stream and assign permissions script](./scripts/01-CreateStreamAndAssignPermissions.js). You will need to provide a value for `PrivateKey` that has `MATIC` balance, as well as the generated address of your Broker node, `BrokerNodeAddress`:

```javascript
const PrivateKey = '...'
...
const BrokerNodeAddress = '0x...'
```

After setting these values you can run the script with:
```shell
$ node scripts/01-CreateStreamAndAssignPermissions.js
```

Be sure to not expose your private key to anyone or upload it to any public GitHub repository by accident!

## 3. Configure your app or device to publish to the Streamr Broker node's MQTT interface
Note, in order to publish data to our newly created stream, our Broker node will need to be running.

### MQTT interface authentication
Your app or device publishing to the MQTT interface will need to provide the `ApiKey` from the Broker node's configuration file, which you can find here:

```shell
$ cat ~/.streamr/config/default.json
```
```json
{
    ...
    "apiAuthentication": {
        "keys": [
            "ImTheKeyYouAreLookingFor"
        ]
    }
}
```

More details about using the plugin interface can be found in the [Connecting applications docs](https://streamr.network/docs/streamr-network/connecting-applications) and more in depth information about the plugin interface can be found in the [Broker plugin docs](https://github.com/streamr-dev/network-monorepo/blob/main/packages/broker/plugins.md). 

If you're connecting to the MQTT interface over the open internet, please remember to make sure the port is open.

### Connecting to the MQTT interface
You will need to provide the URL with the MQTT port (default is 1883), as well as an empty `username` field and the `ApiKey` as the `password`.

```javascript
// Node.js example

const mqttClient = await mqtt.connectAsync(
    'mqtt://localhost:1883', 
    {
        username: '',
        password: ApiKey,
    }
)
```

Or you may need authenticate with a URL, for example `mqtt://"":ApiKey@1.2.3.4:1883`. Some MQTT libraries may have issue with an empty username, to get around this you can provide "x" as the username.

### Publishing data
Once connected, the MQTT client can begin publishing data points by providing a `StreamId` as the first parameter and the JSON payload as the second parameter. 

```javascript
// Node.js example

await mqttClient.publish(
    StreamId, 
    JSON.stringify({ foo: bar })
)

```

Note, at the time of writing, the Broker node will reject any non-JSON payload - so make sure your data is in JSON format! You can find a NodeJS example using `async-mqtt` in the [MQTT publisher script](./scripts/02-MqttPublisher.js).

Your data points are now being published into the Streamr Network, via your Broker node, inside the stream you've created.

## 4. Subscribe to your stream
The last remaining step is to connect to the Streamr Network and consume/subscribe to your data!

### Subscribe using the Streamr UI
You can see the published messages on your streams by using [Streamr's UI](https://streamr.network/core), logging in with Metamask with your Broker's private key (you will need to "Import account by private key"), finding your stream, and observing the live stream data preview.

### Subscribe using the Streamr CLI tool
Alternativecly, you can use [Streamr's CLI tool](
https://github.com/streamr-dev/network-monorepo/tree/main/packages/cli-tools) to subscribe to the created streams and see its incoming messages:

```shell
$ npm install -g @streamr/cli-tools
$ streamr stream subscribe 0x.../sensor/firehose --private-key YOUR_PRIVATE_KEY
```

### Subscribe using a Broker node interface
Just like you used the Broker node's MQTT interface to publish data into the network, you can also pull data out of the Network via any Broker nodes interface just as well. Just make sure that the Broker node has `SUBSCRIBE` permission to the stream you are interested in.

You will need to authenticate your client using your `ApiKey`.

Once connected, you can listen for the `message` callback on the MQTT client. The first parameter will be the `StreamId` and the second parameter will contain the message JSON payload:

```javascript
// NodeJS example

mqttClient.subscribe(StreamId)
...
mqttClient.on('connect', () => {
    mqttClient.on('message', (streamId, rawData) => {
        ...
    })
})
```

You can find this example [MQTT subscriber script](./scripts/03-MqttSubscriber.js) in this repo.

## 5. All done 🎉
Congratulations! You accomplished:
- Running a node in the Streamr Network,
- Created a stream and edited its access control on the on-chain stream registry,
- Published data to the Streamr Network using the MQTT interface of your running Broker node,
- Subscribed to your flowing data.

If you had any problems along the way, please drop a message to the core team on the #dev channel of our [Discord](https://discord.gg/gZAm8P7hK8).
