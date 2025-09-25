import { QueryClient } from '@tanstack/react-query';
import { describe, expect, it } from 'vitest';

import { queryClient } from './query-client';

describe('queryClient', () => {
  it('should return a queryClient instance', () => {
    expect(queryClient).toBeInstanceOf(QueryClient);
  });
});
