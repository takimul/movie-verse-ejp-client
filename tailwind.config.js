/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "neon-green": "#39FF14",
        "neon-green-light": "#66FF33",
        "neon-blue": "#1FB6FF",
      },
    },
  },
  darkMode: "class", // Enable class-based dark mode
  plugins: [
    require('daisyui'),
  ],
};
