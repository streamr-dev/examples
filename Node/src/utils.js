import {Wallet} from 'ethers'

export const utils = {
    isValidPrivateKey: (privateKey) => {
        try {
            new Wallet(privateKey)
            return true
        } catch (e){
            console.error(e)
            return false
        }
    }
}