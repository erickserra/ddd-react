import Chip from '@mui/material/Chip';

import type { RecipeDifficultyModel } from '@/domain/recipe-difficulty/recipe-difficulty.model';

type Props = {
  data: RecipeDifficultyModel;
};

export function RecipeDifficultyChip({ data }: Props) {
  const getColor = () => {
    if (data.isVeryEasy()) return 'secondary';
    if (data.isEasy()) return 'success';
    if (data.isIntermediate()) return 'primary';
    if (data.isAdvanced()) return 'warning';
    if (data.isExpert()) return 'error';

    return 'default';
  };

  return (
    <Chip
      label={data.label}
      size="small"
      sx={{ fontWeight: 'bold' }}
      variant="outlined"
      color={getColor()}
    />
  );
}
