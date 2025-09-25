import axios, { type AxiosInstance, type AxiosStatic } from 'axios';
import {
  describe,
  expect,
  it,
  vi,
  beforeEach,
  afterEach,
  type MockInstance,
  type MockedObject,
} from 'vitest';

import { createBaseHttpClient } from './axios-http-client';

vi.mock('axios');
const axiosMock = vi.mocked(axios) as unknown as MockedObject<AxiosStatic>;

describe('Axios Http Clients', () => {
  describe('createBaseHttpClient', () => {
    let localStorageGetItemSpy: MockInstance;

    beforeEach(() => {
      vi.stubEnv('VITE_API_BASE_URL', 'http://baseURL.com/api');
      localStorageGetItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('token');
    });

    afterEach(() => {
      localStorageGetItemSpy.mockClear();
    });

    it('should call localStorage.getItem with the right key', () => {
      createBaseHttpClient();
      expect(localStorageGetItemSpy).toHaveBeenCalledWith('token');
    });

    it('should call create with the right params', () => {
      createBaseHttpClient();

      expect(axiosMock.create).toHaveBeenCalledWith({
        baseURL: 'http://baseURL.com/api',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer token`,
        },
      });
    });

    it('should return an axios instance', () => {
      axiosMock.create.mockReturnValue({ axios: true } as unknown as AxiosInstance);
      const httpClient = createBaseHttpClient();
      expect(httpClient).toEqual({ axios: true });
    });
  });
});
