const mosca = require('mosca')
const request = require('request');
const {
  StringDecoder
} = require('string_decoder');

const decoder = new StringDecoder('utf8');

var pubsubsettings = {
  type: 'redis',
  redis: require('redis'),
  db: 12,
  port: 6379,
  return_buffers: true, // to handle binary payloads
  host: process.env.REDIS_HOST
};

var moscaSettings = {
  port: 1883, //mosca (mqtt) port
  backend: pubsubsettings //pubsubsettings is the object we created above
};


var server = new mosca.Server(moscaSettings); //here we start mosca

server.on('clientConnected', (client) => {
  console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', (packet, client) => {

  var options = {
    uri: process.env.KOA_HOST,
    method: 'POST',
    json: true,
    body: JSON.parse(decoder.write(packet.payload))
  }
  request(options, console.log)
});

server.on('ready', () => {
  console.log('Mosca server is up and running')
});


request.post('http://koa:3000/metrics', {
  json: {
    todo: 'Buy the milk'
  }
}, (error, res, body) => {
  if (error) {
    console.error(error)
    return
  }
  console.log(`statusCode: ${res.statusCode}`)
  console.log(body)
})