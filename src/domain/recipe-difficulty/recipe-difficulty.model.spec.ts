import { plainToInstance } from 'class-transformer';
import { describe, expect, it } from 'vitest';

import { RecipeDifficultyModel } from './recipe-difficulty.model';

describe('RecipeDifficultyModel', () => {
  describe('properties', () => {
    it('should create an instance with the right properties', () => {
      const recipeDifficultyModel = plainToInstance(RecipeDifficultyModel, {
        id: 1,
        label: 'facile',
      });

      expect(recipeDifficultyModel.id).toEqual(1);
      expect(recipeDifficultyModel.label).toEqual('facile');
    });
  });

  describe('.isNotMentioned', () => {
    describe('when label is non mentionné', () => {
      it('should return true', () => {
        const recipeDifficultyModel = plainToInstance(RecipeDifficultyModel, {
          id: 1,
          label: 'Non mentionné',
        });

        expect(recipeDifficultyModel.isNotMentioned()).toEqual(true);
      });
    });

    describe('when label is not non mentionné', () => {
      it('should return false', () => {
        const recipeDifficultyModel = plainToInstance(RecipeDifficultyModel, {
          id: 1,
          label: 'facile',
        });

        expect(recipeDifficultyModel.isNotMentioned()).toEqual(false);
      });
    });
  });

  describe('.isVeryEasy', () => {
    describe('when label is très facile', () => {
      it('should return true', () => {
        const recipeDifficultyModel = plainToInstance(RecipeDifficultyModel, {
          id: 1,
          label: 'Très facile',
        });

        expect(recipeDifficultyModel.isVeryEasy()).toEqual(true);
      });
    });

    describe('when label is not très facile', () => {
      it('should return false', () => {
        const recipeDifficultyModel = plainToInstance(RecipeDifficultyModel, {
          id: 1,
          label: 'facile',
        });

        expect(recipeDifficultyModel.isVeryEasy()).toEqual(false);
      });
    });
  });

  describe('.isEasy', () => {
    describe('when label is facile', () => {
      it('should return true', () => {
        const recipeDifficultyModel = plainToInstance(RecipeDifficultyModel, {
          id: 1,
          label: 'Facile',
        });

        expect(recipeDifficultyModel.isEasy()).toEqual(true);
      });
    });

    describe('when label is not facile', () => {
      it('should return false', () => {
        const recipeDifficultyModel = plainToInstance(RecipeDifficultyModel, {
          id: 1,
          label: 'avancé',
        });

        expect(recipeDifficultyModel.isEasy()).toEqual(false);
      });
    });
  });

  describe('.isIntermediate', () => {
    describe('when label is intermédiaire', () => {
      it('should return true', () => {
        const recipeDifficultyModel = plainToInstance(RecipeDifficultyModel, {
          id: 1,
          label: 'Intermédiaire',
        });

        expect(recipeDifficultyModel.isIntermediate()).toEqual(true);
      });
    });

    describe('when label is not intermédiaire', () => {
      it('should return false', () => {
        const recipeDifficultyModel = plainToInstance(RecipeDifficultyModel, {
          id: 1,
          label: 'facile',
        });

        expect(recipeDifficultyModel.isIntermediate()).toEqual(false);
      });
    });
  });

  describe('.isAdvanced', () => {
    describe('when label is avancé', () => {
      it('should return true', () => {
        const recipeDifficultyModel = plainToInstance(RecipeDifficultyModel, {
          id: 1,
          label: 'Avancé',
        });

        expect(recipeDifficultyModel.isAdvanced()).toEqual(true);
      });
    });

    describe('when label is not avancé', () => {
      it('should return false', () => {
        const recipeDifficultyModel = plainToInstance(RecipeDifficultyModel, {
          id: 1,
          label: 'facile',
        });

        expect(recipeDifficultyModel.isAdvanced()).toEqual(false);
      });
    });
  });

  describe('.isExpert', () => {
    describe('when label is expert', () => {
      it('should return true', () => {
        const recipeDifficultyModel = plainToInstance(RecipeDifficultyModel, {
          id: 1,
          label: 'Expert',
        });

        expect(recipeDifficultyModel.isExpert()).toEqual(true);
      });
    });

    describe('when label is not expert', () => {
      it('should return false', () => {
        const recipeDifficultyModel = plainToInstance(RecipeDifficultyModel, {
          id: 1,
          label: 'facile',
        });

        expect(recipeDifficultyModel.isExpert()).toEqual(false);
      });
    });
  });
});
