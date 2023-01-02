<p align="center">
  <a href="https://streamr.network">
    <img alt="Streamr" src="https://raw.githubusercontent.com/streamr-dev/network-monorepo/main/packages/client/readme-header.png" width="1320" />
  </a>
</p>

<h1 align="left">
  Streamr usage examples
</h1>

[![Discord Chat](https://img.shields.io/discord/801574432350928907.svg?label=Discord&logo=Discord&colorB=7289da)](https://discord.gg/FVtAph9cvz)

Applications publish and subscribe to streams via Streamr nodes. In other words, nodes are the access points to the Streamr Network. To connect your application to streams, you interface it with a Streams node. This repository contains examples of pushing or pulling data into or out of the Streamr Network.

There are two strategies for interfacing applications with Streamr nodes: 

- **Light node:** the node is imported to your application as a library and runs locally as part of your application
- **Broker node:** the node runs separately, and your application connects to it remotely using one of the supported protocols

Check out the [Developer docs](https://streamr.network/docs) for more more in depth implementation details.
