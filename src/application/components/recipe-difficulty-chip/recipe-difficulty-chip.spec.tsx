import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { RecipeDifficultyChip } from './recipe-difficulty-chip';

import { RecipeDifficultyModel } from '@/domain/recipe-difficulty/recipe-difficulty.model';

describe('RecipeDifficultyChip', () => {
  it('should render an outlined chip with the correct label', () => {
    const recipeDifficulty = new RecipeDifficultyModel();
    recipeDifficulty.id = 1;
    recipeDifficulty.label = 'Facile';

    render(<RecipeDifficultyChip data={recipeDifficulty} />);

    const chip = screen.getByText('Facile');
    const chipRoot = chip.closest('div');

    expect(chip).toBeInTheDocument();
    expect(chipRoot).toHaveClass('MuiChip-outlined');
  });

  it('should render the correct chip when difficulty is not mentioned', () => {
    const recipeDifficulty = new RecipeDifficultyModel();
    recipeDifficulty.id = 1;
    recipeDifficulty.label = 'Non mentionné';

    render(<RecipeDifficultyChip data={recipeDifficulty} />);

    const chip = screen.getByText('Non mentionné');
    const chipRoot = chip.closest('div');

    expect(chip).toBeInTheDocument();
    expect(chipRoot).toHaveClass('MuiChip-colorDefault');
  });

  it('should render the correct chip when difficulty is very easy', () => {
    const recipeDifficulty = new RecipeDifficultyModel();
    recipeDifficulty.id = 1;
    recipeDifficulty.label = 'Très facile';

    render(<RecipeDifficultyChip data={recipeDifficulty} />);

    const chip = screen.getByText('Très facile');
    const chipRoot = chip.closest('div');

    expect(chip).toBeInTheDocument();
    expect(chipRoot).toHaveClass('MuiChip-colorSecondary');
  });

  it('should render the correct chip when difficulty is easy', () => {
    const recipeDifficulty = new RecipeDifficultyModel();
    recipeDifficulty.id = 1;
    recipeDifficulty.label = 'Facile';

    render(<RecipeDifficultyChip data={recipeDifficulty} />);

    const chip = screen.getByText('Facile');
    const chipRoot = chip.closest('div');

    expect(chip).toBeInTheDocument();
    expect(chipRoot).toHaveClass('MuiChip-colorSuccess');
  });

  it('should render the correct chip when difficulty is intermediate', () => {
    const recipeDifficulty = new RecipeDifficultyModel();
    recipeDifficulty.id = 1;
    recipeDifficulty.label = 'Intermédiaire';

    render(<RecipeDifficultyChip data={recipeDifficulty} />);

    const chip = screen.getByText('Intermédiaire');
    const chipRoot = chip.closest('div');

    expect(chip).toBeInTheDocument();
    expect(chipRoot).toHaveClass('MuiChip-colorPrimary');
  });

  it('should render the correct chip when difficulty is advanced', () => {
    const recipeDifficulty = new RecipeDifficultyModel();
    recipeDifficulty.id = 1;
    recipeDifficulty.label = 'Avancé';

    render(<RecipeDifficultyChip data={recipeDifficulty} />);

    const chip = screen.getByText('Avancé');
    const chipRoot = chip.closest('div');

    expect(chipRoot).toHaveClass('MuiChip-colorWarning');
    expect(chip).toBeInTheDocument();
  });

  it('should render the correct chip when difficulty is expert', () => {
    const recipeDifficulty = new RecipeDifficultyModel();
    recipeDifficulty.id = 1;
    recipeDifficulty.label = 'Expert';

    const screen = render(<RecipeDifficultyChip data={recipeDifficulty} />);

    const chip = screen.getByText('Expert');
    expect(chip).toBeInTheDocument();

    const chipRoot = chip.closest('div');
    expect(chipRoot).toHaveClass('MuiChip-colorError');
  });
});
