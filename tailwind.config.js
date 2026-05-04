/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fffaf2',
          100: '#fff4e2',
          200: '#f7e6c9'
        },
        charcoal: '#26302f',
        lavender: {
          50: '#f7f3ff',
          100: '#ece4ff',
          200: '#d9cbf7',
          500: '#8b78bd',
          700: '#62518a'
        },
        sage: {
          50: '#f2f8ef',
          100: '#dcebd4',
          200: '#c4ddb8',
          500: '#6f9272',
          700: '#4c684f'
        },
        dusty: {
          50: '#eef7fb',
          100: '#d9edf4',
          200: '#badbe7',
          500: '#5f8fa1',
          700: '#416673'
        },
        peach: {
          50: '#fff2e9',
          100: '#ffe1cf',
          200: '#f8c6aa',
          500: '#d88e6e',
          700: '#9b6049'
        },
        honey: {
          50: '#fff9df',
          100: '#fceba7',
          500: '#c79a3d',
          700: '#815f1f'
        }
      },
      boxShadow: {
        soft: '0 18px 45px rgba(86, 69, 49, 0.11)',
        lift: '0 24px 60px rgba(86, 69, 49, 0.16)'
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif'
        ]
      }
    }
  },
  plugins: []
};
