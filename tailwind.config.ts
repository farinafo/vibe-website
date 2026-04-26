import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--tw-ink) / <alpha-value>)",
        "ink-soft": "rgb(var(--tw-ink-soft) / <alpha-value>)",
        muted: "rgb(var(--tw-muted) / <alpha-value>)",
        faint: "rgb(var(--tw-faint) / <alpha-value>)",
        line: "rgb(var(--tw-line) / <alpha-value>)",
        "line-strong": "rgb(var(--tw-line-strong) / <alpha-value>)",
        wash: "rgb(var(--tw-wash) / <alpha-value>)",
        paper: "rgb(var(--tw-paper) / <alpha-value>)",
        cover: "rgb(var(--tw-cover) / <alpha-value>)",
        plate: "rgb(var(--tw-plate) / <alpha-value>)",
        "plate-ink": "rgb(var(--tw-plate-ink) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xs": ["clamp(2.75rem,7vw,4.25rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        display: ["clamp(3.25rem,9vw,6rem)", { lineHeight: "0.98", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(3.75rem,11vw,7.5rem)", { lineHeight: "0.96", letterSpacing: "-0.035em" }],
      },
      letterSpacing: {
        editorial: "0.02em",
        caps: "0.22em",
        "caps-wide": "0.32em",
      },
      maxWidth: {
        measure: "38rem",
        "measure-wide": "44rem",
        content: "72rem",
      },
      transitionDuration: {
        page: "480ms",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        galleryMarquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "gallery-marquee": "galleryMarquee 52s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
