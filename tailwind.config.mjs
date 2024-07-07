import { transform } from 'typescript'

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
        tertiary: "#353879",
        quartenary: "#646464"
      },
      keyframes: {
        slide: {
          '0%' : {
            transform: 'translateX(0)'
          },
          '100%' : {
            transform: 'translateX(-100%)'
          }
        },
        slide2: {
          '0%' : {
            transform: 'translateX(100%)'
          },
          '100%' : {
            transform: 'translateX(0%)'
          }
        },
      },
    },
  plugins: [],
}};
