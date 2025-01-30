/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: { center: true },
    screens: {
      sm: "550px",

      md: "700px",

      lg: "900px",

      xl: "1110px",

      "2xl": "1200px",
    },
    extend: {
      colors: {
        primary: "#3b82f6",
      },
    },
  },
  plugins: [],
};
