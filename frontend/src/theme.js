import { createTheme } from '@mantine/core';

const theme = createTheme({
  primaryColor: 'green',
  colors: {
    green: [
      '#e8f5ec',
      '#d1ebd9',
      '#a3d7b3',
      '#74c28b',
      '#59a371',
      '#4a9463',
      '#368552',
      '#2d7246',
      '#245f3a',
      '#1a4c2e',
    ],
  },
  fontFamily: 'Quicksand, sans-serif',
  defaultRadius: 'md',
  components: {
    Button: {
      defaultProps: {
        radius: 32,
      },
    },
    Card: {
      defaultProps: {
        radius: 8,
      },
    },
    Paper: {
      defaultProps: {
        radius: 16,
      },
    },
  },
});

export default theme;
