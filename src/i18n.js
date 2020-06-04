import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";

import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: translationEN
  },
  es: {
    translation: translationES
  }
};

i18n
  .use(I18nextBrowserLanguageDetector)
  .use(reactI18nextModule)
  .init({
    resources,

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;