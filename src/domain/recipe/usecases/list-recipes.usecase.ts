import type { RecipeModel } from '../recipe.model';

export interface IListRecipesUseCase {
  execute: () => Promise<RecipeModel[]>;
}
