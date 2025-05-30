import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/components/src/**/*.{js,ts,jsx,tsx,mdx}",
    // "../../packages/Layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        jakarta: ["JakartaSans", "sans-serif"],
      },
      fontSize: {
        xs: "0.75rem", // 12px - Small captions, helper text
        sm: "0.825rem", // 14px - Secondary text, metadatac
        base: "0.9rem", // 16px - Default body text
        lg: "1rem", // 18px - Subheadings, important labels
        xl: "1.225rem", // 20px - Section titles, buttons
        "2xl": "1.5rem", // 24px - Page headers, large buttons
        "3xl": "1.875rem", // 30px - Key callouts, hero sections
        "4xl": "2.25rem", // 36px - Major headings, banners
        "5xl": "3rem", // 48px - Display text, landing headlines
        "6xl": "3.75rem", // 60px - Hero headlines
        "7xl": "4.5rem", // 72px - Extra large promos
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
