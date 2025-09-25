import { describe, it, expect, type MockInstance, vi, beforeEach } from 'vitest';
import axios from 'axios';

import { throwUsecaseError } from './throw-usecase-error.helper';
import { LoggerHelper } from '../logger/logger.helper';

import { DTOValidationError } from '@/data/errors/dto-validation/dto-validation.error';
import { UnexpectedError } from '@/data/errors/unexpected/unexpected.error';

vi.mock('axios');
const axiosMock = vi.mocked(axios, true);

describe('throwUsecaseError', () => {
  let spyIsZodError: MockInstance;
  let spyLogError: MockInstance;
  let spyLogTable: MockInstance;

  beforeEach(() => {
    spyIsZodError = vi.spyOn(DTOValidationError, 'isZodError');
    spyLogError = vi.spyOn(LoggerHelper, 'error').mockImplementation(() => {});
    spyLogTable = vi.spyOn(LoggerHelper, 'table').mockImplementation(() => {});
  });

  describe('when error is a zod error', () => {
    beforeEach(() => {
      spyIsZodError.mockReturnValue(true);
    });

    it('should throw new DTOValidationError', () => {
      const dtoError = new Error();
      Object.assign(dtoError, {
        issues: [],
      });

      expect(() => throwUsecaseError(dtoError, 'message')).toThrowError(DTOValidationError);

      expect(spyIsZodError).toHaveBeenCalledWith(dtoError);
      expect(spyLogError).toHaveBeenCalledWith(`DTOValidationError: message`);
      expect(spyLogTable).toHaveBeenCalledWith(expect.any(Object));
      expect(axiosMock.isAxiosError).not.toHaveBeenCalled();
    });
  });

  describe('when error is a axios error', () => {
    beforeEach(() => {
      spyIsZodError.mockReturnValue(false);
      axiosMock.isAxiosError.mockReturnValue(true);
    });

    it('should re-throw the error', () => {
      expect(() => throwUsecaseError(new Error(), 'message')).toThrowError(Error);

      expect(spyIsZodError).toHaveBeenCalledWith(new Error());
      expect(spyLogError).not.toHaveBeenCalled();
      expect(axiosMock.isAxiosError).toHaveBeenCalledWith(new Error());
    });
  });

  describe('when error is a unexpected error', () => {
    beforeEach(() => {
      spyIsZodError.mockReturnValue(false);
      axiosMock.isAxiosError.mockReturnValue(false);
    });

    it('should throw new DTOValidationError', () => {
      expect(() => throwUsecaseError(new Error(), 'message')).toThrowError(UnexpectedError);

      expect(spyIsZodError).toHaveBeenCalledWith(new Error());
      expect(axiosMock.isAxiosError).toHaveBeenCalledWith(new Error());
      expect(spyLogError).toHaveBeenCalledWith('UnexpectedError');
    });
  });
});
