import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          "1": "#02142A",
          "2": "#001839",
          "3": "#003379"
        },
        secondary: {
          "1": "#FB8500",
          "2": "#D87200",
          "3": "#A35600"
        }
      },
    },
    fontFamily: {
      "sans": ["Inter", "sans-serif"]
    },
  },
  plugins: [
      plugin(({ addUtilities }) => addUtilities({
          ".text-vertical": {
            writingMode: "vertical-lr"
          },
      })),
  ]
};
export default config;
