/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '375px',
      },
      colors: {
        primary: {
          DEFAULT: '#6B4F3F',
          50: '#F5F2F0',
          100: '#E8E0DB',
          200: '#D1C1B7',
          300: '#BAA293',
          400: '#A3836F',
          500: '#6B4F3F',
          600: '#5A4235',
          700: '#49352B',
          800: '#382821',
          900: '#271B16',
        },
        secondary: {
          DEFAULT: '#3F3F46',
          50: '#F5F5F6',
          100: '#E8E8EA',
          200: '#D1D1D5',
          300: '#BABAC0',
          400: '#A3A3AB',
          500: '#3F3F46',
          600: '#35353B',
          700: '#2B2B30',
          800: '#212125',
          900: '#17171A',
        },
        accent: {
          DEFAULT: '#F59E0B',
          50: '#FEF7ED',
          100: '#FDEDD3',
          200: '#FBDBA7',
          300: '#F9C97B',
          400: '#F7B74F',
          500: '#F59E0B',
          600: '#C47E09',
          700: '#935E07',
          800: '#623F05',
          900: '#311F02',
        },
        background: {
          DEFAULT: '#FAF7F5',
        },
        card: {
          DEFAULT: '#FFFFFF',
        },
        text: {
          dark: '#1C1917',
          muted: '#78716C',
        },
      },
    },
  },
  plugins: [],
}

