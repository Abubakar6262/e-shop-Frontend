/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}', './public/index.html'],
  mode:"jit",
  theme: {
    fontFamily:{
      Roboto:["Roboto","sana-serif"],
      Poppins:["Poppins","sana-serif"],
    },
    extend: {
      screens:{
        "1000px":"1050px",
        "1100px":"1110px",
        "800px":"800px",
        "1300px":"1300px",
        "400px":"400px",
      }
    },
  },
  plugins: [],
}

