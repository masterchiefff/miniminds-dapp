/** @type {import('tailwindcss').Config} */
const { keyframes } = require("framer-motion");

module.exports = {
  lightMode: ["class"], // Enables dark mode with class strategy
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true, // Centers container content
      padding: "2rem", // Adds padding
      screens: {
        "2xl": "1400px", // Sets max width for 2xl screen
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Adds Inter font
      },
      colors: {
        primary: {
          DEFAULT: "#4CD964", // Mint green
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#8A4FFF", // Purple
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#FFD60A", // Yellow
          foreground: "#000000",
        },
        muted: {
          DEFAULT: "#E6EFFF",
          foreground: "#4A5568",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseDelay: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        pulseDelay: "pulseDelay 2s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
