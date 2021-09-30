import {Wallet} from 'ethers'
import { StreamOperation } from 'streamr-client'

export const utils = {
    isValidPrivateKey: (privateKey) => {
        try {
            new Wallet(privateKey)
            return true
        } catch (e){
            console.error(e)
            return false
        }
    },

    enableAllPermissions: async (stream) => {
        await stream.grantPermission(StreamOperation.STREAM_GET, undefined)
        await stream.grantPermission(StreamOperation.STREAM_SUBSCRIBE, undefined)
        await stream.grantPermission(StreamOperation.STREAM_PUBLISH, undefined)
    }
}