/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--color-black)",
        paper: "var(--color-white)",
        graphite: "var(--color-graphite)",
        line: "var(--color-line)",
      },
      fontFamily: {
        sans: ['"Manrope"', "system-ui", "sans-serif"],
        display: ['"Roundex"', "Georgia", "serif"],
      },
      letterSpacing: {
        display: "-0.02em",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
