import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import es from '../locales/es/translation.json'
import en from '../locales/en/translation.json'

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            es: { translation: es },
            en: { translation: en }
        },
        fallbackLng: 'es',
        supportedLngs: ['es', 'en'],
        load: 'languageOnly',
        detection: {
            // 👇 Ajustes del detector
            order: ['localStorage', 'cookie', 'navigator', 'htmlTag'],
            caches: ['localStorage', 'cookie'],
            lookupLocalStorage: 'i18nextLng',
            lookupCookie: 'i18next',
            checkWhitelist: true,
        },
        interpolation: { escapeValue: false },
        // 👇 Fuerza a español en la primera carga si el detector no encuentra nada
        initImmediate: false
    })

    // Si no hay idioma guardado, setea español manualmente
    if (!localStorage.getItem('i18nextLng')) {
    i18n.changeLanguage('es')
    }

export default i18n