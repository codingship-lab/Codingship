import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      },
      colors: {
        bg: "hsl(var(--bg))",
        panel: "hsl(var(--panel))",
        text: "hsl(var(--text))",
        subtle: "hsl(var(--subtle))",
        border: "hsl(var(--border))",
        accent: "hsl(var(--accent))",
        vivid: "hsl(var(--vivid))"
      },
      borderRadius: {
        xl2: "1.5rem",
        xl3: "2rem"
      }
    }
  },
  plugins: []
};

export default config;
