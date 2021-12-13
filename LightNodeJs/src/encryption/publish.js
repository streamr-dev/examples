const StreamrClient = require('streamr-client').StreamrClient
const utils = require('../utils.js')
const config = require('../config.js')


const main = async () => {
    return new Promise(async (resolve, reject) => {
        try {
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
            const stream = await client.getOrCreateStream({
                id: `${await client.getAddress()}/encryption-example`,
                requireEncryptedData: true
            })
            
            const interval = setInterval(async () => {
                const message = { 
                    type: 'client:publish',
                    ts: Date.now(), 
                } 
                const res = await client.publish(stream.id, message)
                console.log('Sent successfully: ', message)
                // you can check that the message is encrypted 
                console.log('encrypted message:', res.serializedContent)
                resolve({ client, interval})
            }, 1000)

        } catch (e){
            reject(e)
        }
    })
    
}


if (utils.isRunFlagPresent(process.argv)){
    main()
}

module.exports = main
