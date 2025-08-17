import { createI18n } from 'vue-i18n'
import fr from '@/locales/fr.json'
import en from '@/locales/en.json'

const i18n = createI18n({
    legacy: false, // mode Composition API
    locale: 'fr',  // langue par défaut
    fallbackLocale: 'en',
    messages: {
        fr,
        en
    }
})

export default i18n
