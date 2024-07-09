import { transform } from "typescript";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      boxShadow: {
        card: "0px 8px 24px 0px #706DFF3D",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#7241FF",
        secondary: "#7B78FF",
        tertiary: "#353879",
        quartenary: "#646464",
        chip: "#7211F214",
        chipText: "#7211F2",
      },
      keyframes: {
        slide: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-100%)",
          },
        },
        slide2: {
          "0%": {
            transform: "translateX(100%)",
          },
          "100%": {
            transform: "translateX(0%)",
          },
        },
      },
    },
    plugins: [],
  },
};
