# Bridging data into the Network with the Broker Node interface 

## 1 - Setup your broker node. (For MacOS/Linux)
Prerequisites: NPM v8 and Node 16.13.x

### 1.1 - Install `streamr-broker` globally
```shell
$ npm i -g streamr-broker@31.0.1
```

### 1.2 - Initial broker setup
Before the Broker node can be started its configuration files need to be created using the following command:
```shell
$ streamr-broker-init
```
After creating or importing your private key you will have to enable the `mqtt-plugin` and assign a port to it (default is 1883)

Once the script is done you can view your generated configuration file with:
```shell
$ cat ~/.streamr/config/default.json
```

### 1.3 - Running the broker
You can start the broker by running:
```shell
$ streamr-broker
```

To include more verbose logging you can add the related flags:
```shell
$ LOG_LEVEL=trace DEBUG=Streamr* streamr-broker
```
## 2 - Create the Stream and update the stream access control.
In this step the Broker node is given permission to publish data points to the stream.

In order to create a stream you will need an Ethereum address with a small amount of MATIC to pay for gas during stream creation and permission assignation.

We will be using the javascript `streamr-client v>= 6.0.4`.

### 2.1 StreamrClient creation
First, we create a `StreamrClient` instance with our funded private key:
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

The created stream will automatically prepend the given `id` with the `streamr`'s address.

### 2.3 - Assign permissions
This step will also consume a small amount of MATIC token.

We will be granting the broker's account `PUBLISH` and `SUBSCRIBE` permissions on the stream we just created.

We will need to provide the `StreamId`, as well as the `BrokerNodeAddress`, which can be found whenever we start the broker in step 1.3:
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

### 2.4 - The Script
Alternatively, you can easily create a stream and assign its permissions with the [Create stream and assign permissions](./scripts/01-CreateStreamAndAssignPermissions.js). You will need to provide a value for `PrivateKey` that has MATIC balance, as well as the generated address of your broker node, `BrokerNodeAddress`:

```javascript
const PrivateKey = '...'
...
const BrokerNodeAddress = '0x...'
```

After setting this values you can run the script with:
```shell
$ node scripts/01-CreateStreamAndAssignPermissions.js
```



## 3 - Configure your device to publish to the Streamr Broker Node's MQTT interface
### 3.1 - Presets
In order to publish into our created streams we will need to have an instance of the broker running. 

On the client MQTT side we will need to provide a `ApiKey` from the broker's configuration file. You can easily find it in the generated config:

```shell
$ cat ~/.streamr/config/default.json
```
```json
{
    ...
    "apiAuthentication": {
        "keys": [
            "MmZjMTMzZDAxMzAwNGIyZDg4ZTNmMzYzZjU3NWU2YTY"
        ]
    }
}
```

### 3.2 - Authentication

When connecting to the broker's MQTT plugin you will need to provide the url with the MQTT port (default is 1883), as well as an empty `username` field and the `ApiKey` as the `password`.

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

### 3.3 - Publishing data

Once connected the MQTT client can call `publish` by providing a `StreamId` as the first parameter and a message as the second, which will be casted by the broker into the provided stream.

```javascript
// Node.js example

await mqttClient.publish(
    StreamId, 
    JSON.stringify({ foo: bar })
)

```

### 3.4 - The Example Script
You can find a node.js example using `async-mqtt` in the [MQTT publisher script](./scripts/02-MqttPublisher.js)


## 4 - Consume your data
### 4.1 With MQTT
You can consume the published data via MQTT as well.

You will need to get your `ApiKey` as described in [3.1 - Presets](#3.1-presets) and authenticate your MQTT client as described in [3.2 - Authentication)[#3.2-authentication]

Once connected, you can listen for the `message` callback on the MQTT client. The first parameter will be the `StreamId` and the second one the published message:

```javascript
// Node.js example

mqttClient.subscribe(StreamId)
...
mqttClient.on('connect', () => {
    mqttClient.on('message', (streamId, rawData) => {
        ...
    })
})
```

You can find an example using node.js and `mqtt` in the [MQTT subscriber script](./scripts/03-MqttSubscriber.js)

### 4.2 Using Streamr Core
You can see the published messages on your streams by accessing [Streamr's Core Webapp](https://streamr.network/core) and logging in with Metamask using the broker's private key.


### 4.3 Using `@streamr/cli-tools`
Alternativecly, you can use [Streamr's cli tools](
https://github.com/streamr-dev/network-monorepo/tree/main/packages/cli-tools) to subscribe to the created streams and see their incoming messages:

```shell
$ npm install -g @streamr/cli-tools
$ streamr stream subscribe 0x.../sensor/firehose --private-key
YOUR_USER_WALLET_PRIVATE_KEY
```