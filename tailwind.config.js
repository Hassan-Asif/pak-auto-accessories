/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0a',
        steel: '#18181b',
        asphalt: '#27272a',
        brake: '#dc2626'
      },
      boxShadow: {
        glow: '0 20px 70px rgba(220,38,38,.18)'
      }
    }
  },
  plugins: []
}
