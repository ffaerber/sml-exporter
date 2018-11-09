const Koa = require('koa')
const app = new Koa()
const metrics = require('./metrics/route')
const bodyparser = require('koa-bodyparser')

app
  .use(bodyparser())
  .use(metrics.routes())

module.exports = app