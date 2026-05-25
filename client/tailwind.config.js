export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#050B1F",
          navySoft: "#081331",
          red: "#EF233C",
          orange: "#FFA726",
          gold: "#FFB74D",
        },
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
};