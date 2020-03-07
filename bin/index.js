#!/usr/bin/env node

const axios = require('axios')
const yargs = require('yargs')
const chalk = require("chalk")
const boxen = require("boxen")
const { generateURL } = require("./arcGis")

// add args to let users be able to select a specific location
const options = yargs
  .usage("Usage: -l <location>")
  .option("l", {
    alias: "location", 
    describe: "A country name",
    type: "string",
    demandOption: false
  })
  .argv

// Boxen for a better UI
const boxenOptions = {
  confirmed: {
    padding: 1,
    borderStyle: "round",
    borderColor: "red",
    backgroundColor: "red"
  },
  recovered: {
    padding: 1,
    borderStyle: "round",
    borderColor: "green",
    backgroundColor: "green"
  }
}

// message to display selected location
const message = 
  options.location ? 
    `Selected Location: ${options.location}`
    : 
    "No Location Selected"
const msgBox = boxen( message, boxenOptions );
console.log(msgBox);


const url = generateURL(options.location)
axios.get(url, { headers: { Accept: "application/json" } })
.then(res => {
  if (options.location) {
    // if searching for jokes, loop over the results
    const data = res.data.features
    for(let i = 0; i < data.length; i++) {
      if(data[i].attributes.Country_Region.toLowerCase() === options.location.toLowerCase()) {
        const {Confirmed, Deaths, Recovered} = data[i].attributes
        console.log(
          Confirmed,
          Deaths,
          Recovered
        )
        break
      }
    }
    if (data.length === 0) {
      console.log("no data found!");
    }
  } else {
    console.log(data[0]);
  }
});

