import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from '../../public/locales/en/en.json';
import srbTranslation from '../../public/locales/srb/srb.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
        srb: {
            translation: srbTranslation,
        },
        en: {
        translation: enTranslation,
        },
    },
    lng: 'srb', // Set the default language
    fallbackLng: 'srb',
    interpolation: {
      escapeValue: false, // React already safely escapes strings
    },
  });

export default i18n;