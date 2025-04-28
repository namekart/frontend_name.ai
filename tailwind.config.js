/** @type {import('tailwindcss').Config} */
import typographyPlugin from "@tailwindcss/typography";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0, transform: "translateY(5px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out forwards",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "var(--foreground)",
            margin: 0,
            padding: 0,
            a: {
              color: "var(--primary)",
              "&:hover": {
                color: "var(--primary-foreground)",
              },
            },
            blockquote: {
              borderLeftColor: "var(--muted)",
              backgroundColor: "var(--muted)",
              margin: "1rem 0",
            },
            "h1,h2,h3,h4,h5,h6": {
              color: "var(--foreground)",
              marginTop: "1.5rem",
              marginBottom: "0.75rem",
            },
            p: {
              marginTop: "0.75rem",
              marginBottom: "0.75rem",
            },
            "ul,ol": {
              paddingLeft: "1.5rem",
              marginTop: "0.75rem",
              marginBottom: "0.75rem",
            },
            code: {
              color: "var(--foreground)",
              backgroundColor: "var(--muted)",
              borderRadius: "0.25rem",
              padding: "0.125rem 0.25rem",
            },
            pre: {
              backgroundColor: "var(--muted)",
              color: "var(--foreground)",
              borderRadius: "0.375rem",
              margin: "1rem 0",
              padding: "1rem",
            },
          },
        },
      },
    },
  },
  plugins: [typographyPlugin],
};
