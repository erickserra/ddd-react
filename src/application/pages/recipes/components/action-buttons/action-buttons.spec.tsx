import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ActionButtons } from './action-buttons';

describe('ActionButtons', () => {
  it('should render the right elements', () => {
    render(<ActionButtons />);

    expect(screen.getByRole('button', { name: 'Créer une recette' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Imprimer' })).toBeVisible();
  });
});
