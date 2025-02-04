/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['hover', 'focus'],
      textColor: ['hover', 'focus'],
    },
  },
  plugins: [],
}