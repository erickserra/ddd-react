import { describe, expect, it } from 'vitest';

import { UnexpectedError } from './unexpected.error';

describe('UnexpectedError', () => {
  describe('constructor', () => {
    it('should call super() with the right parameters', () => {
      const error = new UnexpectedError();
      expect(error.name).toBe('UnexpectedError');
      expect(error.message).toBe('unexpected error');
    });
  });

  describe('.isUnexpectedError', () => {
    it('should return true when error is an instance of UnexpectedError', () => {
      const error = new UnexpectedError();
      expect(UnexpectedError.isUnexpectedError(error)).toBeTruthy();
    });

    it('should return false when error is not an instance of UnexpectedError', () => {
      const error = new Error();
      expect(UnexpectedError.isUnexpectedError(error)).toBeFalsy();
    });
  });
});
