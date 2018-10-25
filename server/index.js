const Koa = require('koa')
const app = new Koa()
const metrics = require('./metrics/route')
const bodyparser = require('koa-bodyparser')
const prometheus = require('../middlewares/prometheus')

app
  .use(prometheus())
  .use(bodyparser())
  .use(metrics.routes())

const server = app.listen(3000).on('error', err => {
  console.error(err)
})

module.exports = server