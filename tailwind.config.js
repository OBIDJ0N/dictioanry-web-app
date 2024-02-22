/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    fontSize: {
      xs: ['15px', '1.6'],
      sm: ['16px', '1.4'],
      base: ['18px', '1.3'],
      lg: ['20px', '1'],
      xl: ['24px', '1'],
      '2xl': ['32px', '1'],
      '3xl': ['64px', '1'],
    },
    colors: {
      dark: '#050505',
      black: 'hsl(0deg, 0%, 2%)',
      black_400: '#1F1F1F',
      white: '#F5F5F5',
      violet: 'hsl(274deg, 82%, 60%)',
      light_violet: 'rgba(164, 69, 237, .25)',
      gray: '#757575',
      light_gray: 'hsl(0deg, 0%, 96%)',
      dark_gray: 'hsl(0deg, 0%, 12%)',
      light_white: 'hsl(0deg, 0%, 81%)'
    },
    extend: {
      fontFamily: {
        lora: 'Lora, sans-serif', 
        inconsolata: 'Inconsolata, sans-serif',
        inter: 'Inter, sans-serif',
      },
    },
  },
  plugins: [],
}