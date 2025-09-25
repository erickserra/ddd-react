import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SearchRecipesForm } from './search-recipes-form';

describe('SearchRecipesForm', () => {
  it('should render the right elements', () => {
    render(<SearchRecipesForm />);

    expect(
      screen.getByPlaceholderText('Rechercher une recette par nom ou ID...'),
    ).toBeInTheDocument();
  });
});
