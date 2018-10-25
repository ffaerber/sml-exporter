'use strict';
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const Reading = require('../libs/Reading')



let port = new SerialPort('/dev/ttyUSB0', {
  dataBits: 7
})
const parser = port.pipe(new Readline({
  delimiter: '!'
}))

parser.on('data', function (data) {
  let reading = new Reading(data)
  if (reading.valid()) {
    let r = {
      meterSerialnumber: reading.meterSerialnumber,
      energyAMilliwattHour: reading.energyAMilliwattHour,
      energyBMilliwattHour: reading.energyBMilliwattHour,
      powerAMilliwatt: reading.powerAMilliwatt,
      powerBMilliwatt: reading.powerBMilliwatt
    }
    console.log(r)
  }
})