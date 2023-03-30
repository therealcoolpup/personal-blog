/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pri': '#027efb',
        'sec': '#696969'
      },
      screens: {
        'phone': '640px',   
        'tablet': '768px',   
        'desktop': '1024px',  
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
