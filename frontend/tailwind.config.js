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
          DEFAULT: '#6C63FF',
          50: '#F0EFFF',
          100: '#E1DFFF',
          200: '#C3BFFF',
          300: '#A59FFF',
          400: '#877FFF',
          500: '#6C63FF',
          600: '#564FCC',
          700: '#403B99',
          800: '#2B2766',
          900: '#151433',
        },
        secondary: {
          DEFAULT: '#00BFA6',
          50: '#E6F9F6',
          100: '#CCF3ED',
          200: '#99E7DB',
          300: '#66DBC9',
          400: '#33CFB7',
          500: '#00BFA6',
          600: '#009985',
          700: '#007364',
          800: '#004D42',
          900: '#002621',
        },
        accent: {
          DEFAULT: '#FFC400',
          50: '#FFF9E6',
          100: '#FFF3CC',
          200: '#FFE799',
          300: '#FFDB66',
          400: '#FFCF33',
          500: '#FFC400',
          600: '#CC9D00',
          700: '#997600',
          800: '#664E00',
          900: '#332700',
        },
        background: {
          DEFAULT: '#F5F7FA',
        },
        card: {
          DEFAULT: '#FFFFFF',
        },
        divider: {
          DEFAULT: '#E5E8EB',
        },
        text: {
          dark: '#1A1A2E',
          muted: '#6B7280',
        },
        navbar: {
          DEFAULT: '#1A1A2E',
        },
      },
    },
  },
  plugins: [],
}

