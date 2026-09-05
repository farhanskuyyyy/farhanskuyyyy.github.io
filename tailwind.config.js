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
        display: ['Outfit', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        // Netlify-inspired palette
        primary: '#00AD9F',   // netlify teal
        accent: '#05BDBA',    // bright teal
        blue: {
          DEFAULT: '#4D9ABF', // gradient partner
          soft: '#7BB7D4',
        },
        darkbg: '#0E1E25',    // netlify deep slate
        darksurface: '#15272F',
        darkline: '#1F3A44',
        lightbg: '#FFFFFF',
        lightsurface: '#F6F8F8',
        ink: '#0E1E25',
        muted: '#5B6B73',
      },
      backgroundImage: {
        'teal-blue': 'linear-gradient(90deg, #00AD9F 0%, #05BDBA 45%, #4D9ABF 100%)',
      },
      boxShadow: {
        card: '0 1px 2px rgba(14,30,37,0.06), 0 8px 24px -12px rgba(14,30,37,0.18)',
        glow: '0 0 0 1px rgba(5,189,186,0.35), 0 12px 32px -12px rgba(5,189,186,0.45)',
      },
    },
  },
  plugins: [],
}
