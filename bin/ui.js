// Boxen for a better UI
const ui = {
  boxenOptions: {
    locInfo: {
      padding: 1,
      borderStyle: "bold",
      borderColor: "yellow",
      align: "center",
      margin: {top: 0, right: 5, bottom: 0, left: 5}
    },
    confirmed: {
      padding: 1,
      borderStyle: "bold",
      borderColor: "blue",
      backgroundColor: "blue",
      float: "left",
      margin: {top: 0, right: 5, bottom: 0, left: 5}
    },
    deaths: {
      padding: 1,
      borderStyle: "bold",
      borderColor: "red",
      backgroundColor: "red",
      float: "left",
      margin: {top: 0, right: 5, bottom: 0, left: 5}
    },
    recovered: {
      padding: 1,
      borderStyle: "bold",
      borderColor: "#27C892",
      backgroundColor: "#27C892",
      float: "left",
      margin: {top: 0, right: 5, bottom: 0, left: 5}
    }
  },

  cfontsOptions: {
    title: {
      font: 'tiny',              // define the font face
      align: 'left',              // define text alignment
      colors: ['#fff','red'],         // define all colors
      background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
      letterSpacing: 1,           // define letter spacing
      lineHeight: 1,              // define the line height
      space: true,                // define if the output text should have empty lines on top and on the bottom
      maxLength: '0',             // define how many character can be on one line
      gradient: false,            // define your two gradient colors
      independentGradient: false, // define if you want to recalculate the gradient for each new line
      transitionGradient: false,  // define if this is a transition between colors directly
      env: 'node'                 // define the environment CFonts is being executed in
    },
  }
}

module.exports.ui = ui