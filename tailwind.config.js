const colors = require('tailwindcss/colors');
const { fontFamily, boxShadow } = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  mode: 'jit',
  theme: {
    extend: {
      translate: {
        '(switch-x)': 'calc(100% + 2px)',
      },
      outline: {
        none: 'none',
        default: ['2px solid transparent ,2px'],
      },
      blur: {
        1: '1px',
      },
      fontFamily: {
        ...fontFamily,
        primary: 'Roboto, sans-serif',
        secondary: 'Poppins, sans-serif',
        tertiary: 'Merriweather, serif',
        quaternary: 'Vibes, serif',
      },
      boxShadow: {
        ...boxShadow,
        add: '0 4px 6px -1px rgba(249, 89, 89, 1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: '#4f3cc9',
      secondary: '#f4f4fa',
      tertiary: '#29d074',
      quaternary: '#f95959',

      ...colors,

      facebook: '#325d94',
      twitter: '#00aadb',
      tumblr: '#2f4e6b',
      dribbble: '#fb4087',
      youtube: '#df2e1c',
      vk: '#4c75a3',
      digg: '#1b5891',
      reddit: '#ff4500',
      linkedin: '#1686b0',
      stumbleupon: '#eb4924',
      vimeo: '#63b3e4',
      instagram: '#517fa4',
      pinterest: '#cc1d24',
      behance: '#1478ff',
      heart: '#4bd1fa',
      github: '#24292e',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('tailwindcss-css-filters'), require('@tailwindcss/line-clamp'), require('@tailwindcss/forms')],
};
