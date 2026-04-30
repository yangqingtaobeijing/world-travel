/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tangible: '#3B82F6',
        intangible: '#F59E0B',
      },
    },
  },
  plugins: [],
}
