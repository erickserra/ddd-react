import { describe, expect, it } from 'vitest';
import z from 'zod';

import { DTOValidationError } from './dto-validation.error';

describe('DTOValidationError', () => {
  describe('constructor', () => {
    it('should call super() with the right parameters', () => {
      const error = new DTOValidationError();
      expect(error.name).toBe('DTOValidationError');
      expect(error.message).toBe('schema invalid');
    });
  });

  describe('.isDTOValidationError', () => {
    it('should return true when error is an instance of DTOValidationError', () => {
      const error = new DTOValidationError();
      expect(DTOValidationError.isDTOValidationError(error)).toBeTruthy();
    });

    it('should return false when error is not an instance of DTOValidationError', () => {
      const error = new Error();
      expect(DTOValidationError.isDTOValidationError(error)).toBeFalsy();
    });
  });

  describe('.isZodError', () => {
    it('should return true when error is an instance of ZodError', () => {
      const schema = z.object({ name: z.string() });
      let error: z.ZodError | undefined;

      try {
        schema.parse('test');
      } catch (err: unknown) {
        error = err as z.ZodError;
      }

      expect(DTOValidationError.isZodError(error)).toBeTruthy();
    });

    it('should return false when error is not an instance of ZodError', () => {
      const error = new Error();
      expect(DTOValidationError.isZodError(error)).toBeFalsy();
    });
  });
});
