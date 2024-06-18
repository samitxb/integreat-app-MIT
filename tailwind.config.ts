import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
      '3xl': '1921px',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'header-texture': "url('/public/studierende-hoersaal-feiern.png')",
      },
      fontFamily: {
        orator: ['Orator_Std_Medium', 'sans-serif'],
        saira: ['Saira', 'sans-serif'],
      },
      colors: {
        'thd-blau': '#1a4273',
        'thd-dark-grey': '#313131',
        'donau-blau': ' #009fe3',
        'thd-grau':'#6f6f6e',
        'light-grey3':'#dadada',
        'light-grey':'#434343',
        'light-grey2':'#a8a8a8',
        'schema-bg':'rgba(255, 255, 255, 0.9)',
      },
    },
    
  },
  darkMode: 'class',
  plugins: [],
}
export default config

