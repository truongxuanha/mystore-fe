/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        colorPrimary: "#ff8f26",
        colorRed: "#ED1b24",
        colorBody: "#f5f5f5",
        corlorButton: "#2f80ed",
      },
      textShadow: {
        sm: "1px 1px 2px rgba(0, 0, 0, 0.5)",
        md: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        lg: "3px 3px 6px rgba(0, 0, 0, 0.5)",
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
