/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        primary:'#ff385D'
      },
      background :{
        'abhi' : "url('../frontend/public/assets/images/bg-2.jpg')"
      }
    },
  },
  plugins: [],
};
  