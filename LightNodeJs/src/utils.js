const { Wallet } = require( 'ethers' )
const config = require( './config.js' )

module.exports = {
    isValidPrivateKey: (privateKey) => {
        try {
	    const w = new Wallet(privateKey)
            return true
        } catch (e){
            console.error(e)
            return false
        }
    },

    isRunFlagPresent: (args) => {
        args = args.slice(2)
        return (args.length > 0 && args[0] === '--run')
    }
}

