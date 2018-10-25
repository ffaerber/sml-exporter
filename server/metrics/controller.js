// app.get('/metrics', (req, res) => {
//   res.set('Content-Type', Prometheus.register.contentType)
//   res.end(Prometheus.register.metrics())
// })

const Prometheus = require('prom-client')

const show = async ctx => {
  const contectType = await Prometheus.register.contentType
  ctx.set('Content-Type', contectType)
  const metrics = await Prometheus.register.metrics()
  ctx.body = metrics
}

module.exports = { show }
