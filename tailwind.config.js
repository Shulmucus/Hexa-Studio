/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hexal: {
          bg: '#050505',       // Deep Void Black
          surface: '#121212',  // Dark Gray
          primary: '#8b5cf6',  // Void Purple
          gold: '#FFD700',     // <-- SOULS GOLD
          muted: '#52525b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Cinzel', 'serif'], // The "Dark Souls" style font
      },
    },
  },
  plugins: [],
}