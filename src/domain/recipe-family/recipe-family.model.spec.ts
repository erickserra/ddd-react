import { describe, expect, it } from 'vitest';
import { plainToInstance } from 'class-transformer';

import { RecipeFamilyModel } from './recipe-family.model';

describe('RecipeFamilyModel', () => {
  describe('properties', () => {
    it('should create an instance with the right properties', () => {
      const recipeFamilyModel = plainToInstance(RecipeFamilyModel, {
        id: 1,
        label: 'this is a label',
      });

      expect(recipeFamilyModel.id).toEqual(1);
      expect(recipeFamilyModel.label).toEqual('this is a label');
    });
  });
});
