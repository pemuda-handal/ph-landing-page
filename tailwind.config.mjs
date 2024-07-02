/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      screens: {
        "3xl": "2000px",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#7241FF",
        secondary: "#7B78FF",
        third: "#353879",
      },
    },
  },
  plugins: [],
};
