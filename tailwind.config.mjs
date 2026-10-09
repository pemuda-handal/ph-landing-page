/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      boxShadow: {
        card: "0px 8px 24px 0px #706DFF3D",
        "card-hover": "0px 16px 36px 0px rgba(114, 65, 255, 0.22)",
        glow: "0px 0px 35px 0px rgba(114, 65, 255, 0.35)",
        "glow-lg": "0px 0px 60px 0px rgba(114, 65, 255, 0.45)",
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
      animation: {
        float: "float 4s ease-in-out infinite",
        "float-delayed": "float 4s ease-in-out 2s infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        marquee: "marquee 25s linear infinite",
        "marquee-reverse": "marquee-reverse 25s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
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
