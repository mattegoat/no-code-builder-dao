/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  plugins: [require('@tailwindcss/forms'), require('daisyui')],
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    // logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'dark',
  },
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './@dao-auction/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Helvetica', 'system-ui'],
      serif: ['Arial', 'Georgia'],
      mono: ['Arial', 'SFMono-Regular'],
      display: ['Arial'],
      body: ['Arial'],
    },
  },
}
