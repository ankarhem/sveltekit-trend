/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    colors: {
      'base-100': '#ffffff',
      'base-200': '#f5f5f5',
      'base-300': '#e0e0e0',
      'primary-100': '#e3f2fd',
      'primary-200': '#bbdefb',
      'primary-300': '#90caf9',
      'secondary-100': '#f8bbd0',
      'secondary-200': '#f48fb1',
      'secondary-300': '#f06292',
    },
    extend: {}
  },
  plugins: []
};