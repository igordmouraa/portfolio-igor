/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-dm-sans)', 'sans-serif'],
      display: ['var(--font-outfit)', 'sans-serif'],
    },
    extend: {
      fontFamily: {
        mono: ['var(--font-plex-mono)', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px rgb(var(--color-primary) / 0.15)',
        'glow-lg': '0 0 60px rgb(var(--color-primary) / 0.25)',
      },
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        'primary-muted': 'rgb(var(--color-primary-muted) / <alpha-value>)',
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        foreground: 'rgb(var(--color-text) / <alpha-value>)',
        muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
      },
    },
  },
  plugins: [],
}
