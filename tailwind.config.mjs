/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      sans: ["Switzer", "Inter", ...defaultTheme.fontFamily.sans],
      serif: ["Sentient", ...defaultTheme.fontFamily.serif],
      mono: ['"Space Grotesk"', ...defaultTheme.fontFamily.mono],
    },
    fontSize: {
      xs: "0.69rem",
      sm: "0.83rem",
      base: "1rem",
      lg: "1.2rem",
      xl: "1.44rem",
      "2xl": "1.73rem",
      "3xl": "2.07rem",
      "4xl": "2.49rem",
      "5xl": "2.99rem",
      "6xl": "3.58rem",
      "7xl": "4.3rem",
    },
    extend: {
      colors: {
        brand: {
          50: "#fdffe4",
          100: "#f8ffc4",
          200: "#f0ff90",
          300: "#e0ff50",
          400: "#c9ff00",
          500: "#afe600",
          600: "#88b800",
          700: "#668b00",
          800: "#516d07",
          900: "#455c0b",
          950: "#233400",
        },
      },
      screens: {
        "2xl": "1440px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
