import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import XHR from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // debug: true,
    fallbackLng: 'uz',
    supportedLngs: ['uz', 'ru'],
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/translations/{{lng}}/{{ns}}.json",
      allowMultiLoading: true,
    },
  });
export default i18n;
