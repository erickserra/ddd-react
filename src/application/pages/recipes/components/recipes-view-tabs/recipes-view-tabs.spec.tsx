import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from 'tests/__helpers__/renders';
import { fireEvent } from '@testing-library/react';

import { RecipesViewTabs } from './recipes-view-tabs';

vi.mock('./data-grid-view/data-grid-view', () => ({
  RecipesDataGridView: () => <div data-testid="data-grid-view">Mock</div>,
}));

describe('DisplayTabs', () => {
  it('should render tabs and import button', () => {
    const screen = renderWithProviders(<RecipesViewTabs recipes={[]} isLoadingRecipes={false} />);

    expect(screen.getByRole('tab', { name: /Liste/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Petite Image/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Grande Image/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Import en masse/i })).toBeInTheDocument();
  });

  it('should render RecipesDataGridView on first tab', () => {
    const screen = renderWithProviders(<RecipesViewTabs recipes={[]} isLoadingRecipes={false} />);
    expect(screen.getByTestId('data-grid-view')).toBeInTheDocument();
    expect(screen.getByTestId('data-grid-view')).toBeVisible();
  });

  it('switches tabs correctly', () => {
    const screen = renderWithProviders(<RecipesViewTabs recipes={[]} isLoadingRecipes={false} />);

    const dataGridView = screen.getByTestId('data-grid-view');

    expect(dataGridView).toBeVisible();

    // Click second tab
    fireEvent.click(screen.getByRole('tab', { name: /Petite Image/i }));

    expect(dataGridView).not.toBeVisible();
    expect(screen.getByText('Item Two')).toBeVisible();

    // Click third tab
    fireEvent.click(screen.getByRole('tab', { name: /Grande Image/i }));
    expect(screen.getByText('Item Three')).toBeVisible();
  });
});
