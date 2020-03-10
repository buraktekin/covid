#!/usr/bin/env node

const axios = require('axios')
const yargs = require('yargs')
const chalk = require("chalk")
const boxen = require("boxen")
const CFonts = require('cfonts')
const { ui } = require("./ui")
const { generateURL } = require("./arcGis")


// get options to format interface
const { boxenOptions, cfontsOptions } = ui


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
CFonts.say('-- COVID-19 --', cfontsOptions.title);
const msgBox = boxen( message, boxenOptions.locInfo )
console.log(chalk.white.bold(msgBox))
// ##############################################


// Display the results
const displayResults = (data) => {
  if(data) {
    let lastUpdate = new Date()
    if( options.location ) {
      const { Last_Update, Confirmed = 0, Deaths = 0, Recovered = 0 } = data
      const msgBoxDeaths = boxen( `Deaths: ${Deaths}`, boxenOptions.deaths )
      const msgBoxConfirmed = boxen( `Confirmed: ${Confirmed}`, boxenOptions.confirmed )
      const msgBoxRecovered = boxen( `Recovered: ${Recovered}`, boxenOptions.recovered )
      console.log(chalk.white.bold( msgBoxDeaths ))
      console.log(chalk.white.bold( msgBoxConfirmed))
      console.log(chalk.white.bold( msgBoxRecovered ))
      lastUpdate = Last_Update
    } else {
      const { Report_Date, Total_Confirmed = 0, Total_Recovered = 0 } = data
      const msgBoxConfirmed = boxen( `Total Confirmed:\n${Total_Confirmed}`, boxenOptions.deaths )
      const msgBoxRecovered = boxen( `Total Recovered:\n${Total_Recovered}`, boxenOptions.recovered )
      console.log(chalk.white.bold( msgBoxConfirmed ))
      console.log(chalk.white.bold( msgBoxRecovered ))
      lastUpdate = Report_Date
    }
    console.log("\n Last Update: ", new Date(lastUpdate).toUTCString())
    CFonts.say('-------------', cfontsOptions.title);
  } else {
    const msgBoxDeaths = boxen( `No data found for: ${options.location}`)
    console.log(chalk.white.bold( msgBoxDeaths ))
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
