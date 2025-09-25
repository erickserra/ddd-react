import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from 'tests/__helpers__/renders';
import { waitFor, within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { RecipesDataGridView } from './data-grid-view';

import { RecipeModel } from '@/domain/recipe/recipe.model';

describe('RecipesDataGridView', () => {
  it('should render the row correctly', () => {
    const model = RecipeModel.fromDTO({
      idElement: 12345,
      label: 'This is a label',
      recipeFamily: {
        id: 1,
        label: 'This is a recipe family',
      },
      cookingTime: {
        preparation: 0,
        cooking: 0,
        resting: 0,
      },
      themes: [{ id: 1, label: 'This is a theme' }],
      recipeDifficulty: {
        id: 1,
        label: 'This is a difficulty',
      },
    });
    model.getPreparationTimeForDisplay = vi.fn().mockReturnValue('36 min');

    const screen = renderWithProviders(<RecipesDataGridView data={[model]} isLoading={false} />);
    const idElement = screen.getByText('12345');
    const label = screen.getByText('This is a label');
    const recipeFamilyLabel = screen.getByText('This is a recipe family');
    const themesLabel = screen.getByText('This is a theme');
    const difficultyLabel = screen.getByText('This is a difficulty');
    const cookingTimePreparation = screen.getByText('36 min');

    expect(idElement).toBeVisible();
    expect(label).toBeVisible();
    expect(recipeFamilyLabel).toBeVisible();
    expect(themesLabel).toBeVisible();
    expect(difficultyLabel).toBeVisible();
    expect(cookingTimePreparation).toBeVisible();
  });

  it('should render the locale texts correctly with no data', () => {
    const screen = renderWithProviders(<RecipesDataGridView data={[]} isLoading={false} />);

    expect(screen.queryByText('Aucun résultat')).toBeInTheDocument();
    expect(screen.queryByText('Lignes par page', { exact: false })).toBeInTheDocument();
  });

  it('should render row selected text when selecting a row', async () => {
    const model = RecipeModel.fromDTO({
      idElement: 12345,
      label: 'This is a label',
      recipeFamily: {
        id: 1,
        label: 'This is a recipe family',
      },
      cookingTime: {
        preparation: 0,
        cooking: 0,
        resting: 0,
      },
      themes: [{ id: 1, label: 'This is a theme' }],
      recipeDifficulty: {
        id: 1,
        label: 'This is a difficulty',
      },
    });
    const screen = renderWithProviders(<RecipesDataGridView data={[model]} isLoading={false} />);

    const grid = screen.getByRole('grid');
    const rows = within(grid).getAllByRole('row');

    // the header in data grid is also a row. That's why we assert for 2
    expect(rows.length).toEqual(2);

    // select the first row (not header)
    await userEvent.click(rows[1]);

    await waitFor(() => {
      expect(screen.getByText('1 ligne sélectionnée')).toBeInTheDocument();
    });
  });

  it('should render the column headers correctly', () => {
    const screen = renderWithProviders(<RecipesDataGridView data={[]} isLoading={false} />);

    expect(screen.getByText('Identifiant')).toBeVisible();
    expect(screen.getByText('Libellé')).toBeVisible();
    expect(screen.getByText('Catégorie de recette')).toBeVisible();
    expect(screen.getByText('Thématique')).toBeVisible();
    expect(screen.getByText('Difficulté')).toBeVisible();
    expect(screen.getByText('Temps de préparation')).toBeVisible();
  });
});
