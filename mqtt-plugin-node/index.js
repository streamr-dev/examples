const mqtt = require('mqtt')

const client = mqtt.connect('https://streamr.network/network-explorer/nodes/0xDFbc82D80B743DC4Ab8dafBC9AfFc55f2245Fa7E')

client.on('connect', function () {
  client.subscribe('presence', function (err) {
    if (!err) {
      client.publish('presence', 'Hello mqtt')
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})