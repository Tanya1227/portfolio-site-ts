/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  // Touch devices fire :hover on tap and leave it stuck - only apply hover: utilities where a real hover exists.
  future: { hoverOnlyWhenSupported: true },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Geist"', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont',
          '"Segoe UI"', 'Roboto', 'sans-serif',
        ],
        display: [
          '"Geist"', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont',
          '"Segoe UI"', 'Roboto', 'sans-serif',
        ],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        card: '24px',
        pill: '999px',
      },
      maxWidth: {
        content: '420px',
      },
      fontSize: {
        headline: ['clamp(2.75rem, 2rem + 3.2vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'apple-largetitle': ['34px', { lineHeight: '41px', fontWeight: '700' }],
        'apple-title1': ['28px', { lineHeight: '34px', fontWeight: '700' }],
        'apple-title2': ['22px', { lineHeight: '28px', fontWeight: '700' }],
        'apple-title3': ['20px', { lineHeight: '25px', fontWeight: '600' }],
        'apple-headline': ['17px', { lineHeight: '22px', fontWeight: '600' }],
        'apple-body': ['17px', { lineHeight: '22px', fontWeight: '400' }],
        'apple-callout': ['16px', { lineHeight: '21px', fontWeight: '400' }],
        'apple-subheadline': ['15px', { lineHeight: '20px', fontWeight: '400' }],
        'apple-footnote': ['13px', { lineHeight: '18px', fontWeight: '400' }],
        'apple-caption1': ['12px', { lineHeight: '16px', fontWeight: '400' }],
        'apple-caption2': ['11px', { lineHeight: '13px', fontWeight: '400' }],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },
        ink: {
          900: 'var(--color-ink-900)',
          700: 'var(--color-ink-700)',
          500: 'var(--color-ink-500)',
          300: 'var(--color-ink-300)',
          100: 'var(--color-ink-100)',
        },
        surface: {
          0: 'var(--color-surface-0)',
          50: 'var(--color-surface-50)',
          100: 'var(--color-surface-100)',
        },
        wash: {
          peach: 'var(--color-wash-peach)',
          pink: 'var(--color-wash-pink)',
          lavender: 'var(--color-wash-lavender)',
          sky: 'var(--color-wash-sky)',
          mint: 'var(--color-wash-mint)',
        },
        apple: {
          label: 'var(--apple-label)',
          'label-secondary': 'var(--apple-label-secondary)',
          'label-tertiary': 'var(--apple-label-tertiary)',
          'label-quaternary': 'var(--apple-label-quaternary)',
          gray: 'var(--apple-gray)',
          'gray-2': 'var(--apple-gray-2)',
          'gray-3': 'var(--apple-gray-3)',
          'gray-4': 'var(--apple-gray-4)',
          'gray-5': 'var(--apple-gray-5)',
          'gray-6': 'var(--apple-gray-6)',
          'bg-primary': 'var(--apple-bg-primary)',
          'bg-secondary': 'var(--apple-bg-secondary)',
          'bg-tertiary': 'var(--apple-bg-tertiary)',
          'grouped-primary': 'var(--apple-grouped-bg-primary)',
          'grouped-secondary': 'var(--apple-grouped-bg-secondary)',
          'grouped-tertiary': 'var(--apple-grouped-bg-tertiary)',
          separator: 'var(--apple-separator)',
          'separator-opaque': 'var(--apple-separator-opaque)',
          'fill-primary': 'var(--apple-fill-primary)',
          'fill-secondary': 'var(--apple-fill-secondary)',
          'fill-tertiary': 'var(--apple-fill-tertiary)',
          'fill-quaternary': 'var(--apple-fill-quaternary)',
          blue: 'var(--apple-blue)',
          green: 'var(--apple-green)',
          indigo: 'var(--apple-indigo)',
          orange: 'var(--apple-orange)',
          pink: 'var(--apple-pink)',
          purple: 'var(--apple-purple)',
          red: 'var(--apple-red)',
          teal: 'var(--apple-teal)',
          yellow: 'var(--apple-yellow)',
        },
      },
      backgroundImage: {
        'hero-wash': 'var(--gradient-hero-wash)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        'border-glow-spin': {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'border-glow-spin': 'border-glow-spin 6s linear infinite',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        nav: 'var(--shadow-nav)',
        button: 'var(--shadow-button)',
        soft: 'var(--shadow-soft)',
        'apple-1': 'var(--apple-shadow-1)',
        'apple-2': 'var(--apple-shadow-2)',
        'apple-3': 'var(--apple-shadow-3)',
        'apple-4': 'var(--apple-shadow-4)',
      },
      transitionTimingFunction: {
        signature: 'cubic-bezier(0.23, 1, 0.32, 1)',
        'out-strong': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'in-out-strong': 'cubic-bezier(0.77, 0, 0.175, 1)',
        'apple-standard': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'apple-in': 'cubic-bezier(0.4, 0, 1, 1)',
        'apple-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
};
