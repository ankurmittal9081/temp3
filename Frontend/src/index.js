// // import i18n from 'i18next';
// // import { initReactI18next } from 'react-i18next';
// // import LanguageDetector from 'i18next-browser-languagedetector';

// // // Import translation files
// // import translationEN from './locales/en/translation.json';
// // import translationHI from './locales/hi/translation.json';

// // const resources = {
// //   en: {
// //     translation: translationEN,
// //   },
// //   hi: {
// //     translation: translationHI,
// //   },
// // };

// // i18n
// //   // Detect user language
// //   .use(LanguageDetector)
// //   // Pass the i18n instance to react-i18next
// //   .use(initReactI18next)
// //   // Initialize i18next
// //   .init({
// //     resources,
// //     fallbackLng: 'en', // Use English if detected language is not available
// //     debug: false, // Set to false in production
// //     interpolation: {
// //       escapeValue: false, // React already safes from xss
// //     },
// //     detection: {
// //       order: ['localStorage', 'navigator'],
// //       caches: ['localStorage'],
// //     },
// //   });

// // export default i18n;
// import i18n from "i18next"
// import { initReactI18next } from "react-i18next"

// const resources = {
//   en: {
//     translation: {
//       // Add translations here if needed
//        translation: translationEN,
//     },
//   },
//   hi: {
//     translation: {
//       // Add Hindi translations here if needed
//       translation: translationHI,
//     },
//   },
// }

// i18n.use(initReactI18next).init({
//   resources,
//   lng: "en",
//   fallbackLng: "en",
//   interpolation: {
//     escapeValue: false,
//   },
// })

// export default i18n
// i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// ✅ Import translation files
import translationEN from './locales/en/translation.json';
import translationHI from './locales/hi/translation.json';

// ✅ Setup resources
const resources = {
  en: {
    translation: translationEN,
  },
  hi: {
    translation: translationHI,
  },
};

// ✅ Initialize i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
