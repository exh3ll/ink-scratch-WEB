import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      colors: {
        orange: '#FF512F',
        red: '#DD2476',
        accent: '#FF512F',
        'text-primary': '#1C1C1C',
        'text-secondary': '#6B6B6B',
        card: '#F7F7F7',
        divider: '#E0E0E0',
      },
    },
  },
  plugins: [],
};

export default config;
