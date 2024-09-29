/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        colorPrimary: "#ff8f26",
        colorRed: "#ED1b24",
        colorBody: "#f5f5f5",
      },
      height: {
        header: "64px",
      },
      margin: {
        header: "64px",
      },
      backgroundImage: {
        tagProduct: "url('./src/assets/tag.png')",
      },
    },
  },
  plugins: [],
};
