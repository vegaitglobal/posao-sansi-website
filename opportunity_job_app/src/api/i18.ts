import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from '../../public/locales/en.json';
import srbTranslation from '../../public/locales/sr.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
        sr: {
            translation: srbTranslation,
        },
        en: {
        translation: enTranslation,
        },
    },
    lng: 'sr', // Set the default language
    fallbackLng: 'sr',
    interpolation: {
      escapeValue: false, // React already safely escapes strings
    },
  });

export default i18n;