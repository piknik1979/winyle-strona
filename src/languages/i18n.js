import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import pl from './pl.json';
import en from './en.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    pl: { translation: pl }
  },
  lng: 'en', // Język domyślny
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;