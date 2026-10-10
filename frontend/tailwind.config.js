/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        shreenil: {
          50: '#EFF9F3',
          100: '#D6F2E3',
          200: '#B0E7CB',
          300: '#7CD6AB',
          400: '#4EC48C',
          500: '#36B875',
          600: '#239B5E',
          700: '#18794E',
          800: '#156140',
          900: '#135035',
          950: '#0A2D1E',
          primary: '#36B875',
          dark: '#18794E',
          mint: '#EFF9F3',
          bg: '#F6F8F7',
          surface: '#FFFFFF',
          text: '#18221D',
          muted: '#6B756F',
          border: '#E5EBE7',
        },
        pastel: {
          blue: {
            bg: '#DCEEFF',
            text: '#1E40AF',
            border: '#BFDBFE',
            subtle: '#EFF6FF',
          },
          lavender: {
            bg: '#E7DFFF',
            text: '#5B21B6',
            border: '#DDD6FE',
            subtle: '#F5F3FF',
          },
          mint: {
            bg: '#EFF9F3',
            text: '#18794E',
            border: '#B0E7CB',
            subtle: '#EFF9F3',
          },
          peach: {
            bg: '#FBE1D8',
            text: '#9A3412',
            border: '#FED7AA',
            subtle: '#FFF7ED',
          },
          yellow: {
            bg: '#F8F0C8',
            text: '#854D0E',
            border: '#FDE68A',
            subtle: '#FEFCE8',
          },
          pink: {
            bg: '#F6DFEC',
            text: '#9D174D',
            border: '#FBCFE8',
            subtle: '#FDF2F8',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Lora', 'Merriweather', 'Georgia', 'serif'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.02)',
        'card': '0 2px 8px -2px rgba(24, 34, 29, 0.04), 0 1px 3px 0 rgba(24, 34, 29, 0.02)',
        'card-hover': '0 10px 25px -5px rgba(24, 34, 29, 0.06), 0 8px 10px -6px rgba(24, 34, 29, 0.03)',
        'mint': '0 4px 14px 0 rgba(54, 184, 117, 0.25)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.25rem',
      },
    },
  },
  plugins: [],
}
