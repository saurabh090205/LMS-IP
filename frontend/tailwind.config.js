/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        shreenil: {
          50: '#f5f5ff',
          100: '#eef0ff',
          200: '#e0e7ff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
          bg: '#F6F6FB',
          surface: '#FFFFFF',
          border: '#E7E7F0',
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
            bg: '#DDF4EA',
            text: '#065F46',
            border: '#A7F3D0',
            subtle: '#ECFDF5',
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
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.02), 0 1px 2px 0 rgba(0, 0, 0, 0.02)',
        'card-hover': '0 4px 16px 0 rgba(31, 41, 55, 0.04), 0 1px 3px 0 rgba(31, 41, 55, 0.02)',
      },
      borderRadius: {
        'xl': '0.75rem', // 12px
        '2xl': '1rem',    // 16px
      },
    },
  },
  plugins: [],
}
