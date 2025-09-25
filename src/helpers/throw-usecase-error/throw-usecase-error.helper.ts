import axios from 'axios';

import { LoggerHelper } from '../logger/logger.helper';

import { DTOValidationError } from '@/data/errors/dto-validation/dto-validation.error';
import { UnexpectedError } from '@/data/errors/unexpected/unexpected.error';

export function throwUsecaseError(err: unknown, dtoErrorMessage: string): never {
  if (DTOValidationError.isZodError(err)) {
    LoggerHelper.error(`DTOValidationError: ${dtoErrorMessage}`);
    LoggerHelper.table(err.issues);
    throw new DTOValidationError();
  }

  if (axios.isAxiosError(err)) {
    throw err;
  } else {
    LoggerHelper.error('UnexpectedError');
    throw new UnexpectedError();
  }
}
