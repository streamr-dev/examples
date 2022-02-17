#  Raspberry Pi CPU Usage Stream
This simple node script first reads through the RPi system to get the CPU usage.

Video Tutorial: https://youtu.be/WHmCSKq2CdI

## Setting Up

### Etherum Private Key

Install dependencies using npm or yarn:

`npm install` or `yarn install`

This script requires an ethereum private key. You should create a `.env` file in the root directory and add this line:

`ETHEREUM_PrivateKey=`

Paste your private key after the equals sign.

### Stream ID

You will also need a Stream ID which you can get by creating a new Stream on Streamr Core and replace [this line](https://github.com/streamr-dev/examples/blob/89c374d3b182044178f19dd0875da98aa02a088a/RaspberryPiClient/index.js#L43).

## Running

Use `npm run start` or `yarn start` to run node script.
