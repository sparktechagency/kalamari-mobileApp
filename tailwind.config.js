/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "inter-400": ["InterRegular"],
        "inter-500": ["InterMedium"],
        "inter-600": ["InterSemiBold"],
        "inter-700": ["InterBold"],
        "inter-800": ["InterExtraBold"],
        "inter-900": ["InterBlack"],
        "rubik-700": ["RubikBold"],
        "rubik-800": ["RubikExtraBold"],
      },
      colors: {
        primary: "red",
        primaryBg: "#FDFFFE",
        textPrimary: "#121212",
        orange: "#ED6237",
        textgray: "#454545",
      },
      boxShadow: {
        "custom-light": "0px 4px 4px 0px rgba(244, 244, 244, 0.25)",
      },
    },
  },
  plugins: [],
};
