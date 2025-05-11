import { createTheme, rem } from '@mantine/core';



const theme = createTheme({
  colors: {
    primary: [
      '#FDF9E2',
      '#F7F0C5',
      '#F1E7A8',
      '#EBE08B',
      '#E5D76E',
      '#E8C926', // Primary color at index 5
      '#D1B422',
      '#BA9F1E',
      '#A38B1A',
      '#8C7616',
    ],
    secondary: [
      '#E3EBE6',
      '#C7D7CD',
      '#ABB3B4',
      '#8F9F9B',
      '#738B82',
      '#265C3B', // Secondary color at index 5
      '#224F32',
      '#1E4229',
      '#1A3520',
      '#162817',
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

  primaryColor: 'primary',
  defaultRadius: 'lg',
  white: '#FFFFFF',
  black: '#171717',

  fontFamily: 'Montserrat, sans-serif',
  
  headings: {
    fontFamily: 'Calistoga, serif',
    fontWeight: '400',
  },



  other: {
    accentFontFamily: 'Montserrat Medium, sans-serif',
    backgroundColor: '#F7F5EF',
  },
});

export default theme;
