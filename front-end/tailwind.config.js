/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        colorPrimary: "#ff8f26",
        colorRed: "#ED1b24",
      },
    },
  },
  plugins: [],
};
