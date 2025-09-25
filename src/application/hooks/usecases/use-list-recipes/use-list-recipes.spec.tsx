import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterAll, vi, beforeAll } from 'vitest';
import nock from 'nock';

import { useListRecipesUseCase } from './use-list-recipes';

import { RecipeModel } from '@/domain/recipe/recipe.model';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

beforeAll(() => {
  vi.stubEnv('VITE_API_BASE_URL', 'http://localhost:8080');
});

afterAll(() => {
  vi.unstubAllEnvs();
});

describe('useListRecipesUseCase', () => {
  let wrapper: React.FunctionComponent<React.PropsWithChildren>;
  let expectation: nock.Scope;

  beforeEach(() => {
    wrapper = ({ children }: React.PropsWithChildren) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  });

  describe('when request is success', () => {
    beforeEach(() => {
      expectation = nock('http://localhost:8080')
        .get('/recipes')
        .reply(200, [
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

    afterAll(() => {
      nock.cleanAll();
    });

    it('should return the response data', async () => {
      const { result } = renderHook(() => useListRecipesUseCase(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toEqual(true);
        expect(result.current.data).toEqual([
          RecipeModel.fromDTO({
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
          }),
        ]);
        expectation.done();
      });
    });
  });

  describe('when request throws', () => {
    beforeEach(() => {
      expectation = nock('http://localhost:8080')
        .get('/recipes')
        .reply(500, {
          statusCode: 500,
          timestamp: '2025-09-19T08:40:13.340Z',
          path: '/',
          error: {
            message: 'SERVER ERROR',
            error: 'SERVER ERROR',
            statusCode: 500,
          },
        });
    });

    afterAll(() => {
      nock.cleanAll();
    });

    it('should return the error response', async () => {
      const { result } = renderHook(() => useListRecipesUseCase(), { wrapper });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect((result.current.error as any).response.status).toEqual(500);

      expect((result.current.error as any).response.data).toEqual({
        statusCode: 500,
        timestamp: '2025-09-19T08:40:13.340Z',
        path: '/',
        error: {
          message: 'SERVER ERROR',
          error: 'SERVER ERROR',
          statusCode: 500,
        },
      });

      expectation.done();
    });
  });
});
