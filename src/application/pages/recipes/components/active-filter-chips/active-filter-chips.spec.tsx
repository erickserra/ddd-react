import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { ActiveFilterChips } from './active-filter-chips';

describe('ActiveFilterChips', () => {
  it('renders the reset link', () => {
    render(<ActiveFilterChips />);

    const resetLink = screen.getByRole('button', { name: /réinitialiser/i });

    expect(resetLink).toBeInTheDocument();
  });
});
