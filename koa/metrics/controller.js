const prom = require('prom-client')

const energyAMilliwattHourGauge = new prom.Gauge({
  name: 'energy_a_milliwatt_hour',
  help: 'help'
})

const energyBMilliwattHourGauge = new prom.Gauge({
  name: 'energy_b_milliwatt_hour',
  help: 'help'
})

const powerAMilliwattGauge = new prom.Gauge({
  name: 'power_a_milliwatt_hour',
  help: 'help'
})

const powerBMilliwattGauge = new prom.Gauge({
  name: 'power_b_milliwatt_hour',
  help: 'help'
})

const show = async ctx => {
  const contectType = await prom.register.contentType
  //ctx.set('Content-Type', contectType) // BUG https://github.com/koajs/koa/issues/1120
  ctx.type = 'text';
  const metrics = await prom.register.metrics()
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

  powerAMilliwattGauge.set(powerAMilliwatt, timestamp)
  powerBMilliwattGauge.set(powerBMilliwatt, timestamp)

  ctx.body = 'OK'
  ctx.status = 201
}

module.exports = {
  show,
  create
}
