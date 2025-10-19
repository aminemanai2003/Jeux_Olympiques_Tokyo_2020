import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        olympic: {
          gold: '#FFD700',
          silver: '#C0C0C0',
          bronze: '#CD7F32',
          blue: '#0085C7',
          red: '#DF0024',
          darkBlue: '#1E3A8A',
        },
      },
      backgroundImage: {
        'gradient-olympic': 'linear-gradient(135deg, #0085C7 0%, #1E3A8A 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
