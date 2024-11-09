import type { Config } from "tailwindcss";

const config: Config = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./views/**/*.{js,ts,jsx,tsx,mdx}",
    "./theme/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "340px",
      },
      colors: {
        primary: {
          lighter: "#f5f3fd",
          DEFAULT: "#6e57e0",
        },
        danger: {
          DEFAULT: "#FE5F55",
          dark: "#c10c01",
          darker: "#a70b01",
        },
        success: {
          DEFAULT: "#5dfc70",
          dark: "#04c61b",
        },
        black: {
          DEFAULT: "#010101",
          light: "rgba(0, 0, 0, 0.23)",
        },
        info: {
          DEFAULT: "#29339b",
        },
      },
      fontFamily: {
        inherit: "inherit",
      },
      fontSize: {
        "2xs": "10px",
      },
      height: {
        30: "30px",
        100: "100px",
        200: "200px",
        250: "250px",
        300: "300px",
        320: "320px",
        400: "400px",
        500: "500px",
        600: "600px",
      },
      width: {
        30: "30px",
        100: "100px",
        150: "150px",
        200: "200px",
        250: "250px",
        300: "300px",
        500: "500px",
        600: "600px",
      },
      maxWidth: {
        100: "100px",
        200: "200px",
        300: "300px",
        350: "350px",
        400: "400px",
        500: "500px",
        600: "600px",
        700: "700px",
        800: "800px",
        900: "900px",
        1000: "1000px",
      },
    },
  },
  plugins: [],
};
export default config;
