<template>
  <section class="skills" id="skills">
    <h2>{{ t("skills.title") }}</h2>
    <div class="container">
      <!-- générer une 'carte' par compétence, avec le logo et un petit effet de
      hover => boucler sur la liste des compétences + SkillCard -->
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>
