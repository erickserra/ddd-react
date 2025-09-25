import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from 'tests/__helpers__/renders';
import type { GridRenderCellParams } from '@mui/x-data-grid';

import { dataGridColumns } from './data-grid-view.helpers';

import { RecipeModel } from '@/domain/recipe/recipe.model';
import type { ListRecipesItemDTO } from '@/domain/recipe/dtos/list-recipes.dto';
import type { RecipeDifficultyModel } from '@/domain/recipe-difficulty/recipe-difficulty.model';

vi.mock('@/application/components/recipe-difficulty-chip/recipe-difficulty-chip', () => ({
  RecipeDifficultyChip: ({ data }: { data: RecipeDifficultyModel }) => <div>{data.label}</div>,
}));

describe('DataGridView Helpers', () => {
  describe('dataGridColumns', () => {
    describe('idElement Column', () => {
      it('should return the right object', () => {
        const column = dataGridColumns.find((c) => c.field === 'idElement')!;

        expect(column).toEqual({
          field: 'idElement',
          headerName: 'Identifiant',
          width: 120,

          renderCell: expect.any(Function),
        });

        const row = RecipeModel.fromDTO({
          idElement: 12345,
        } as ListRecipesItemDTO);

        const screen = renderWithProviders(
          column.renderCell!({ row } as GridRenderCellParams<RecipeModel>) as React.ReactElement,
        );

        // check for idElement text
        expect(screen.getByText('12345')).toBeInTheDocument();
      });
    });

    describe('label Column', () => {
      it('should return the right object', () => {
        const column = dataGridColumns.find((c) => c.field === 'label')!;

        expect(column).toEqual({
          field: 'label',
          headerName: 'Libellé',
          minWidth: 250,
          flex: 1,
          cellClassName: 'bold-cell',

          valueGetter: expect.any(Function),
        });

        const row = RecipeModel.fromDTO({
          idElement: 12345,
          label: 'This is a label',
        } as ListRecipesItemDTO);

        const label = column.valueGetter!({} as never, row, {} as never, {} as never);

        expect(label).toEqual('This is a label');
      });
    });

    describe('recipeFamilyLabel Column', () => {
      it('should return the right object', () => {
        const column = dataGridColumns.find((c) => c.field === 'recipeFamilyLabel')!;

        expect(column).toEqual({
          field: 'recipeFamilyLabel',
          headerName: 'Catégorie de recette',
          width: 200,

          valueGetter: expect.any(Function),
        });

        const row = RecipeModel.fromDTO({
          idElement: 12345,
          label: 'This is a label',
          recipeFamily: {
            id: 1,
            label: 'This is a recipe family',
          },
        } as ListRecipesItemDTO);

        const label = column.valueGetter!({} as never, row, {} as never, {} as never);

        expect(label).toEqual('This is a recipe family');
      });
    });

    describe('themeLabel Column', () => {
      it('when the row does not have themes', () => {
        const column = dataGridColumns.find((c) => c.field === 'themeLabel')!;

        expect(column).toEqual({
          field: 'themeLabel',
          headerName: 'Thématique',
          width: 200,

          renderCell: expect.any(Function),
        });

        const row = RecipeModel.fromDTO({
          idElement: 12345,
          themes: [],
        } as unknown as ListRecipesItemDTO);

        const result = column.renderCell!({ row } as GridRenderCellParams<RecipeModel>);

        expect(result).toBeNull();
      });

      it('when the row does have themes', () => {
        const column = dataGridColumns.find((c) => c.field === 'themeLabel')!;

        expect(column).toEqual({
          field: 'themeLabel',
          headerName: 'Thématique',
          width: 200,

          renderCell: expect.any(Function),
        });

        const row = RecipeModel.fromDTO({
          idElement: 12345,
          themes: [{ id: 1, label: 'This is a theme' }],
        } as unknown as ListRecipesItemDTO);

        const screen = renderWithProviders(
          column.renderCell!({ row } as GridRenderCellParams<RecipeModel>) as React.ReactElement,
        );

        expect(screen.getByText('This is a theme')).toBeInTheDocument();
      });
    });

    describe('difficultyLabel Column', () => {
      it('should return the right object', () => {
        const column = dataGridColumns.find((c) => c.field === 'difficultyLabel')!;

        expect(column).toEqual({
          field: 'difficultyLabel',
          headerName: 'Difficulté',
          width: 200,

          renderCell: expect.any(Function),
        });

        const row = RecipeModel.fromDTO({
          idElement: 12345,
          recipeDifficulty: {
            id: 1,
            label: 'This is a difficulty',
          },
        } as unknown as ListRecipesItemDTO);

        const screen = renderWithProviders(
          column.renderCell!({ row } as GridRenderCellParams<RecipeModel>) as React.ReactElement,
        );

        expect(screen.getByText('This is a difficulty')).toBeInTheDocument();
      });
    });

    describe('cookingTimePreparation Column', () => {
      it('should return the right object', () => {
        const column = dataGridColumns.find((c) => c.field === 'cookingTimePreparation')!;

        expect(column).toEqual({
          field: 'cookingTimePreparation',
          headerName: 'Temps de préparation',
          width: 200,

          renderCell: expect.any(Function),
        });

        const row = new RecipeModel();
        row.getPreparationTimeForDisplay = vi.fn().mockReturnValue('36 min');

        const screen = renderWithProviders(
          column.renderCell!({ row } as GridRenderCellParams<RecipeModel>) as React.ReactElement,
        );

        expect(screen.getByText('36 min')).toBeInTheDocument();
      });
    });
  });
});
