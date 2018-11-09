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

let meterSerialnumber = null

mqtt.on('connect', function () {
  parser.on("data", function (data) {
    const reading = new Reading(data);
    if (reading.valid()) {
      const timestamp = Date.now()
      meterSerialnumber = reading.meterSerialnumber
      const r = {
        timestamp,
        meterSerialnumber,
        energyAMilliwattHour: reading.energyAMilliwattHour,
        energyBMilliwattHour: reading.energyBMilliwattHour,
        powerAMilliwatt: reading.powerAMilliwatt,
        powerBMilliwatt: reading.powerBMilliwatt
      }
      if (meterSerialnumber !== null) {
        mqtt.subscribe(meterSerialnumber)
      }



      redis.sadd("meters", meterSerialnumber);
      mqtt.publish(meterSerialnumber, r)
    }
  })
})