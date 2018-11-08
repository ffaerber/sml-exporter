const Prometheus = require('prom-client')

const show = async ctx => {
  const contectType = await Prometheus.register.contentType
  ctx.set('Content-Type', contectType)
  const metrics = await Prometheus.register.metrics()
  console.log(metrics) // BUG https://github.com/koajs/koa/issues/1120
  ctx.body = metrics
}

module.exports = {
  show
}