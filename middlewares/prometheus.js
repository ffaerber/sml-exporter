function prometheus () {
  const Prometheus = require('prom-client')
  const httpRequestDurationMicroseconds = new Prometheus.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route'],
    // buckets for response time from 0.1ms to 500ms
    buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500]
  })
  return function prometheus (ctx, next) {
    const start = Date.now()
    return next().then(function () {
      const delta = Math.ceil(Date.now() - start)
      httpRequestDurationMicroseconds
        .labels(ctx.request.method, ctx.request.path)
        .observe(delta)
    })
  }
}
module.exports = prometheus
