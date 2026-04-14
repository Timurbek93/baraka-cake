import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        sand: "#E8D7B7",
        cream: "#F8F3EA",
        clay: "#C69A63",
        chocolate: "#3A2418",
        turquoise: "#1E8F97",
        inkBlue: "#183F6B",
        milk: "#F8F3EA",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        display: ["var(--font-cormorant)", "serif"],
      },
      boxShadow: {
        soft: "0 20px 55px rgba(58, 36, 24, 0.08)",
        card: "0 16px 38px rgba(24, 63, 107, 0.08)",
      },
      borderRadius: {
        arch: "999px 999px 28px 28px",
        vault: "32px",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at 15% 0%, rgba(30,143,151,0.18), transparent 30%), linear-gradient(135deg, rgba(248,243,234,0.96), rgba(232,215,183,0.92))",
        "khiva-tiles":
          "linear-gradient(90deg, rgba(24,63,107,0.09) 1px, transparent 1px), linear-gradient(rgba(30,143,151,0.08) 1px, transparent 1px)",
        "section-ornament":
          "linear-gradient(90deg, rgba(24,63,107,0.14) 0, rgba(24,63,107,0.14) 12px, transparent 12px, transparent 20px, rgba(30,143,151,0.16) 20px, rgba(30,143,151,0.16) 30px, transparent 30px, transparent 38px)",
      },
      fontSize: {
        hero: ["clamp(3.1rem, 7vw, 5.6rem)", { lineHeight: "0.92" }],
      },
    },
  },
  plugins: [],
};

export default config;
