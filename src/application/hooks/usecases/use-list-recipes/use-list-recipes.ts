import { useQuery } from '@tanstack/react-query';

import { createBaseHttpClient } from '@/lib/axios/axios-http-client';
import { ListRecipesUseCase } from '@/data/usecases/list-recipes/list-recipes.usecase';

export function useListRecipesUseCase() {
  const listRecipesUseCase = new ListRecipesUseCase('/recipes', createBaseHttpClient());
  return useQuery({
    queryKey: ['listRecipes'],
    queryFn: () => listRecipesUseCase.execute(),
  });
}
