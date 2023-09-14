import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import {es, en} from './src/config/localization/translations';

const resources = {
  es: {
    translation: es,
  },
  en: {
    translation: en,
  },
};

i18n.use(initReactI18next).init({
  debug: false,
  compatibilityJSON: 'v3',
  resources,
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
  react: {
    useSuspense: false, //in case you have any suspense related errors
  },
});

export default i18n;
