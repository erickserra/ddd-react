import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { AlignJustify, Grid2x2, Grid3x3, HardDriveDownload } from 'lucide-react';
import Button from '@mui/material/Button';

import { TabItem } from './tab-item/tab-item';
import { RecipesDataGridView } from './data-grid-view/data-grid-view';

import type { RecipeModel } from '@/domain/recipe/recipe.model';

type Props = {
  recipes: RecipeModel[];
  isLoadingRecipes: boolean;
};

export function RecipesViewTabs({ recipes, isLoadingRecipes }: Props) {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          aria-label="recipes view tabs"
          sx={{
            '.MuiButtonBase-root': {
              minHeight: 42,
            },
          }}
        >
          <Tab
            icon={<AlignJustify />}
            iconPosition="start"
            label="Liste"
            id="data-grid-view"
            aria-controls="data-grid-view"
            tabIndex={0}
          />
          <Tab
            icon={<Grid3x3 />}
            iconPosition="start"
            label="Petite Image"
            id="petite-image-view"
            aria-controls="petite-image-view"
            tabIndex={1}
          />
          <Tab
            icon={<Grid2x2 />}
            iconPosition="start"
            label="Grande Image"
            id="grande-image-view"
            aria-controls="grande-image-view"
            tabIndex={2}
          />
        </Tabs>
        <Button
          variant="outlined"
          sx={{ fontWeight: 'bold', position: 'relative', bottom: 2 }}
          color="secondary"
          size="medium"
          startIcon={<HardDriveDownload />}
        >
          Import en masse
        </Button>
      </Box>
      <Box sx={{ height: 'calc(100% - 48px - 32px)', overflowY: 'auto', p: 2 }}>
        <TabItem currentTabIndex={tabIndex} tabIndex={0} aria-labelledby="data-grid-view">
          <RecipesDataGridView data={recipes} isLoading={isLoadingRecipes} />
        </TabItem>
        <TabItem currentTabIndex={tabIndex} tabIndex={1} aria-labelledby="petite-image-view">
          Item Two
        </TabItem>
        <TabItem currentTabIndex={tabIndex} tabIndex={2} aria-labelledby="grande-image-view">
          Item Three
        </TabItem>
      </Box>
    </>
  );
}
