import { describe, expect, it, vi, type MockInstance, beforeEach } from 'vitest';
import type { AxiosInstance } from 'axios';

import { ListRecipesUseCase } from './list-recipes.usecase';

import { listRecipesDTO } from '@/domain/recipe/dtos/list-recipes.dto';
import { RecipeModel } from '@/domain/recipe/recipe.model';
import { throwUsecaseError } from '@/helpers/throw-usecase-error/throw-usecase-error.helper';

vi.mock('@/helpers/throw-usecase-error/throw-usecase-error.helper', () => ({
  throwUsecaseError: vi.fn().mockImplementation(() => {
    throw new Error();
  }),
}));

describe('ListRecipesUseCase', () => {
  describe('constructor', () => {
    it('should set url and httpClient properties', () => {
      const usecase = new ListRecipesUseCase('/recipes', {} as AxiosInstance);
      expect(usecase['url']).toEqual('/recipes');
      expect(usecase['httpClient']).toEqual({});
    });
  });

  describe('.execute', () => {
    let usecase: ListRecipesUseCase;
    let httpClient: { request: MockInstance };
    let spyListRecipesDTOParse: MockInstance;
    let spyFromDTO: MockInstance;

    beforeEach(() => {
      httpClient = { request: vi.fn() };
      spyFromDTO = vi.spyOn(RecipeModel, 'fromDTO').mockReturnValue(new RecipeModel());
      spyListRecipesDTOParse = vi.spyOn(listRecipesDTO, 'parse');
      usecase = new ListRecipesUseCase('/recipes', httpClient as unknown as AxiosInstance);
    });

    describe('when request is successful', () => {
      beforeEach(() => {
        httpClient.request.mockResolvedValue({
          data: [
            {
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
            },
          ],
        });
      });

      describe('when response is valid', () => {
        beforeEach(() => {
          spyListRecipesDTOParse.mockReturnValue([
            {
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
            },
          ]);
        });

        it('should call the right methods and return a list of recipeModels', async () => {
          await expect(usecase.execute()).resolves.toEqual([new RecipeModel()]);
          expect(httpClient.request).toHaveBeenCalledWith({
            url: '/recipes',
            method: 'get',
          });
          expect(spyListRecipesDTOParse).toHaveBeenCalledWith([
            {
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
            },
          ]);
          expect(spyFromDTO).toHaveBeenCalledWith({
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
          });
        });
      });

      describe('when response is not valid', () => {
        beforeEach(() => {
          spyListRecipesDTOParse.mockRejectedValue({});
        });

        it('should call call the right methods', async () => {
          await expect(() => usecase.execute()).rejects.toThrow(Error);

          expect(httpClient.request).toHaveBeenCalledWith({
            url: '/recipes',
            method: 'get',
          });

          expect(spyListRecipesDTOParse).toHaveBeenCalledWith([
            {
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
            },
          ]);

          expect(spyFromDTO).not.toHaveBeenCalled();

          expect(throwUsecaseError).toHaveBeenCalledWith(
            expect.any(Error),
            'list recipes response',
          );
        });
      });
    });

    describe('when request throws an error', () => {
      beforeEach(() => {
        httpClient.request.mockRejectedValue({});
      });

      it('should call call the right methods', async () => {
        await expect(() => usecase.execute()).rejects.toThrow(Error);

        expect(httpClient.request).toHaveBeenCalledWith({
          url: '/recipes',
          method: 'get',
        });

        expect(spyListRecipesDTOParse).not.toHaveBeenCalled();
        expect(spyFromDTO).not.toHaveBeenCalled();
        expect(throwUsecaseError).toHaveBeenCalledWith(expect.any(Error), 'list recipes response');
      });
    });
  });
});
