<template>
  <div class="project-card">
    <img
      :src="project.image"
      :alt="t(project.titleKey)"
      class="project-image" />
    <h3 class="project-title">{{ t(project.titleKey) }}</h3>
    <div class="tags">
      <span v-for="tech in stackArray" :key="tech" class="tag">{{ tech }}</span>
    </div>
    <p class="project-description">{{ t(project.descriptionKey) }}</p>
    <div v-if="project.links.length" class="project-links">
      <a
        v-for="link in project.links"
        :key="link.url"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer">
        > {{ link.label }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

interface Project {
  id: string;
  image: string;
  category: string;
  stack: string;
  titleKey: string;
  descriptionKey: string;
  links: { label: string; url: string }[];
}

const props = defineProps<{ project: Project }>();
const { t } = useI18n();
const stackArray = props.project.stack.split(",").map((s) => s.trim());
</script>

<style scoped lang="scss">
@use "@/assets/base.scss" as *;

.project-card {
  background: var(--card-bg);
  border-radius: 1rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.13);
  overflow: hidden;
  transition: box-shadow 0.2s, transform 0.2s, background 0.4s;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  break-inside: avoid;
}

.project-card:hover {
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18);
  transform: translateY(-5px) scale(1.03);
  background: var(--card-bg-hover);
}

.project-image {
  width: 100%;
  height: 175px;
  object-fit: cover;
  display: block;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

.project-title {
  margin: 1rem 1rem 0 1rem;
  font-size: 1.3rem;
  font-weight: bold;
  color: var(--main-color);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.7rem 1rem 0.8rem 1rem;
}
.tag {
  background: transparent;
  color: var(--main-color);
  border: 1px solid var(--main-color);
  border-radius: 1rem;
  padding: 0.2rem 0.8rem;
  font-size: 0.82rem;
  font-weight: 600;
}

.project-description {
  margin: 0.5rem 1rem 0.5rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  min-height: 62px;
}

.project-links {
  margin: 0.8rem 1rem 1rem 1rem;
  display: flex;
  gap: 0.8rem;
}
.project-links a {
  padding: 0.4rem 1.1rem;
  border-radius: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s, transform 0.15s;
}
.project-links a:hover {
  background: linear-gradient(90deg, #22d3ee 0%, #1a82f7 100%);
  transform: scale(1.08);
}
</style>
