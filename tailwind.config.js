// /** @type {import('tailwindcss').Config} */
// import daisyui from 'daisyui'
// export default {
//   darkMode: "class",
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [daisyui],
//   daisyui: {
//     themes: ["light", "synthwave"], 
//   }
// }

/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  darkMode: "class", // Ensures class-based dark mode works
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#03000a", // Custom deep space black background
        textLight: "#f1e9ff", // Custom lavender light text color
        cardLight: "#0e0b16", // Custom dark card background
        cardDark: "#0e0b16", // Custom dark card background
        sectionColor: '#0d0b14' // Custom dark violet-black for navbar & footer
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark"], // Keep it simple with light and dark themes
  },
};
