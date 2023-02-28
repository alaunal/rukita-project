/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      'display': ['"Lato"'],
      'body': ['"Lato"'],
    },
    extend: {
      aspectRatio: {
        '4/3': '4 / 3',
        '3/4': '3 / 4',
        '3/5': '3 / 5',
        '5/3': '5 / 3',
        '9/16': '9 / 16',
      },
      zIndex: {
        1: "1",
        1000: "1000",
      },
    },
  },
  plugins: [],
}
