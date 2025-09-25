import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';

export function ActiveFilterChips() {
  return (
    <Box
      sx={{
        height: 56,
        paddingX: 2,
        width: '100%',
        overflowX: 'auto',
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: 'grey.400',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Chip label="Chip" variant="outlined" color="primary" />
      <Chip label="Chip" variant="outlined" color="primary" />
      <Chip label="Chip" variant="outlined" color="secondary" />
      <Chip label="Chip" variant="outlined" color="success" />
      <Chip label="Chip" variant="outlined" color="success" />
      <Chip label="Chip" variant="outlined" color="success" />
      <Chip label="Chip" variant="outlined" color="warning" />
      <Link component="button" variant="body1">
        Réinitialiser
      </Link>
    </Box>
  );
}
