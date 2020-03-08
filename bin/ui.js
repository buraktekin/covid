// Boxen for a better UI
const ui = {
  boxenOptions: {
    locInfo: {
      padding: 1,
      borderStyle: "bold",
      borderColor: "yellow"
    },
    confirmed: {
      padding: 1,
      borderStyle: "bold",
      borderColor: "blue",
      backgroundColor: "blue",
      float: "left"
    },
    deaths: {
      padding: 1,
      borderStyle: "bold",
      borderColor: "red",
      backgroundColor: "red",
      float: "left"
    },
    recovered: {
      padding: 1,
      borderStyle: "bold",
      borderColor: "#27C892",
      backgroundColor: "#27C892",
      float: "left"
    }
  },

  cfontsOptions: {
    title: {
      font: 'block',              // define the font face
      align: 'center',              // define text alignment
      colors: ['black','#fff'],         // define all colors
      background: 'redBright',  // define the background color, you can also use `backgroundColor` here as key
      letterSpacing: 1,           // define letter spacing
      lineHeight: 2,              // define the line height
      space: true,                // define if the output text should have empty lines on top and on the bottom
      maxLength: '0',             // define how many character can be on one line
      gradient: false,            // define your two gradient colors
      independentGradient: false, // define if you want to recalculate the gradient for each new line
      transitionGradient: false,  // define if this is a transition between colors directly
      env: 'node'                 // define the environment CFonts is being executed in
    },
    location: {
      font: 'chrome',              // define the font face
      align: 'center',              // define text alignment
      colors: ['cyanBright'],         // define all colors
      background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
      letterSpacing: 1,           // define letter spacing
      lineHeight: 1,              // define the line height
      space: true,                // define if the output text should have empty lines on top and on the bottom
      maxLength: '0',             // define how many character can be on one line
      gradient: false,            // define your two gradient colors
      independentGradient: false, // define if you want to recalculate the gradient for each new line
      transitionGradient: false,  // define if this is a transition between colors directly
      env: 'node'                 // define the environment CFonts is being executed in
    }
  }
}

module.exports.ui = ui