/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", // gray-200
        input: "var(--color-input)", // slate-50
        ring: "var(--color-ring)", // blue-600
        background: "var(--color-background)", // soft-white
        foreground: "var(--color-foreground)", // gray-800
        primary: {
          DEFAULT: "var(--color-primary)", // blue-600
          foreground: "var(--color-primary-foreground)", // white
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", // emerald-600
          foreground: "var(--color-secondary-foreground)", // white
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", // red-500
          foreground: "var(--color-destructive-foreground)", // white
        },
        muted: {
          DEFAULT: "var(--color-muted)", // slate-50
          foreground: "var(--color-muted-foreground)", // gray-500
        },
        accent: {
          DEFAULT: "var(--color-accent)", // amber-500
          foreground: "var(--color-accent-foreground)", // gray-800
        },
        popover: {
          DEFAULT: "var(--color-popover)", // white
          foreground: "var(--color-popover-foreground)", // gray-800
        },
        card: {
          DEFAULT: "var(--color-card)", // white
          foreground: "var(--color-card-foreground)", // gray-800
        },
        success: {
          DEFAULT: "var(--color-success)", // emerald-500
          foreground: "var(--color-success-foreground)", // white
        },
        warning: {
          DEFAULT: "var(--color-warning)", // amber-500
          foreground: "var(--color-warning-foreground)", // gray-800
        },
        error: {
          DEFAULT: "var(--color-error)", // red-500
          foreground: "var(--color-error-foreground)", // white
        },
        surface: "var(--color-surface)", // slate-50
        "text-primary": "var(--color-text-primary)", // gray-800
        "text-secondary": "var(--color-text-secondary)", // gray-500
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Source Sans 3', 'sans-serif'],
        'caption': ['Inter', 'sans-serif'],
        'data': ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        therapeutic: "8px",
      },
      boxShadow: {
        'therapeutic': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'therapeutic-lg': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'gentle': '0 1px 3px rgba(0, 0, 0, 0.05)',
        'soft': '0 2px 4px rgba(0, 0, 0, 0.06)',
        'comfort': '0 4px 6px rgba(0, 0, 0, 0.07)',
        'elevation': '0 8px 25px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "gentle-fade": "gentleFade 300ms ease-out",
        "breathing": "breathing 2s ease-in-out infinite",
        "soft-bounce": "softBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "gentleFade": {
          from: {
            opacity: "0",
            transform: "translateY(4px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "breathing": {
          "0%, 100%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.02)",
          },
        },
        "softBounce": {
          "0%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.05)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
      },
      spacing: {
        'therapeutic': '1.5rem',
        'breathing': '2rem',
        'comfort': '3rem',
      },
      lineHeight: {
        'therapeutic': '1.7',
        'breathing': '1.8',
      },
      zIndex: {
        'crisis': '1000',
        'navigation': '100',
        'dropdown': '200',
        'tooltip': '300',
        'modal': '500',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}