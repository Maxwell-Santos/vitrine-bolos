/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
      inter: ['Inter', 'sans-serif'],
    },
    colors: {
      'bg-color': '#FFFFFF',
      primary: '#a53fe0',
      'primary-h': '#8f29ca',
      secondary: '#f7c566',
      'secondary-h': '#d6a345',
    },
    extend: {},
  },
  plugins: [],
}
