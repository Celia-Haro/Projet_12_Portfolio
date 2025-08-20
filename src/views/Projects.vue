<template>
  <section class="projects" id="projects">
    <h2>{{ t("projects.title") }}</h2>
    <div class="container">
      <!-- <ProjectCard /> -->
    </div>
  </section>
</template>

<script setup lang="ts">
// import ProjectCard from "@/components/ProjectCard.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>
