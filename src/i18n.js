import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en/translation.json';
import tw from './locales/tw/translation.json';

const languages = ['en', 'zh-TW']

const resources = {
    'en': {
        translation: en,
    },
    'zh-TW': {
        translation: tw,
    },
};

export function initI18n(lng) {
    const i18n = i18next.createInstance()

    i18n
        .use(initReactI18next)
        .use(LanguageDetector)
        .init({
            resources,
            lng,
            fallbackLng: 'zh-TW',
            preload: languages,
            defaultNS: 'translation',
            interpolation: { escapeValue: false, }
        })

    return i18n
}
