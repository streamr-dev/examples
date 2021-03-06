# Web

This example demostrates how to use the Streamr Client with plain HTML. These examples use the web version of the Streamr JS client, pulled from the external [Unpkg service](https://unpkg.com/streamr-client).

## Setting Up
You can install [live-server](https://github.com/tapio/live-server) and serve the `www` folder to run the examples locally with the following commands:
```shell
$ npm install
$ npm start
```

### Stream Publish web example

This example publishes a message to a stream, from inside the browser. It requires private key authentication and a pre-existing stream that can be created in the [Streamr Core UI](https://streamr.network/core)

- Replace the ![following line](https://github.com/streamr-dev/examples/blob/c2c736e25911705c0f549637a73654168bb2ec10/Web/web-example-produce.html#L23) with your private key.
- Replace the ![following line](https://github.com/streamr-dev/examples/blob/c2c736e25911705c0f549637a73654168bb2ec10/Web/web-example-publish.html#L20) with your stream ID.

### Stream Subscribe web example

This example subsribes to the [Helsinki Tram GPS stream](https://streamr.network/marketplace/products/31e8df5243ce49cfa250002f60b73e475f39b44723ca4fbcbf695198d19c6b08). 

### Metamask integration example

Shows how to authenticate to Streamr using Metamask and can create new streams and export the session key if needed. It requires Metamask to be installed on a modern browser.

## Running examples

Open the html files in your browser using `open web-example-publish.html` or `open web-example-subscribe.html`. 

**IMPORTANT:** For the Metamask example, you will need to install [live-server](https://github.com/tapio/live-server) and run the html file with it using `live-server web-example-metamask.html`.
