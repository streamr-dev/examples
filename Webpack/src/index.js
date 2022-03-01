import StreamrClient from 'streamr-client'

const log = (msg) => {
    const elem = document.createElement('p')
    elem.innerHTML = msg
    document.body.appendChild(elem)
}

// REPLACE THIS WITH YOUR OWN PRIVATE KEY
const PrivateKey = 'MY-PRIVATE-KEY'

let client;

if (PrivateKey === 'MY-PRIVATE-KEY') {
    log('You need to set your private key in the script')
} else {
    // Create the client with default options
    client = new StreamrClient({
        auth: {
            privateKey: PrivateKey
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
})

document.getElementById('publish').addEventListener('click', async () => {
    if (!client) {
        log('Client hasn\'t been initialized. This is likely because you still need to replace the private key.');
        return;
    }

    // Here is the event we'll be sending
    const msg = {
        hello: 'world',
        random: Math.random(),
    }

    client.getOrCreateStream({
        id: `${await client.getAddress()}/webpack-example-data`,
    }).then((stream) => setInterval(() => {
        // Publish the message to the Stream
        client.publish(stream, msg)
            .then(() => log(`Sent successfully: ${JSON.stringify(msg)}`))
            .catch((err) => console.error(err))
    }, 1000))
})
