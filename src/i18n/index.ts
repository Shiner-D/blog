import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import homeZh from "./home/zh.json";
import homeEn from "./home/en.json";
import aboutZh from "./about/zh.json";
import aboutEn from "./about/en.json";
import blogZh from "./blog/zh.json";
import blogEn from "./blog/en.json";
import bookshelfZh from "./bookshelf/zh.json";
import bookshelfEn from "./bookshelf/en.json";
import commonZh from "./common/zh.json";
import commonEn from "./common/en.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          // 英文翻译
          ...homeEn,
          ...aboutEn,
          ...blogEn,
          ...bookshelfEn,
          ...commonEn,
        },
      },
      zh: {
        translation: {
          // 中文翻译
          ...homeZh,
          ...aboutZh,
          ...blogZh,
          ...bookshelfZh,
         ...commonZh,
        },
      },
    },
    fallbackLng: "en", // 默认语言
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

window.$t = i18n.t.bind(i18n);
export default i18n;
