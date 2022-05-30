# Bridging data into the Streamr Network using the Broker node MQTT interface 

## 1 - Setup your broker node. (For MacOS/Linux)
Prerequisites: 
- NPM v8 
- NodeJS 16.13.x

### 1.1 - Install `streamr-broker` globally
```shell
$ npm i -g streamr-broker@31.0.1
```

### 1.2 - Initial Broker node setup
Before the Broker node can be started its configuration files need to be created using the following command:
```shell
$ streamr-broker-init
```
After creating or importing your private key you will have to enable the `mqtt-plugin` and assign a port to it (default is 1883)

Once the script is done you can view your generated configuration file with:
```shell
$ cat ~/.streamr/config/default.json
```

For more information on installing a Broker node, see the [installing a Broker node docs](https://streamr.network/docs/streamr-network/installing-broker-node).

### 1.3 - Running the Broker node
Start the broker by running:
```shell
$ streamr-broker
```

To include more verbose logging you can run the Broker with these additional flags:
```shell
$ LOG_LEVEL=trace DEBUG=Streamr* streamr-broker
```

## 2 - Create the stream and update the stream's access control.
In this step the Broker node is given permission to publish data points to the stream.

In order to create a stream you will need an Ethereum address with a small amount of `MATIC` to pay for gas during stream creation and permission assignment. `MATIC` is the native token of the Polygon blockchain.

This tutorial uses the JavaScript `streamr-client v>= 6.0.4` but always use the latest stable version when possible.

### 2.1 StreamrClient creation
Create a NodeJs script. Inside this script we will create a `StreamrClient` instance called `streamr`, instantiated with our funded private key from the previous step:
```javascript
const streamr = new StreamrClient({
    auth: {
        privateKey: PRIVATE_KEY,
    }
})    
```

### 2.2 Stream creation
With our `streamr` instance we can now create a stream:
```javascript
const stream = await streamr.createStream({
    id: '/sensor/firehose',
})    
```

The full stream ID contains the public key of the Ethereum identity (public key) that instantiated the `StreamrClient` instance. I.e. `0x123/sensor/firehose`.

You may also use Streamr's [UI](https://streamr.network/core) to create the stream and edit its access control. For more information on stream creation, see our docs secion on [creating streams](https://streamr.network/docs/streams/creating-streams).

### 2.3 - Assign stream permissions
This step will also consume a small amount of `MATIC` tokens.

We will be granting the Broker node `PUBLISH` and `SUBSCRIBE` permissions on the stream we just created.

We will need to provide the `StreamId`, as well as the `BrokerNodeAddress`, which can be found when we start the Broker (step 1.3):
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

## 3 - Configure your app or device to publish to the Streamr Broker node's MQTT interface
Note, in order to publish data to our newly created stream, our Broker node will need to be running.

### 3.1 - MQTT interface authentication
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

### 3.3 - Connecting to the MQTT interface
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

### 3.3 - Publishing data
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

## 4 - Subscribe to your stream
The last remaining step is to connect to the Streamr Network and consume or subscribe to your data!

### 4.1 Using the Streamr UI
You can see the published messages on your streams by using [Streamr's UI](https://streamr.network/core), logging in with Metamask with your Broker's private key (you will need to "Import account by private key"), finding your stream, and observing the live stream data preview.

### 4.2 Using `@streamr/cli-tools`
Alternativecly, you can use [Streamr's CLI tool](
https://github.com/streamr-dev/network-monorepo/tree/main/packages/cli-tools) to subscribe to the created streams and see its incoming messages:

```shell
$ npm install -g @streamr/cli-tools
$ streamr stream subscribe 0x.../sensor/firehose --private-key YOUR_PRIVATE_KEY
```

### 4.3 Using an interface of a Broker node
Just like you used the Broker node's MQTT interface to publish data into the network, you can also pull data out of the Network via any Broker nodes interface just as well. Just make sure that the Broker node has `SUBSCRIBE` permission to the stream you are interested in.

You will need to authenticate your client using your `ApiKey` as described in [3.1 - MQTT interface authentication](#3.1 - MQTT interface authentication).

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

## 5 All done 🎉
Congratulations! You accomplished:
- Running a node in the Streamr Network,
- Created a stream and edited its access control on the on-chain stream registry
- Published data to the Streamr Network using the MQTT interface of your running Broker node
- Subscribed to that data

If you had any problems along the way, please drop a message to the core team on the #dev channel of our [Discord](https://discord.gg/gZAm8P7hK8).
