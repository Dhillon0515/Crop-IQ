/** @t
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // This is the key: it allows us to toggle dark mode manually via a class
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        // Define your Template 1 colors here for easy Tailwind use
        darkBg: '#0b101b',
        darkCard: '#161c2d',
        agriNeon: '#39ff14',
      },
    },
  },
  plugins: [],
}