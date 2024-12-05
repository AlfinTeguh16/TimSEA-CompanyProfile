import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-radial': 'radial-gradient(ellipse at center, rgba(32, 38, 51,1) -240%, rgba(32, 38, 51,0) 80%)',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        'blue-ribbon': {
            DEFAULT: '#005CFF',
            50: '#B8D1FF',
            100: '#A3C4FF',
            200: '#7AAAFF',
            300: '#5290FF',
            400: '#2976FF',
            500: '#005CFF',
            600: '#0048C7',
            700: '#00348F',
            800: '#001F57',
            900: '#000B1F',
            950: '#000103',
        },
        'cerulean': {
            DEFAULT: '#06A7D5',
            50: '#97E5FC',
            100: '#83E1FB',
            200: '#5BD7FA',
            300: '#33CDF9',
            400: '#0CC4F8',
            500: '#06A7D5',
            600: '#047C9E',
            700: '#035168',
            800: '#012731',
            900: '#000000',
            950: '#000000',
        },
        'text-color-navy':{
          DEFAULT: '#001F56'
        }
      },
    },
  },
  plugins: [],
};
export default config;
