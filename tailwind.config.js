/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html"],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '24px',
    },
    extend: {
      fontFamily: {
        serif: ['Lora', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#0d9488', // teal-600
        accent: '#2dd4bf', // teal-400
        darkbg: '#0f172a', // slate-900
        lightbg: '#faf9f6', // warm alabaster
      },
    },
  },
  plugins: [],
}
