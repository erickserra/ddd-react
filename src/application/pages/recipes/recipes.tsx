import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import { RecipesViewTabs } from './components/recipes-view-tabs/recipes-view-tabs';

import { ActiveFilterChips } from '@/application/pages/recipes/components/active-filter-chips/active-filter-chips';
import { SearchRecipesForm } from '@/application/pages/recipes/components/search-recipes-form/search-recipes-form';
import { ActionButtons } from '@/application/pages/recipes/components/action-buttons/action-buttons';
import { useListRecipesUseCase } from '@/application/hooks/usecases/use-list-recipes/use-list-recipes';

export function RecipesPage() {
  const { t } = useTranslation();

  const { data: recipes, isLoading: isLoadingRecipes } = useListRecipesUseCase();

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <Box
        sx={{
          width: 300,
          borderRightWidth: 1,
          borderRightStyle: 'solid',
          borderRightColor: 'grey.400',
          borderTop: 0,
          height: '100%',
        }}
      >
        <Box
          sx={{
            height: 88,
            borderBottomWidth: 1,
            borderBottomStyle: 'solid',
            borderBottomColor: 'grey.400',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h6" fontSize="1.5rem" color="#000" fontWeight={'bold'}>
            {t('Recipe Reference')}
          </Typography>
        </Box>
        <Box sx={{ height: 'calc(100% - 88px)', overflowY: 'auto' }}></Box>
      </Box>
      <Box sx={{ width: 'calc(100% - 300px)', height: '100%' }}>
        <Box
          sx={{
            px: 2,
            height: 88,
            width: '100%',
            borderBottomWidth: 1,
            borderBottomStyle: 'solid',
            borderBottomColor: 'grey.400',
            display: 'flex',
            gap: 4,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <SearchRecipesForm />
          <ActionButtons />
        </Box>
        <ActiveFilterChips />
        <Box
          sx={{
            height: 'calc(100% - 88px - 56px)',
            width: '100%',
            bgcolor: 'grey.50',
          }}
        >
          <RecipesViewTabs recipes={recipes || []} isLoadingRecipes={isLoadingRecipes} />
        </Box>
      </Box>
    </Box>
  );
}
