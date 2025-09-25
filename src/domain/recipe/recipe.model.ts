import { plainToInstance, Type } from 'class-transformer';

import type { ListRecipesItemDTO } from './dtos/list-recipes.dto';
import { RecipeDifficultyModel } from '../recipe-difficulty/recipe-difficulty.model';
import { RecipeFamilyModel } from '../recipe-family/recipe-family.model';
import { ThemeModel } from '../theme/theme.model';

import { translation } from '@/lib/i18n/i18n';

export class RecipeModel {
  @Type(() => RecipeFamilyModel)
  public recipeFamily: RecipeFamilyModel;

  @Type(() => RecipeDifficultyModel)
  public recipeDifficulty: RecipeDifficultyModel;

  @Type(() => ThemeModel)
  public themes: ThemeModel[];

  public id: number;
  public idElement: number;
  public label: string;

  public cookingTime: {
    preparation: number;
    resting: number;
    cooking: number;
  };

  static fromDTO(data: ListRecipesItemDTO): RecipeModel {
    return plainToInstance(RecipeModel, data);
  }

  public getPreparationTimeForDisplay(): string {
    if (this.cookingTime.preparation) {
      return `${this.cookingTime.preparation} min`;
    }

    return translation.t('Non renseigne');
  }
}
