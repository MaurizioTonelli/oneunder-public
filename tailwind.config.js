/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        oneunder: {
          50: "#f0f7ff",
          100: "#e0eefe",
          200: "#b9dcfe",
          300: "#7cc0fd",
          400: "#36a2fa",
          500: "#0c86eb",
          600: "#0067c8",
          700: "#0152a3",
          800: "#064686",
          900: "#0b3c6f",
          950: "#07254a",
        },
      },
    },
  },
  plugins: [],
};
