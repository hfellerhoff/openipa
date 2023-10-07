/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-open-sans)"],
        serif: ["var(--font-roboto-slab)"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
