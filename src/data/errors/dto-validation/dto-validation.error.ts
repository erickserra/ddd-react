import z from 'zod';

export class DTOValidationError extends Error {
  constructor() {
    super('schema invalid');
    this.name = 'DTOValidationError';
  }

  static isDTOValidationError(err: unknown): err is DTOValidationError {
    return err instanceof DTOValidationError;
  }

  static isZodError(err: unknown): err is z.ZodError {
    return err instanceof z.ZodError;
  }
}
