import { QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';

import { queryClient } from '@/application/lib/query-client/query-client';
import { ThemeProvider } from '@/application/providers/theme-provider/theme-provider';
import { Router } from '@/application/router/router';
import { translation } from '@/lib/i18n/i18n';

export default function App() {
  return (
    <ThemeProvider>
      <I18nextProvider i18n={translation}>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </I18nextProvider>
    </ThemeProvider>
  );
}
