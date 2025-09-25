import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useTheme } from '@mui/material/styles';

import { ThemeProvider } from './theme-provider';
import { createApplicationTheme } from './theme-provider.helpers';

vi.mock('./theme-provider.helpers', async () => {
  const { createTheme } = await import('@mui/material/styles');
  return {
    createApplicationTheme: vi.fn().mockReturnValue(
      createTheme({
        palette: {
          primary: {
            main: '#FCFCFC',
          },
        },
      }),
    ),
  };
});

function ChildComponent() {
  const theme = useTheme();
  return (
    <div>
      <span data-testid="pallete">{theme.palette.primary.main}</span>
    </div>
  );
}

describe('ThemeProvider', () => {
  describe('Context Values and Render', () => {
    it('should render children and provide the right primary main color', () => {
      render(
        <ThemeProvider>
          <ChildComponent />
        </ThemeProvider>,
      );

      expect(createApplicationTheme).toHaveBeenCalled();
      expect(screen.getByTestId('pallete')).toHaveTextContent('#FCFCFC');
    });
  });
});
