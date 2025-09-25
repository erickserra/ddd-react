import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';

import { translation } from '../../src/lib/i18n/i18n';
import { ThemeProvider } from '../../src/application/providers/theme-provider/theme-provider';

export function renderWithBrowserRouter(childrenComponent: React.ReactElement) {
  return render(<BrowserRouter>{childrenComponent}</BrowserRouter>);
}

export function renderWithProviders(
  childrenComponent: React.ReactElement,
  { queryClient } = {
    queryClient: new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    }),
  },
) {
  return render(
    <BrowserRouter>
      <I18nextProvider i18n={translation}>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>{childrenComponent}</QueryClientProvider>
        </ThemeProvider>
      </I18nextProvider>
    </BrowserRouter>,
  );
}
