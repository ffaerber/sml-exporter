const mosca = require('mosca')

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
server.on('ready', setup); //on init it fires up setup()

// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running')
}