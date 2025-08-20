<template>
  <section class="projects" id="projects">
    <h2>{{ t("projects.title") }}</h2>

    <!-- Filtres par catégorie -->
    <div class="filter-buttons">
      <button
        @click="setFilter('all')"
        :class="{ active: activeFilter === 'all' }"
        class="filter-btn">
        Tous
      </button>
      <button
        @click="setFilter('training')"
        :class="{ active: activeFilter === 'training' }"
        class="filter-btn">
        Formation
      </button>
      <button
        @click="setFilter('apprenticeship')"
        :class="{ active: activeFilter === 'apprenticeship' }"
        class="filter-btn">
        Alternance
      </button>
    </div>

    <div class="container masonry">
      <ProjectCard
        v-for="project in filteredProjects"
        :key="project.id"
        :project="adaptedProject(project)" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import ProjectCard from "@/components/ProjectCard.vue";
import projectsData from "@/assets/data/projects.json";

// Interfaces
interface ProjectCardProps {
  id: string;
  image: string;
  logo: string;
  category: string;
  stack: string;
  titleKey: string;
  descriptionKey: string;
  links: { label: string; url: string }[];
}

interface ProjectData {
  id: string;
  logo?: string;
  image?: string;
  category: string;
  stack: string;
  titleKey: string;
  descriptionKey: string;
  linkCode?: string;
  linkDemo?: string;
}

const { t } = useI18n();

// Filtre actif
const activeFilter = ref<"all" | "training" | "apprenticeship">("all");

const setFilter = (filter: "all" | "training" | "apprenticeship") => {
  activeFilter.value = filter;
};

const filteredProjects = computed(() => {
  if (activeFilter.value === "all") {
    return projectsData;
  }
  return projectsData.filter(
    (project) => project.category === activeFilter.value
  );
});

const adaptedProject = (project: ProjectData): ProjectCardProps => {
  const links: { label: string; url: string }[] = [];
  if (project.linkCode) links.push({ label: "Code", url: project.linkCode });
  if (project.linkDemo) links.push({ label: "Demo", url: project.linkDemo });
  return {
    id: project.id,
    image: project.image || project.logo || "",
    logo: project.logo || "",
    category: project.category,
    stack: project.stack,
    titleKey: project.titleKey,
    descriptionKey: project.descriptionKey,
    links,
  };
};
</script>

<style scoped>
.projects {
  padding: 4rem 0;
}

.projects h2 {
  text-align: center;
  margin-bottom: 2rem;
}

.filter-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}
.filter-btn {
  padding: 0.5rem 1rem;
  border: 2px solid var(--accent-color);
  background: transparent;
  color: var(--main-color);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}
.filter-btn:hover,
.filter-btn.active {
  color: var(--accent-color);
}

/* Masonry layout avec fallback CSS column-count */
.container.masonry {
  column-count: 3;
  column-gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
@media (max-width: 1000px) {
  .container.masonry {
    column-count: 2;
  }
}
@media (max-width: 680px) {
  .container.masonry {
    column-count: 1;
  }
}
</style>
