import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";


const config = {
    darkMode: "class",

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        "2xl": "1600px",
      },
    },

    extend: {
      colors: {
        cream: {
          50: "#FBF8F3",
          100: "#F6F1E7",
          200: "#EFE7D6",
          300: "#E5D8BE",
        },
        sand: {
          50: "#F5EFE6",
          100: "#E9DFCC",
          200: "#D8C8A8",
          300: "#B89F73",
        },
        ink: {
          DEFAULT: "#1A1A1A",
          soft: "#3A3A3A",
          muted: "#6B6B6B",
        },
        accent: {
          berry: "#7C2A38",
          olive: "#7A7A4E",
          sage: "#9CA98C",
        },
      },

      fontFamily: {
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        geist: ["var(--font-geist-sans)"],
      },

      letterSpacing: {
        wider2: ".18em",
        widest2: ".28em",
      },

      fontSize: {
        "display-xl": [
          "clamp(3rem, 9vw, 8rem)",
          {
            lineHeight: "0.95",
            letterSpacing: "-0.02em",
          },
        ],
        "display-lg": [
          "clamp(2.5rem, 6vw, 5.5rem)",
          {
            lineHeight: "1",
            letterSpacing: "-0.01em",
          },
        ],
        "display-md": [
          "clamp(2rem, 4vw, 3.75rem)",
          {
            lineHeight: "1.05",
          },
        ],
      },

      transitionTimingFunction: {
        soft: "cubic-bezier(.22,.61,.36,1)",
      },

      animation: {
        marquee: "marquee 30s linear infinite",
        "fade-up": "fadeUp .8s cubic-bezier(.22,.61,.36,1) both",
        fadeIn: "fadeIn 0.3s ease-in-out",
        blink: "blink 1.4s both infinite",
      },

      keyframes: {
        fadeIn: {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },

        marquee: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-50%)",
          },
        },

        fadeUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        blink: {
          "0%": {
            opacity: "0.2",
          },
          "20%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0.2",
          },
        },
      },
    },
  },

  future: {
    hoverOnlyWhenSupported: true,
  },

  plugins: [
    typography,
    containerQueries,
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "animation-delay": (value) => ({
            animationDelay: value,
          }),
        },
        {
          values: theme("transitionDelay"),
        }
      );
    }),
  ],
} satisfies Config;

export default config;