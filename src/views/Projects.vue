<template>
  <section>
    <h2>{{ t("projects.title") }}</h2>
    <div class="container">
      <!-- générer un composant ProjectCard par projet ouverture d'une modale ??
      ou pas ? -->
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>
