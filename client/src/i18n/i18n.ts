import i18n from "i18next";
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next",
    },
  },
  uz: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next",
    },
  },
  ru: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next",
    },
  },

};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });
export default i18n;
