module.exports = {
  purge: ['./src/**/*.vue', './public/index.html'],
  theme: {
    screens: {
      sm: '768px',
      md: '960px',
      lg: '1152px',
      xl: '1344px'
    },
    container: {
      padding: {
        default: '0.75rem'
      }
    },
    fontFamily: {
      sans: 'Robot, Helvetica, Arial, sans-serif'
    },
    extend: {
      colors: {
        twitch: '#772ce8',
        discord: '#7289da',
        twitter: '#4099ff',
        youtube: 'red',
        patreon: 'rgb(232, 91, 70)',
        speedsouls: '#ef6c06',
        nord0: '#2E3440',
        nord1: '#3B4252',
        nord2: '#434C5E',
        nord3: '#4C566A',
        nord4: '#D8DEE9',
        nord5: '#E5E9F0',
        nord6: '#ECEFF4',
        nord7: '#8FBCBB',
        nord8: '#88C0D0',
        nord9: '#81A1C1',
        nord10: '#5E81AC',
        nord11: '#BF616A',
        nord12: '#D08770',
        nord13: '#EBCB8B',
        nord14: '#A3BE8C',
        nord15: '#B48EAD'
      },
      spacing: {
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/6': '16.666667%',
        '2/6': '33.333333%',
        '3/6': '50%',
        '4/6': '66.666667%',
        '5/6': '83.333333%',
        '1/12': '8.333333%',
        '2/12': '16.666667%',
        '3/12': '25%',
        '4/12': '33.333333%',
        '5/12': '41.666667%',
        '6/12': '50%',
        '7/12': '58.333333%',
        '8/12': '66.666667%',
        '9/12': '75%',
        '10/12': '83.333333%',
        '11/12': '91.666667%'
      }
    }
  },
  variants: {
    backgroundColor: [
      'responsive',
      'hover',
      'focus',
      'dark',
      'dark-hover',
      'dark-group-hover',
      'dark-even',
      'dark-odd'
    ],
    borderColor: [
      'responsive',
      'hover',
      'focus',
      'dark',
      'dark-focus',
      'dark-focus-within'
    ],
    textColor: [
      'responsive',
      'hover',
      'focus',
      'dark',
      'dark-hover',
      'dark-active',
      'dark-placeholder'
    ]
  },
  plugins: [require('tailwindcss-dark-mode')()]
};
