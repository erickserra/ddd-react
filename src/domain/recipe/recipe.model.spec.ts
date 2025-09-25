import { describe, expect, it } from 'vitest';
import { plainToInstance } from 'class-transformer';

import type { ListRecipesItemDTO } from './dtos/list-recipes.dto';
import { RecipeModel } from './recipe.model';
import { RecipeFamilyModel } from '../recipe-family/recipe-family.model';
import { RecipeDifficultyModel } from '../recipe-difficulty/recipe-difficulty.model';
import { ThemeModel } from '../theme/theme.model';

const dto: ListRecipesItemDTO = {
  idElement: 59748,
  label: 'ABONDANCE (A.C.C)',
  cookingTime: {
    preparation: 0,
    resting: 0,
    cooking: 0,
  },
  recipeFamily: {
    id: 1,
    label: 'Abondance',
  },
  recipeDifficulty: {
    id: 2,
    label: 'Facile',
  },
  themes: [
    {
      id: 1,
      label: 'Abondance',
    },
  ],
};

describe('RecipeModel', () => {
  describe('.fromDTO', () => {
    it('should return a new instance from the method fromDTO', () => {
      const recipe = RecipeModel.fromDTO(dto);

      expect(recipe).toBeInstanceOf(RecipeModel);

      expect(recipe.id).toBeUndefined();
      expect(recipe.idElement).toBe(dto.idElement);
      expect(recipe.label).toBe(dto.label);
      expect(recipe.cookingTime).toEqual(dto.cookingTime);

      expect(recipe.recipeFamily).toEqual(plainToInstance(RecipeFamilyModel, dto.recipeFamily));
      expect(recipe.recipeDifficulty).toEqual(
        plainToInstance(RecipeDifficultyModel, dto.recipeDifficulty),
      );
      expect(recipe.themes).toEqual(plainToInstance(ThemeModel, dto.themes));
    });
  });

  describe('.getPreparationTimeForDisplay', () => {
    describe('when there is no preparation time', () => {
      it('should return "Non renseigné"', () => {
        const recipe = RecipeModel.fromDTO(dto);

        expect(recipe.getPreparationTimeForDisplay()).toBe('Non renseigné');
      });
    });

    describe('when there is preparation time', () => {
      it('should return "Non renseigné"', () => {
        const recipe = RecipeModel.fromDTO({
          ...dto,
          cookingTime: {
            ...dto.cookingTime,
            preparation: 10,
          },
        });

        expect(recipe.getPreparationTimeForDisplay()).toBe('10 min');
      });
    });
  });
});
