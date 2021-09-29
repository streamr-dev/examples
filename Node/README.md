# Node

This example demostrates how to use the Streamr Client in a Node environment. Node version 14 or higher is recommended.

## Setting Up

### Ethereum Private Key

If you are using the publish script, replace the [following line](https://github.com/streamr-dev/examples/blob/a70893cf03f124d613d3a51561b2ec8c3cb8a0bf/Node/node-example-publish.js#L4) with your private key.

If you are using the subscribe script, replace the [following line](https://github.com/streamr-dev/examples/blob/c2c736e25911705c0f549637a73654168bb2ec10/Node/node-example-subscribe.js#L4) with your private key.

## Running

To run the pub-sub demo,
1. Run `npm install`
2. Replace the private key with your own. There are online generators for this, or you can extract your Ethereum private key from Metamask. Do not store significant value on this account.
3. In one console window, run `npm run publish`. This will start publishing data points into a stream.
4. In another console window, run `npm run subcribe`. You should be able to see the messages published from your other console window. You can run this subcription process as many times as you wish.
