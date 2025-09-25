import { afterEach } from 'node:test';

import { screen, waitFor } from '@testing-library/react';
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from 'tests/__helpers__/renders';
import nock from 'nock';

import { RecipesPage } from './recipes';

beforeAll(() => {
  vi.stubEnv('VITE_API_BASE_URL', 'http://localhost:8080');
});

afterAll(() => {
  vi.unstubAllEnvs();
});

vi.mock('@/application/pages/recipes/components/active-filter-chips/active-filter-chips', () => ({
  ActiveFilterChips: () => <div data-testid="ActiveFilterChips">ActiveFilterChips</div>,
}));

vi.mock('@/application/pages/recipes/components/search-recipes-form/search-recipes-form', () => ({
  SearchRecipesForm: () => <div data-testid="SearchRecipesForm">SearchRecipesForm</div>,
}));

vi.mock('@/application/pages/recipes/components/action-buttons/action-buttons', () => ({
  ActionButtons: () => <div data-testid="ActionButtons">ActionButtons</div>,
}));

describe('RecipesPage', () => {
  let expectation: nock.Scope;

  describe('when recipes request succeeds', () => {
    describe('and returns recipes', () => {
      beforeEach(() => {
        expectation = nock('http://localhost:8080')
          .get('/recipes')
          .reply(200, [
            {
              idElement: 59748,
              label: 'ABONDANCE (A.C.C)',
              cookingTime: {
                preparation: 36,
                resting: 0,
                cooking: 0,
              },
              recipeFamily: {
                id: 1,
                label: 'Abondance',
              },
              recipeDifficulty: {
                id: 2,
                label: 'Facile',
              },
              themes: [
                {
                  id: 1,
                  label: 'Theme label',
                },
              ],
            },
          ]);
      });

      afterEach(() => {
        nock.cleanAll();
      });

      it('should render the right elements', async () => {
        renderWithProviders(<RecipesPage />);

        // TITLE
        expect(
          screen.getByRole('heading', { name: 'Référentiel Recette', level: 6 }),
        ).toBeVisible();

        expect(screen.getByTestId('ActiveFilterChips')).toBeInTheDocument();
        expect(screen.getByTestId('SearchRecipesForm')).toBeInTheDocument();
        expect(screen.getByTestId('ActionButtons')).toBeInTheDocument();

        // TABS
        expect(screen.getByRole('tab', { name: /Liste/i })).toBeInTheDocument();
        expect(screen.getByRole('tab', { name: /Petite Image/i })).toBeInTheDocument();
        expect(screen.getByRole('tab', { name: /Grande Image/i })).toBeInTheDocument();

        // BUTTON
        expect(screen.getByRole('button', { name: /Import en masse/i })).toBeInTheDocument();

        await waitFor(() => {
          // DATA GRID ROW
          expect(screen.getByText('59748')).toBeVisible();
          expect(screen.getByText('ABONDANCE (A.C.C)')).toBeVisible();
          expect(screen.getByText('Abondance')).toBeVisible();
          expect(screen.getByText('Theme label')).toBeVisible();
          expect(screen.getByText('Facile')).toBeVisible();
          expect(screen.getByText('36 min')).toBeVisible();

          expectation.done();
        });
      });
    });

    describe('and returns an empty array', () => {
      beforeEach(() => {
        expectation = nock('http://localhost:8080').get('/recipes').reply(200, []); // empty response
      });

      afterEach(() => {
        nock.cleanAll();
      });

      it('should render empty state correctly', async () => {
        renderWithProviders(<RecipesPage />);

        // TITLE
        expect(
          screen.getByRole('heading', { name: 'Référentiel Recette', level: 6 }),
        ).toBeVisible();

        expect(screen.getByTestId('ActiveFilterChips')).toBeInTheDocument();
        expect(screen.getByTestId('SearchRecipesForm')).toBeInTheDocument();
        expect(screen.getByTestId('ActionButtons')).toBeInTheDocument();

        // TABS
        expect(screen.getByRole('tab', { name: /Liste/i })).toBeInTheDocument();
        expect(screen.getByRole('tab', { name: /Petite Image/i })).toBeInTheDocument();
        expect(screen.getByRole('tab', { name: /Grande Image/i })).toBeInTheDocument();

        // BUTTON
        expect(screen.getByRole('button', { name: /Import en masse/i })).toBeInTheDocument();

        await waitFor(() => {
          // Check that the data grid is empty
          expect(screen.queryByText('59748')).not.toBeInTheDocument();
          expect(screen.queryByText('ABONDANCE (A.C.C)')).not.toBeInTheDocument();

          // render no data text
          expect(screen.queryByText('Aucun résultat')).toBeInTheDocument();

          expectation.done();
        });
      });
    });
  });
});
