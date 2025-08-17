<template>
  <nav class="navbar">
    <div class="logo"> {{ t('hero.name') }}</div>
    <div class="nav-links">
      <button
        v-for="lang in availableLanguages"
        :key="lang"
        @click="changeLanguage(lang)"
        :class="{ active: currentLanguage === lang }"
      >
        {{ lang.toUpperCase() }}
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

// Les langues disponibles
const availableLanguages = ['en', 'fr']

// Etat local pour savoir quelle langue est active
const currentLanguage = ref(locale.value)

// Fonction pour changer la langue
function changeLanguage(lang: string) {
  locale.value = lang
  currentLanguage.value = lang
}
</script>

<style scoped>

</style>
