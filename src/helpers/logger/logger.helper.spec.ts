import { describe, it, expect, type MockInstance, vi, beforeEach, afterAll } from 'vitest';

import { LoggerHelper } from './logger.helper';

describe('LoggerHelper', () => {
  afterAll(() => {
    vi.unstubAllEnvs();
  });

  describe('.error', () => {
    let spyConsoleError: MockInstance;

    beforeEach(() => {
      spyConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    describe('when env is production', () => {
      beforeEach(() => {
        vi.stubEnv('VITE_DEPLOY_ENV', 'production');
        LoggerHelper.error('message', {});
      });

      it('should not call console.error when the env is production', () => {
        expect(spyConsoleError).not.toHaveBeenCalled();
      });
    });

    describe('when env is not production', () => {
      beforeEach(() => {
        vi.stubEnv('VITE_DEPLOY_ENV', 'development');
        LoggerHelper.error('message', {});
      });

      it('should call console.error when the env is not production', () => {
        expect(spyConsoleError).toHaveBeenCalledWith('ERROR: message', {});
      });
    });
  });

  describe('.warn', () => {
    let spyConsoleWarn: MockInstance;

    beforeEach(() => {
      spyConsoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    });

    describe('when env is production', () => {
      beforeEach(() => {
        vi.stubEnv('VITE_DEPLOY_ENV', 'production');
        LoggerHelper.warn('message', {});
      });

      it('should not call console.warn when the env is production', () => {
        expect(spyConsoleWarn).not.toHaveBeenCalled();
      });
    });

    describe('when env is not production', () => {
      beforeEach(() => {
        vi.stubEnv('VITE_DEPLOY_ENV', 'development');
        LoggerHelper.warn('message', {});
      });

      it('should call console.warn when the env is not production', () => {
        expect(spyConsoleWarn).toHaveBeenCalledWith('WARN: message', {});
      });
    });
  });

  describe('.info', () => {
    let spyConsoleInfo: MockInstance;

    beforeEach(() => {
      spyConsoleInfo = vi.spyOn(console, 'info').mockImplementation(() => {});
    });

    describe('when env is production', () => {
      beforeEach(() => {
        vi.stubEnv('VITE_DEPLOY_ENV', 'production');
        LoggerHelper.info('message', {});
      });

      it('should not call console.info when the env is production', () => {
        expect(spyConsoleInfo).not.toHaveBeenCalled();
      });
    });

    describe('when env is not production', () => {
      beforeEach(() => {
        vi.stubEnv('VITE_DEPLOY_ENV', 'development');
        LoggerHelper.info('message', {});
      });

      it('should call console.info when the env is not production', () => {
        expect(spyConsoleInfo).toHaveBeenCalledWith('INFO: message', {});
      });
    });
  });

  describe('.debug', () => {
    let spyConsoleDebug: MockInstance;

    beforeEach(() => {
      spyConsoleDebug = vi.spyOn(console, 'debug').mockImplementation(() => {});
    });

    describe('when env is production', () => {
      beforeEach(() => {
        vi.stubEnv('VITE_DEPLOY_ENV', 'production');
        LoggerHelper.debug('message', {});
      });

      it('should not call console.debug when the env is production', () => {
        expect(spyConsoleDebug).not.toHaveBeenCalled();
      });
    });

    describe('when env is not production', () => {
      beforeEach(() => {
        vi.stubEnv('VITE_DEPLOY_ENV', 'development');
        LoggerHelper.debug('message', {});
      });

      it('should call console.debug when the env is not production', () => {
        expect(spyConsoleDebug).toHaveBeenCalledWith('DEBUG: message', {});
      });
    });
  });

  describe('.log', () => {
    let spyConsoleLog: MockInstance;

    beforeEach(() => {
      spyConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});
    });

    describe('when env is production', () => {
      beforeEach(() => {
        vi.stubEnv('VITE_DEPLOY_ENV', 'production');
        LoggerHelper.debug('message', {});
      });

      it('should not call console.log when the env is production', () => {
        expect(spyConsoleLog).not.toHaveBeenCalled();
      });
    });

    describe('when env is not production', () => {
      beforeEach(() => {
        vi.stubEnv('VITE_DEPLOY_ENV', 'development');
        LoggerHelper.log('message', {});
      });

      it('should call console.log when the env is not production', () => {
        expect(spyConsoleLog).toHaveBeenCalledWith('LOG: message', {});
      });
    });
  });

  describe('.table', () => {
    let spyConsoleTable: MockInstance;

    beforeEach(() => {
      spyConsoleTable = vi.spyOn(console, 'table').mockImplementation(() => {});
    });

    describe('when env is production', () => {
      beforeEach(() => {
        vi.stubEnv('VITE_DEPLOY_ENV', 'production');
        LoggerHelper.table([]);
      });

      it('should not call console.table when the env is production', () => {
        expect(spyConsoleTable).not.toHaveBeenCalled();
      });
    });

    describe('when env is not production', () => {
      beforeEach(() => {
        vi.stubEnv('VITE_DEPLOY_ENV', 'development');
        LoggerHelper.table([]);
      });

      it('should call console.table when the env is not production', () => {
        expect(spyConsoleTable).toHaveBeenCalledWith([]);
      });
    });
  });
});
