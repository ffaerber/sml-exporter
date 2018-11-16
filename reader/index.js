const axios = require('axios');
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const Reading = require("../libs/Reading");

const port = new SerialPort("/dev/ttyUSB0", {
  dataBits: 7
})

const parser = port.pipe(
  new Readline({
    delimiter: "!"
  })
)

parser.on("data", function (data) {
  const reading = new Reading(data);
  if (reading.valid()) {
    const meterName = `${reading.manufacturerName}_${reading.meterSerialnumber}`
    const r = {
      timestamp: Date.now(),
      energyAMilliwattHour: reading.energyAMilliwattHour,
      energyBMilliwattHour: reading.energyBMilliwattHour,
      powerAMilliwatt: reading.powerAMilliwatt,
      powerBMilliwatt: reading.powerBMilliwatt
    }
    console.log(r)
    axios.post('http://koa:3000/metrics', r)
      .then(console.log('ok'))
      .catch(console.error)
  }
})
