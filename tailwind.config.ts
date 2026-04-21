import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#7C3AED",
          dark: "#A78BFA",
        },
        secondary: {
          DEFAULT: "#06B6D4",
          dark: "#22D3EE",
        },
        accent: {
          DEFAULT: "#FBBF24",
          dark: "#FCD34D",
        },
        success: {
          DEFAULT: "#10B981",
          dark: "#34D399",
        },
        error: {
          DEFAULT: "#EF4444",
          dark: "#F87171",
        },
        surface: {
          light: "#FFFFFF",
          dark: "#1E293B",
        },
        background: {
          light: "#FAFBFC",
          dark: "#0F172A",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "bounce-subtle": "bounce-subtle 2s infinite",
        "slide-in": "slide-in 0.3s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "pop": "pop 0.3s ease-out",
      },
      keyframes: {
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pop: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "70%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
export default config;
