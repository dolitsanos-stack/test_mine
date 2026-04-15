/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Viva teal / cyan brand palette
        viva: {
          50: "#e6fff8",
          100: "#c0fff0",
          200: "#8bfbe3",
          300: "#4ff0ce",
          400: "#1ddcb6",
          500: "#00c39a",
          600: "#00a381",
          700: "#017e66",
          800: "#045f4e",
          900: "#073f35",
          950: "#022921"
        },
        // Deep night sky background
        ink: {
          950: "#05070f",
          900: "#080b17",
          850: "#0b1122",
          800: "#0f162b",
          700: "#151d39",
          600: "#1d2749",
          500: "#29345f",
          400: "#3e4a79"
        },
        accent: {
          400: "#f0a84b",
          500: "#eb8b2a"
        }
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif"
        ]
      },
      boxShadow: {
        card: "0 1px 2px rgba(0, 0, 0, 0.25), 0 4px 16px rgba(0, 0, 0, 0.25)",
        glow: "0 10px 40px -10px rgba(0, 195, 154, 0.45)"
      }
    }
  },
  plugins: []
};
