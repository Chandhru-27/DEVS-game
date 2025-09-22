import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#000000",
        moonwhite: "#ffffff",
        cloudgray: "#808080",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        twinkle: "twinkle 2s ease-in-out infinite alternate",
        "slide-up": "slideUp 0.3s ease-out",
        "bounce-slow": "bounce 2s infinite",
        "pulse-slow": "pulse 3s infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        twinkle: {
          "0%": { opacity: "0.3" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(255, 255, 255, 0.2)" },
          "100%": { boxShadow: "0 0 20px rgba(255, 255, 255, 0.4)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glow: "0 0 20px rgba(255, 255, 255, 0.3)",
        "glow-lg": "0 0 30px rgba(255, 255, 255, 0.4)",
        "glow-xl": "0 0 40px rgba(255, 255, 255, 0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
