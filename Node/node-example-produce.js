<<<<<<< HEAD
import { StreamrClient } from 'streamr-client';

// Create the client and supply either an API key or an Ethereum private key to authenticate
const client = new StreamrClient({
    auth: {
        privateKey: 'ETHEREUM-PRIVATE-KEY',
=======
import StreamrClient from 'streamr-client';

// REPLACE THIS WITH YOUR OWN PRIVATE KEY
const PRIVATE_KEY = 'YOUR-PRIVATE-KEY';

if (PRIVATE_KEY === 'YOUR-PRIVATE-KEY') {
    console.log('You need to register a Streamr account and get a Private Key before you can use this example.');
    process.exit(0);
}

const client = new StreamrClient({
    auth: {
        privateKey: PRIVATE_KEY,
>>>>>>> update-examples-from-monorepo
    },
})

// Create a stream for this example if it doesn't exist
client.getOrCreateStream({
<<<<<<< HEAD
    name: 'node-example-data',
=======
    id: `${await client.getAddress()}/node-example-data`,
>>>>>>> update-examples-from-monorepo
}).then((stream) => setInterval(() => {
    // Generate a message payload with a random number
    const msg = {
        random: Math.random(),
    }

    // Publish the message to the Stream
<<<<<<< HEAD
    stream.publish(msg)
=======
    client.publish(stream, msg)
>>>>>>> update-examples-from-monorepo
        .then(() => console.log('Sent successfully: ', msg))
        .catch((err) => console.error(err))
}, 1000))
