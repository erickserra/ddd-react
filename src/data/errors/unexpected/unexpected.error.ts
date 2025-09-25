export class UnexpectedError extends Error {
  constructor() {
    super('unexpected error');
    this.name = 'UnexpectedError';
  }

  static isUnexpectedError(err: unknown): err is UnexpectedError {
    return err instanceof UnexpectedError;
  }
}
