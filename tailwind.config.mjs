/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#111111',
          gray: '#5f5f5f',
          muted: '#8d8d8d',
          light: '#f4f4f2',
          border: '#2a2a2a',
        },
      },
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
        accent: ['Dosis', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
