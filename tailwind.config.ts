import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#05090F",
        panel: "#0B121C",
        cyan: "#43F4C8",
        blue: "#6CA9FF",
      },
      boxShadow: {
        glow: "0 0 50px rgba(67, 244, 200, .16)",
      },
    },
  },
  plugins: [],
};

export default config;
