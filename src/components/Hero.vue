<template>
  <section>
    <h1>{{ t('hero.name') }}</h1>
    <h2>{{ t('hero.role') }}</h2>
    <p>{{ t('hero.location') }}</p>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
