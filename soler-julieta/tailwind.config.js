/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        transparentViolet: '#9966cc1a',
        mainViolet: '#9966cc',
        darkViolet: '#7a4db1',
        txtGrey: '#616161',
        lineGrey: '#ADADAD',
        bkgGrey: '#F7F7F7',
        cardBorder: '#e4e4e7',
        mainBlue: '#6699cc',
        mainYellow: '#fff4b8'
      }
    },
  },
  plugins: [],
}