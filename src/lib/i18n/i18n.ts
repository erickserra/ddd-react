import i18n from 'i18next';

import en from './locales/en.json';
import fr from './locales/fr.json';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
i18n.init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
  },
  lng: 'fr', // default language
  fallbackLng: 'fr',
  interpolation: {
    escapeValue: false, // react already escapes values
  },
});

export const translation = i18n;
