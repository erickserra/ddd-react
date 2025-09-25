import Chip from '@mui/material/Chip';
import { type GridColDef } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { MapPin, Timer } from 'lucide-react';

import { translation } from '@/lib/i18n/i18n';
import type { RecipeModel } from '@/domain/recipe/recipe.model';
import { RecipeDifficultyChip } from '@/application/components/recipe-difficulty-chip/recipe-difficulty-chip';

export const dataGridColumns: GridColDef<RecipeModel>[] = [
  {
    field: 'idElement',
    headerName: translation.t('identifiant'),
    width: 120,
    renderCell: (params) => {
      return (
        <Box sx={{ display: 'flex', gap: 1, height: '100%', alignItems: 'center' }}>
          <MapPin />
          <Typography fontWeight="bold" variant="body2" lineHeight={1}>
            {params.row.idElement}
          </Typography>
        </Box>
      );
    },
  },
  {
    field: 'label',
    headerName: translation.t('Libelle'),
    minWidth: 250,
    flex: 1,
    cellClassName: 'bold-cell',
    valueGetter: (_params, row) => {
      return row.label;
    },
  },
  {
    field: 'recipeFamilyLabel',
    headerName: translation.t('Categorie de recette'),
    width: 200,
    valueGetter: (_params, row) => {
      return row.recipeFamily.label;
    },
  },
  {
    field: 'themeLabel',
    headerName: translation.t('Thematique'),
    width: 200,
    renderCell: (params) => {
      const { row } = params;

      if (!row.themes.length) {
        return null;
      }

      return row.themes.map((theme) => (
        <Chip key={theme.id} label={theme.label} size="small" variant="filled" color="default" />
      ));
    },
  },
  {
    field: 'difficultyLabel',
    headerName: translation.t('Difficulte'),
    width: 200,
    renderCell: (params) => <RecipeDifficultyChip data={params.row.recipeDifficulty} />,
  },
  {
    field: 'cookingTimePreparation',
    headerName: translation.t('Temps de preparation'),
    width: 200,
    renderCell: (params) => {
      return (
        <Box sx={{ display: 'flex', gap: 1, height: '100%', alignItems: 'center' }}>
          <Timer />
          <Typography fontWeight="bold" variant="body2" lineHeight={1}>
            {params.row.getPreparationTimeForDisplay()}
          </Typography>
        </Box>
      );
    },
  },
];
