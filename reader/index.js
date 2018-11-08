"use strict";
const mqtt = require('mqtt')
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const Reading = require("../libs/Reading");

const Redis = require('ioredis');
const redisClient = new Redis(process.env.REDIS_HOST);

const mqttClient = mqtt.connect(process.env.MQTT_BROKER_HOST)

let port = new SerialPort("/dev/ttyUSB0", {
  dataBits: 7
})

const parser = port.pipe(
  new Readline({
    delimiter: "!"
  })
)

mqttClient.on('connect', function () {
  mqttClient.subscribe(process.env.MQTT_TOPIC)

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
      redisClient.sadd("meters", meterSerialnumber);
      mqttClient.publish(meterSerialnumber, r)
    }
  })
})