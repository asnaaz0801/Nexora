/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#030712',
        surface: {
          DEFAULT: '#0B1120',
          elevated: '#111C33',
          card: 'rgba(11, 20, 40, 0.75)',
          glass: 'rgba(15, 23, 42, 0.65)',
        },
        nexora: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#00D2FF', // Primary Electric Cyan
          600: '#00A3FF',
          700: '#0070F3', // Deep Tech Blue
          800: '#034AC5',
          900: '#0A2569',
          950: '#041033',
        },
        accent: {
          blue: '#00D2FF',
          indigo: '#4F46E5',
          purple: '#8B5CF6',
          cyan: '#06B6D4',
          glow: '#00F0FF',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['Outfit', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(0, 210, 255, 0.25)',
        'glow-md': '0 0 25px -2px rgba(0, 210, 255, 0.35)',
        'glow-lg': '0 0 40px -2px rgba(0, 210, 255, 0.45)',
        'glow-card': '0 8px 32px 0 rgba(0, 163, 255, 0.12)',
        'glass-edge': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'orbit-spin': 'orbit 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-bounce': 'glowBounce 3s ease-in-out infinite',
      },
      keyframes: {
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowBounce: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(circle at 50% 30%, rgba(0, 210, 255, 0.15) 0%, rgba(3, 7, 18, 0) 70%)',
        'card-glow': 'radial-gradient(circle at 50% 0%, rgba(0, 210, 255, 0.1) 0%, rgba(11, 20, 40, 0.6) 80%)',
      }
    },
  },
  plugins: [],
}
