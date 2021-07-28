import StreamrClient from 'streamr-client'

const log = (msg) => {
    const elem = document.createElement('p')
    elem.innerHTML = msg
    document.body.appendChild(elem)
}

<<<<<<< HEAD
// Create the client with default options
const client = new StreamrClient()

document.getElementById('subscribe').addEventListener('click', () => {
    // Subscribe to a stream
    const subscription = client.subscribe({
=======
// REPLACE THIS WITH YOUR OWN PRIVATE KEY
const PRIVATE_KEY = 'MY-PRIVATE-KEY'

let client;

if (PRIVATE_KEY === 'MY-PRIVATE-KEY') {
    log('You need to set your private key in the script')
} else {
    // Create the client with default options
    client = new StreamrClient({
        auth: {
            privateKey: PRIVATE_KEY
        }
    })
}

document.getElementById('subscribe').addEventListener('click', async () => {
    if (!client) {
        log('Client hasn\'t been initialized. This is likely because you still need to replace the private key.');
        return;
    }

    // Subscribe to a stream
    await client.subscribe({
>>>>>>> update-examples-from-monorepo
        stream: '7wa7APtlTq6EC5iTCBy6dw',
        // Resend the last 10 messages on connect
        resend: {
            last: 10,
        },
    }, (message) => {
        // Handle the messages in this stream
        log(JSON.stringify(message))
    })

    // Event binding examples
    client.on('connected', () => {
        log('A connection has been established!')
    })
<<<<<<< HEAD

    subscription.on('subscribed', () => {
        log(`Subscribed to ${subscription.streamId}`)
    })

    subscription.on('resending', () => {
        log(`Resending from ${subscription.streamId}`)
    })

    subscription.on('resent', () => {
        log(`Resend complete for ${subscription.streamId}`)
    })

    subscription.on('no_resend', () => {
        log(`Nothing to resend for ${subscription.streamId}`)
    })
})

document.getElementById('publish').addEventListener('click', () => {
=======
})

document.getElementById('publish').addEventListener('click', async () => {
    if (!client) {
        log('Client hasn\'t been initialized. This is likely because you still need to replace the private key.');
        return;
    }

>>>>>>> update-examples-from-monorepo
    // Here is the event we'll be sending
    const msg = {
        hello: 'world',
        random: Math.random(),
    }

<<<<<<< HEAD
    // Publish the event to the Stream
    client.publish('MY-STREAM-ID', msg, 'MY-API-KEY')
        .then(() => log('Sent successfully: ', msg))
        .catch((err) => log(err))
=======
    client.getOrCreateStream({
        id: `${await client.getAddress()}/webpack-example-data`,
    }).then((stream) => setInterval(() => {
        // Publish the message to the Stream
        client.publish(stream, msg)
            .then(() => log(`Sent successfully: ${JSON.stringify(msg)}`))
            .catch((err) => console.error(err))
    }, 1000))
>>>>>>> update-examples-from-monorepo
})
