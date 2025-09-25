// Router.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Router } from './router';

vi.mock('@/application/pages/recipes/recipes', () => ({
  RecipesPage: () => <div>Recipes Page</div>,
}));

function renderRouterWithPath(initialPath: string) {
  window.history.pushState({}, '', initialPath);

  return render(
    <BrowserRouter>
      <Router />
    </BrowserRouter>,
  );
}

describe('Router', () => {
  it('renders RecipesPage when navigating to /recipes', () => {
    renderRouterWithPath('/');

    expect(screen.getByText('Recipes Page')).toBeInTheDocument();
  });

  it('renders 404 page when navigating to an unknown route', () => {
    renderRouterWithPath('/unknown');

    expect(screen.getByText(/404 - Page not found/i)).toBeInTheDocument();
  });
});
