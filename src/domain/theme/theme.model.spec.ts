import { describe, expect, it } from 'vitest';
import { plainToInstance } from 'class-transformer';

import { ThemeModel } from '../theme/theme.model';

describe('ThemeModel', () => {
  describe('properties', () => {
    it('should create an instance with the right properties', () => {
      const themeModel = plainToInstance(ThemeModel, {
        id: 1,
        label: 'this is a label',
      });

      expect(themeModel.id).toEqual(1);
      expect(themeModel.label).toEqual('this is a label');
    });
  });
});
