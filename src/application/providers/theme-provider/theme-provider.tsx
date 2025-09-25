import { ThemeProvider as MuiProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';

import { createApplicationTheme } from './theme-provider.helpers';

export function ThemeProvider({ children }: React.PropsWithChildren) {
  return (
    <MuiProvider theme={createApplicationTheme()}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          '#root': {
            height: '100%',
          },
          body: {
            height: '100vh',
          },
        }}
      />
      {children}
    </MuiProvider>
  );
}
