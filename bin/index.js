#!/usr/bin/env node

const axios = require('axios')
const yargs = require('yargs')
const chalk = require("chalk")
const boxen = require("boxen")
const CFonts = require('cfonts')
const { ui } = require("./ui")
const { generateURL } = require("./arcGis")
const { option } = require('yargs')

// get options to format interface
const { boxenOptions, cfontsOptions } = ui

// Methods
const render = (data) => {
  return console.log(chalk.white.bold(data))
}

const spaceFix = (msg, info) => {
  return info + ' '.repeat(msg.length - info.length)
}

const fetchData = async (options) => {
  const location = options.location
  const url = generateURL(location)
  await axios.get(url, { headers: { Accept: "application/json" } })
  .then(res => {
    if (location) {
      const data = res.data.features
      for(let i = 0; i < data.length; i++) {
        const { Country_Region: region, ...attr } = data[i].attributes
        if(region.toLowerCase() === location.toLowerCase()) {
          return attr
        }
      }
      if (data.length === 0) {
        render("no data found!")
      }
    } else {
      return res.data.features[0].attributes
    }
  })
  .then(res => {
    displayResults(res, options)
  })
}


// Display the results
const displayResults = (data, options) => {
  // message to display selected location
  const message = options.location ? 
    `Selected Location: ${options.location.toUpperCase()}`
    : "No Location Selected"
  const msgBox = boxen( message, boxenOptions.locInfo )
  
  CFonts.say(
    '-- COVID-19 --', 
    cfontsOptions.title
  )
  render(msgBox)
  
  if(data) {
    let lastUpdate = new Date()
    if( options.location ) {
      const { 
        Last_Update, 
        Confirmed = 0, 
        Deaths = 0, 
        Recovered = 0 
      } = data

      const msgBoxDeaths = boxen( 
        spaceFix(message, `Deaths: ${Deaths}`), 
        boxenOptions.deaths
      )

      const msgBoxConfirmed = boxen( 
        spaceFix(message, `Confirmed: ${Confirmed}`), 
        boxenOptions.confirmed 
      )

      const msgBoxRecovered = boxen(
        spaceFix(message, `Recovered: ${Recovered}`), 
        boxenOptions.recovered 
      )

      render(msgBoxDeaths)
      render(msgBoxConfirmed)
      render(msgBoxRecovered)
      lastUpdate = Last_Update
    } else {
      const { 
        Report_Date, 
        Total_Confirmed = 0, 
        Total_Recovered = 0 
      } = data

      const msgBoxConfirmed = boxen(
        `Total Confirmed:\n${Total_Confirmed}`,
        boxenOptions.deaths,
      )
      
      const msgBoxRecovered = boxen(
        `Total Recovered:\n${Total_Recovered}`,
        boxenOptions.recovered,
      )

      render(msgBoxConfirmed)
      render(msgBoxRecovered)
      lastUpdate = Report_Date
    }
    
    console.log(
      chalk
        .bold
        .magenta(
          '\nLast Update: ' + new Date(lastUpdate).toUTCString()
        )
    );
  } else {
    const msgBoxNoDataFound = boxen(
      `No data found for: ${options.location}`,
      boxenOptions.locInfo,
    )
    render(msgBoxNoDataFound)
  }

  CFonts.say(
    '  -- end --  ', 
    cfontsOptions.title
  );
}


// add args to let users be able to select a specific location
const options = yargs
  .usage(
    "Usage: -l <location>"
  )
  .option(
    "l", {
    alias: "location", 
    describe: "A country name",
    type: "string",
    demandOption: false
  })
  .argv

// Call covid
const covid = () => fetchData(options)
covid()