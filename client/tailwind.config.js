/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      screens:{
        'custom-small':'358px'
      },
      fontSize:{
         'custom-xs':'12px'
      }
    },
  },
  plugins: [],
}

