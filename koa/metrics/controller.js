const prom = require('prom-client')
const energyAMilliwattHourGauge = new prom.Gauge({
  name: 'energyAMilliwattHour',
  help: 'energyAMilliwattHour_help'
});

const energyBMilliwattHourGauge = new prom.Gauge({
  name: 'energyBMilliwattHour',
  help: 'energyBMilliwattHour_help'
});

const show = async ctx => {
  const contectType = await prom.register.contentType
  ctx.set('Content-Type', contectType)
  const metrics = await prom.register.metrics()
  console.log(metrics) // BUG https://github.com/koajs/koa/issues/1120
  ctx.body = metrics
}

const create = async ctx => {

  const {
    timestamp,
    energyAMilliwattHour,
    energyBMilliwattHour,
    powerAMilliwatt,
    powerBMilliwatt
  } = ctx.request.body

  energyAMilliwattHourGauge.set(energyAMilliwattHour, timestamp)
  energyBMilliwattHourGauge.set(energyBMilliwattHour, timestamp)
  ctx.body = 'OK'
  ctx.status = 201
}

module.exports = {
  show,
  create
}