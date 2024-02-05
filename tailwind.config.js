/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens:{
      'sm':{'max':'639px'},
      // 'md':'420px',
      // 'lg':'1024px',
      // 'xl':'1280px',
      // '2xl':'1536px',

    },
    extend: {},
  },
  plugins: [],
}

