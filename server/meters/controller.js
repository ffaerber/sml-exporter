const redis = require("redis");
const {
  promisify
} = require('util');

const redisClient = redis.createClient(process.env.REDIS_HOST);
redisClient.on("error", console.error);

const getAsync = promisify(redisClient.smembers).bind(redisClient);

const list = async ctx => {
  ctx.set('Content-Type', 'text/html')
  const meters = await getAsync('meters')
  console.log(meters)
  if (meters === null) {
    ctx.body = 'no meter found'
  } else {
    ctx.body = meters
  }
}

module.exports = {
  list
}