import { DataGrid } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';

import { dataGridColumns } from './data-grid-view.helpers';

import type { RecipeModel } from '@/domain/recipe/recipe.model';

type Props = {
  data: RecipeModel[];
  isLoading: boolean;
};

export function RecipesDataGridView({ data, isLoading }: Props) {
  const { t } = useTranslation();

  return (
    <DataGrid
      disableColumnSorting
      disableColumnMenu
      loading={isLoading}
      rows={data}
      rowHeight={36}
      columns={dataGridColumns}
      getRowId={(row) => row.idElement}
      getRowClassName={() => 'row-bg'}
      localeText={{
        noRowsLabel: t('noRowsLabel'),
        noResultsOverlayLabel: t('noRowsLabel'),
        footerTotalRows: t('footerTotalRows'),
        paginationRowsPerPage: t('paginationRowsPerPage'),
        footerRowSelected: (count: number) => `${t('footerRowSelected', { count })}`,
      }}
      sx={(theme) => ({
        '& .bold-cell': {
          fontWeight: 'bold',
        },
        '& .row-bg': {
          backgroundColor: theme.palette.grey[50],
        },
        '.MuiDataGrid-columnHeaders': {
          '--DataGrid-t-header-background-base': theme.palette.grey[50],
        },
        border: 'none',
      })}
    />
  );
}
