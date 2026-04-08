import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#030712',
        void: '#0a0a0f',
        surface: '#0f1118',
        mist: 'rgba(255,255,255,0.06)',
        violet: {
          glow: '#8b5cf6',
          deep: '#5b21b6',
        },
        fuchsia: {
          glow: '#e879f9',
        },
        emerald: {
          glow: '#34d399',
        },
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
        'radial-violet': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124,58,237,0.25), transparent 55%)',
        'radial-fuchsia': 'radial-gradient(ellipse 60% 40% at 80% 60%, rgba(232,121,249,0.12), transparent 50%)',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
      },
    },
  },
  plugins: [],
};

export default config;

