import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      colors: {
        atelier: {
          bg: "#0B0C0E",
          card: "#121418",
          border: "#232730",
          muted: "#8E93A0",
          cream: "#F4EFEA",
          gold: "#D4AF37",
          amber: "#D97706",
          terracotta: "#C05621",
        },
      },
      boxShadow: {
        "book-hero": "0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 10px 25px -5px rgba(0, 0, 0, 0.4)",
        "book-thumb": "0 10px 30px -5px rgba(0, 0, 0, 0.5)",
      },
      transitionTimingFunction: {
        "editorial-in-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
