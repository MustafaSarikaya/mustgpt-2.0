import { createTheme, rem } from '@mantine/core';



const theme = createTheme({
  colors: {
    primary: [
      "#fffce1",
      "#fdf8cd",
      "#f9f09f",
      "#f5e76c",
      "#f2df3a",
      "#f1dc26",
      "#f0da13",
      "#d5c000",
      "#bdab00",
      "#a39300"
    ],
    secondary: [
      "#e6f6ff",
      "#d0e9ff",
      "#a0d1fb",
      "#6db8fa",
      "#45a2f8",
      "#3094f8",
      "#238ef9",
      "#167ade",
      "#026cc6",
      "#005eb0"
    ],
    accent: [
      '#FFFFFF', // Light text / accent at index 0
      '#E6E6E6',
      '#CCCCCC',
      '#B3B3B3',
      '#999999',
      '#808080',
      '#666666',
      '#4D4D4D',
      '#333333',
      '#171717', // Dark text / accent at index 9
    ],
  },

  // primaryColor: 'primary',
  defaultRadius: 'lg',
  white: '#F6F6F6',
  black: '#171717',

  fontFamily: 'Montserrat Medium, sans-serif',
  
  headings: {
    fontFamily: 'Calistoga, serif',
    fontWeight: '400',
  },



  other: {
    backgroundColor: '#F6F6F6',
  },
});

export default theme;
