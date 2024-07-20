// tailwind.config.js
module.exports = {
  purge: [],
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      primary: "#3276c3",
      second: "#aaa",
      subColor: "#b6b5be",
    },
    backgroundColor: {
      bgBasic: "#f3f4f3",
      bgwhite: "#fff",
      bgPopup: "#00000060",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
