<template>
  <section>
    <h2>{{ t("about.title") }}</h2>
    <p>{{ t("about.text1") }}</p>
    <p>{{ t("about.text2") }}</p>
    <p>{{ t("about.text3") }}</p>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<style scoped lang="scss"></style>
