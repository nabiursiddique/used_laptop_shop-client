/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: ["lemonade", "dracula"],
  },
  theme: {
    extend: {
      fontFamily:{
        body:'Poppins',
      }
    },
  },
  plugins: [require("daisyui"),require('tailwindcss-animated')],
}

