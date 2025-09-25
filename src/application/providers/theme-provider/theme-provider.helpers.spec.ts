import { describe, it, expect, vi } from 'vitest';
import { createTheme } from '@mui/material/styles';

import { createApplicationTheme } from './theme-provider.helpers';

vi.mock('@mui/material/styles', () => ({
  createTheme: vi.fn().mockReturnValue({
    pallete: {
      primary: {
        main: 'red',
        contrastText: 'blue',
      },
    },
  }),
}));

describe('ThemeProvider Helpers', () => {
  describe('createApplicationTheme', () => {
    it('should return the right theme config', () => {
      expect(createApplicationTheme()).toEqual({
        pallete: {
          primary: {
            main: 'red',
            contrastText: 'blue',
          },
        },
      });

      expect(createTheme).toHaveBeenCalledWith({
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
    });
  });
});
