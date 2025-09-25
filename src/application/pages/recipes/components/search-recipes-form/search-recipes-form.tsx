import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Search } from 'lucide-react';

export function SearchRecipesForm() {
  return (
    <Box component="form" autoComplete="off" sx={{ flexGrow: 1 }}>
      <FormControl size="small" fullWidth>
        <OutlinedInput
          id="outlined-adornment-password"
          type="text"
          sx={() => ({
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: '#000',
            },
            '.MuiInputBase-input': {
              lineHeight: '20px',
            },
          })}
          startAdornment={
            <InputAdornment position="end">
              <Search style={{ position: 'relative', right: 8 }} />
            </InputAdornment>
          }
          placeholder="Rechercher une recette par nom ou ID..."
        />
      </FormControl>
    </Box>
  );
}
