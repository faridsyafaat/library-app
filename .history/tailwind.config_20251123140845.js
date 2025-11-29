/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
      },
    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1200px", // container lg = 1200px
        xl: "1200px",
        "2xl": "1200px"
      }
    }
  },
  plugins: [],
};
