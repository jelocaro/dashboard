const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    colors: {
      main: {
        light: '#EEF4E1',
        default: '#99CF16'
      },
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
})