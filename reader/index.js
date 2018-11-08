"use strict";
const prom = require('prom-client');
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const Reading = require("../libs/Reading");

let port = new SerialPort("/dev/ttyUSB0", {
  dataBits: 7
});
const parser = port.pipe(
  new Readline({
    delimiter: "!"
  })
);

const gauge = new prom.Gauge({
  name: 'gauge_name',
  help: 'gauge_help'
});

parser.on("data", function (data) {
  let reading = new Reading(data);
  if (reading.valid()) {
    let timestamp = Date.now()
    let meterSerialnumber = reading.meterSerialnumber
    let r = {
      timestamp,
      meterSerialnumber,
      energyAMilliwattHour: reading.energyAMilliwattHour,
      energyBMilliwattHour: reading.energyBMilliwattHour,
      powerAMilliwatt: reading.powerAMilliwatt,
      powerBMilliwatt: reading.powerBMilliwatt
    }
    gauge.set(reading.energyAMilliwattHour, timestamp)
  }
});