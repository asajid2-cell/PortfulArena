const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.{astro,html,md,mdx,tsx,jsx}',
    './src/content/**/*.{md,mdx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          0: 'var(--bg-0)',
          1: 'var(--bg-1)',
          2: 'var(--bg-2)'
        },
        text: {
          1: 'var(--text-1)',
          2: 'var(--text-2)',
          3: 'var(--text-3)'
        },
        pri: {
          300: 'var(--pri-300)',
          400: 'var(--pri-400)',
          500: 'var(--pri-500)'
        },
        sec: {
          400: 'var(--sec-400)',
          500: 'var(--sec-500)'
        },
        acc: {
          amber: 'var(--acc-amber)'
        },
        status: {
          danger: 'var(--danger)',
          ok: 'var(--ok)'
        },
        line: {
          1: 'var(--line-1)'
        },
        glow: {
          pri: 'var(--glow-pri)',
          sec: 'var(--glow-sec)'
        }
      },
      boxShadow: {
        ambient: 'var(--shadow-ambient)',
        neon: 'var(--shadow-neon)'
      },
      borderRadius: {
        card: '14px',
        arena: '24px'
      },
      transitionTimingFunction: {
        launch: 'cubic-bezier(0.14, 0.8, 0.2, 1)',
        settle: 'cubic-bezier(0.3, 0, 0.2, 1)'
      },
      transitionDuration: {
        60: '60ms',
        120: '120ms'
      },
      fontFamily: {
        sans: ['"Inter"', ...fontFamily.sans],
        display: ['"Inter"', ...fontFamily.sans],
        mono: ['"JetBrains Mono"', ...fontFamily.mono]
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
};
