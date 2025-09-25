import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { renderWithBrowserRouter } from 'tests/__helpers__/renders';
import { useTranslation } from 'react-i18next';

import App from './app';

const MockPage = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <div>
      <span data-testid="mainColor">{theme.palette.primary.main}</span>
      <span data-testid="translation">{t('Recipe Reference')}</span>
    </div>
  );
};

vi.mock('@/application/router/router', () => ({
  Router: () => (
    <Routes>
      <Route path="/" element={<MockPage />} />
    </Routes>
  ),
}));

function renderAppWithBrowserRouter() {
  window.history.pushState({}, '', '/');
  return renderWithBrowserRouter(<App />);
}

describe('App Component', () => {
  it('renders without crashing and can access context values', () => {
    renderAppWithBrowserRouter();

    const mainColor = screen.getByTestId('mainColor');
    const translation = screen.getByTestId('translation');

    expect(mainColor).toBeInTheDocument();
    expect(mainColor.textContent).toBeTruthy();

    expect(translation).toBeInTheDocument();
    expect(translation.textContent).toEqual('Référentiel Recette');
  });
});
