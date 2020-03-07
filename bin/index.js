#!/usr/bin/env node

const axios = require('axios')
const yargs = require('yargs')
const chalk = require("chalk")
const boxen = require("boxen")
const { boxenOptions } = require("./ui")
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
// ##############################################


// message to display selected location
const message = 
  options.location ? 
    `Selected Location: ${options.location.toUpperCase()}`
    : 
    "No Location Selected"
const msgBox = boxen( message, boxenOptions.locInfo )
console.log(chalk.black.bold(msgBox))
// ##############################################


// Display the results
const displayResults = (data) => {
  if( options.location ) {
    const { Confirmed = 0, Deaths = 0, Recovered = 0 } = data
    const msgBoxDeaths = boxen( `Deaths:\n${Deaths}`, boxenOptions.deaths )
    const msgBoxConfirmed = boxen( `Confirmed:\n${Confirmed}`, boxenOptions.confirmed )
    const msgBoxRecovered = boxen( `Recovered:\n${Recovered}`, boxenOptions.recovered )
    console.log(chalk.white.bold( msgBoxDeaths ))
    console.log(chalk.white.bold( msgBoxConfirmed ))
    console.log(chalk.white.bold( msgBoxRecovered ))
  } else {
    console.log(data)
  }
}
// ##############################################


// Fetch data and display results
async function fetchData() {
  const url = generateURL(options.location)
  await axios.get(url, { headers: { Accept: "application/json" } })
  .then(res => {
    if (options.location) {
      // if searching for jokes, loop over the results
      const data = res.data.features
      for(let i = 0; i < data.length; i++) {
        if(data[i].attributes.Country_Region.toLowerCase() === options.location.toLowerCase()) {
          return data[i].attributes
        }
      }
      if (data.length === 0) {
        console.log("no data found!")
      }
    } else {
      return res.data.features[0].attributes
    }
  })
  .then(res => {
    displayResults(res)
  })
}
// ##############################################


fetchData()
