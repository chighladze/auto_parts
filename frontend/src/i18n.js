import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// Import translations
import enComponents from "./locales/en/components.json";
import enParts from "./locales/en/parts.json";
import enTranslation from "./locales/en/translation.json";
import kaComponents from "./locales/ka/components.json";
import kaParts from "./locales/ka/parts.json";
import kaTranslation from "./locales/ka/translation.json";
import ruComponents from "./locales/ru/components.json";
import ruParts from "./locales/ru/parts.json";
import ruTranslation from "./locales/ru/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
        components: enComponents,
        parts: enParts,
      },
      ru: {
        translation: ruTranslation,
        components: ruComponents,
        parts: ruParts,
      },
      ka: {
        translation: kaTranslation,
        components: kaComponents,
        parts: kaParts,
      },
    },
    fallbackLng: "en",
    defaultNS: "translation",
    debug: process.env.NODE_ENV === "development",

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    returnNull: false,
  });

export default i18n;
