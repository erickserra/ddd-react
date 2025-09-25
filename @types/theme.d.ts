import '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }

  interface PaletteColor {
    neutral?: string;
  }

  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

export {};
