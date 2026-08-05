/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Matte black background ramp
        ink: {
          950: '#0F0F10',
          900: '#141416',
          850: '#1A1A1D',
          800: '#202024',
          700: '#2A2A2F',
          600: '#36363C',
        },
        // Primary — red
        brand: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f0585f',
          500: '#D91F26',
          600: '#c01b21',
          700: '#a0171c',
          800: '#851519',
          900: '#6e1316',
        },
        // Secondary — metallic silver
        silver: {
          50: '#f6f7f8',
          100: '#eceef0',
          200: '#dadee2',
          300: '#C9CDD2',
          400: '#b3b8be',
          500: '#9aa0a7',
          600: '#7c828a',
          700: '#5f646b',
          800: '#42464c',
          900: '#2a2d31',
        },
        // Accent — deep blue (used sparingly)
        steel: {
          50: '#eef4fb',
          100: '#d6e4f5',
          200: '#aec9ea',
          300: '#7fa7dc',
          400: '#4d83c6',
          500: '#1E5EA8',
          600: '#1a528f',
          700: '#164374',
          800: '#123559',
          900: '#0e2742',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in': 'fade-in 0.8s ease forwards',
        'scale-in': 'scale-in 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        float: 'float 6s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.2s cubic-bezier(0.4,0,0.6,1) infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
};
