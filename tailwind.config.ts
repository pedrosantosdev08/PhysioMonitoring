import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // ✅ essencial para o next-themes funcionar
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--bg-primary)",
        card: "var(--bg-card)",
        accent: "var(--accent-color)",
      },
      textColor: {
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        description: "var(--text-description)",
      },
    },
  },
};

export default config;
