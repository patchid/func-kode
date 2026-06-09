import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
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
        brand: {
          blue: "#2E4053",
          green: "#34C759",
          gray: "#F7F7F7",
        },
        // Landing page color tokens (Figma spec)
        landing: {
          label:   "#EDFFD7", // label green badge background
          teal:    "#00C9B7", // teal accent / CTA highlight
          purple:  "#7020BF", // purple accent
          dark:    "#040710", // page background
          surface: "#111B34", // card / section surface
          border:  "#1C273A", // border / divider
          muted:   "#A1A7B7", // secondary text
          fg:      "#FCFCFC", // primary foreground text
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Landing page typography tokens (Figma spec)
        "landing-hero":   ["46px", { lineHeight: "54.1px" }],
        "landing-h1-md":  ["40px", { lineHeight: "48px" }],
        "landing-h1-sm":  ["32px", { lineHeight: "1.18" }],
        "landing-label":  ["14px", { lineHeight: "1", letterSpacing: "-0.48px", fontWeight: "700" }],
        "landing-body":   ["16px", { lineHeight: "25.4px", letterSpacing: "-0.48px" }],
      },
      letterSpacing: {
        // Landing page tracking tokens (Figma spec)
        "landing-tight": "-0.48px",
        "landing-h1":    "-1.38px",
        "landing-cta":   "-0.45px",
        "landing-badge": "-0.36px",
      },
      spacing: {
        // Landing page spacing tokens
        "landing-cta":    "47px",   // gap between CTA buttons
        "landing-canvas": "122px",  // hero left padding (1440px canvas inset)
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
