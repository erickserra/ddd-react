import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { BookOpenText, Printer } from 'lucide-react';

export function ActionButtons() {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Button variant="contained" size="large" startIcon={<BookOpenText />}>
        Créer une recette
      </Button>
      <Button color="neutral" variant="contained" size="large" startIcon={<Printer />}>
        Imprimer
      </Button>
    </Box>
  );
}
