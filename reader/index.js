"use strict";
//require('dotenv').config()
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const Reading = require("../libs/Reading");

const redis = require("redis");
const redisClient = redis.createClient(process.env.REDIS_HOST);
redisClient.on("error", console.error);

let port = new SerialPort("/dev/ttyUSB0", {
  dataBits: 7
});
const parser = port.pipe(
  new Readline({
    delimiter: "!"
  })
);

parser.on("data", function(data) {
  let reading = new Reading(data);
  if (reading.valid()) {
    let r = {
      meterSerialnumber: reading.meterSerialnumber,
      energyAMilliwattHour: reading.energyAMilliwattHour,
      energyBMilliwattHour: reading.energyBMilliwattHour,
      powerAMilliwatt: reading.powerAMilliwatt,
      powerBMilliwatt: reading.powerBMilliwatt
    }
    redisClient.set(Date.now(), JSON.stringify(r), "EX", 60);
  }
});
