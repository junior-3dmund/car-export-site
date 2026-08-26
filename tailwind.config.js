/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#14171C",
        steel: "#1E232C",
        steel2: "#262C37",
        ignition: "#FF5A1F",
        signal: "#2F6FED",
        silver: "#8A93A3",
        offwhite: "#EDEFF2"
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"]
      }
    }
  },
  plugins: []
};
