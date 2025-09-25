import { z } from 'zod';

export const listRecipesItemDTO = z.looseObject({
  idElement: z.number(),
  label: z.string(),
  cookingTime: z
    .object({
      preparation: z.number(),
      resting: z.number(),
      cooking: z.number(),
    })
    .partial(),
  recipeFamily: z.object({
    id: z.number(),
    label: z.string(),
  }),
  recipeDifficulty: z.object({
    id: z.number(),
    label: z.string(),
  }),
  themes: z.array(
    z.object({
      id: z.number(),
      label: z.string(),
    }),
  ),
});

export const listRecipesDTO = z.array(listRecipesItemDTO);

export type ListRecipesDTO = z.infer<typeof listRecipesDTO>;
export type ListRecipesItemDTO = z.infer<typeof listRecipesItemDTO>;
