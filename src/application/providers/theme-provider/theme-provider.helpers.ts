import { createTheme } from '@mui/material/styles';

export function createApplicationTheme() {
  return createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ':root, html, body': {
            height: '100vh',
            margin: 0,
          },
        },
      },
    },
  });
}
