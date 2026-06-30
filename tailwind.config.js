/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0075C4',
          red:  '#C41230',
          dark: '#080b14',
          card: '#0f1423',
        },
      },
    },
  },
  plugins: [],
}
