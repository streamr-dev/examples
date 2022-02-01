const StreamrClient = require('streamr-client').StreamrClient
const utils = require('./utils.js')
const config = require('./config.js')

const main = async () => {
    const PRIVATE_KEY = config.privateKey

    if (!utils.isValidPrivateKey(PRIVATE_KEY)) {
        console.log('You need to register a Streamr account and get a Private Key before you can use this example.')
        process.exit(1)
    }
    // Create the client using the validated private key
    const client = new StreamrClient({
        auth: {
            privateKey: PRIVATE_KEY,
        },
    })

    // Create the default stream
    const stream = await client.createStream({
        id: `${await client.getAddress()}/${Date.now()}`
    })
    
    console.log(`Stream ${stream.id} created`)

    // Now get the stream 
    const fetchedStream = await client.getStream(stream.id)
    console.log(`Stream ${fetchedStream.id} fetched`)
    await client.destroy()
    return stream.id
}


if (utils.isRunFlagPresent(process.argv)){
    main()
}

module.exports = main