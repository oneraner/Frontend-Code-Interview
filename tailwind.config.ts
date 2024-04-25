import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        wall: "#166534",
        path: "#f7fee7",
        mouse: "#737373",
        cheese: "#fbbf24",
        highLight: "#fde68a",
      },
    },
  },
  plugins: [],
};
export default config;
