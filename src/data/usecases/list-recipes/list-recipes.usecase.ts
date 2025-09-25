import type { AxiosInstance } from 'axios';

import { listRecipesDTO, type ListRecipesDTO } from '@/domain/recipe/dtos/list-recipes.dto';
import { RecipeModel } from '@/domain/recipe/recipe.model';
import type { IListRecipesUseCase } from '@/domain/recipe/usecases/list-recipes.usecase';
import { throwUsecaseError } from '@/helpers/throw-usecase-error/throw-usecase-error.helper';

export class ListRecipesUseCase implements IListRecipesUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: AxiosInstance,
  ) {}

  async execute(): Promise<RecipeModel[]> {
    try {
      const response = await this.httpClient.request<ListRecipesDTO>({
        url: this.url,
        method: 'get',
      });

      const dtoValidation = listRecipesDTO.parse(response.data);

      return dtoValidation.map((item) => RecipeModel.fromDTO(item));
    } catch (err) {
      throwUsecaseError(err, 'list recipes response');
    }
  }
}
