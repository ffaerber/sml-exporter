"use strict";
const Redis = require('ioredis');
const MQTT = require('mqtt')
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const Reading = require("../libs/Reading");

const redis = new Redis(process.env.REDIS_HOST);
const mqtt = MQTT.connect(process.env.MQTT_BROKER_HOST)

const port = new SerialPort("/dev/ttyUSB0", {
  dataBits: 7
})

const parser = port.pipe(
  new Readline({
    delimiter: "!"
  })
)


mqtt.on('connect', function () {
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
      redis.sadd("meters", meterName);
      mqtt.publish(meterName, JSON.stringify(r))
    }
  })
})