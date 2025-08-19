// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#2454E6", hover: "#1D46BF" }
      },
      borderRadius: { card: "12px", input: "12px", button: "12px" },
      maxWidth: { container: "1120px" }
    }
  },
  plugins: [require("flowbite/plugin")]
};