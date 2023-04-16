/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/lib/**/*.{js,ts,jsx,tsx}',
    './src/hooks/**/*.{js,ts,jsx,tsx}',
    
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'westar': {
          '50': '#f9f8f7',
          '100': '#f2f1ee',
          '200': '#e6e4e0',
          '300': '#d5d2cc',
          '400': '#bcb7ad',
          '500': '#a39d90',
          '600': '#8b8477',
          '700': '#736d62',
          '800': '#615c53',
          '900': '#535049',
          '950': '#2b2924',
        },

      }
    },
  },
  plugins: [],
}
