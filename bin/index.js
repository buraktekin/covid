#!/usr/bin/env node

const axios = require('axios')
const yargs = require('yargs')
const chalk = require("chalk")
const boxen = require("boxen")
const { url } = require("./arcGis")

const options = yargs
  .usage("Usage: -l <location>")
  .option("l", {
    alias: "location", 
    describe: "A country name",
    type: "string",
    demandOption: false
  })
  .argv

const message = options.location ? 
  `Selected Location: ${options.location}`: "No Location Selected"
console.log(message)

const boxenOptions = {
  padding: 1,
  borderStyle: "round",
  borderColor: "green",
  backgroundColor: "green"
}

const msgBox = boxen( message, boxenOptions );
console.log(msgBox);


console.log(url);
