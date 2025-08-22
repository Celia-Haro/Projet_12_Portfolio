<template>
  <section class="skills" id="skills">
    <h2>{{ t("skills.title") }}</h2>
    <div class="skills-container">
      <div class="skills-grid">
        <SkillCard v-for="skill in skillsData" :key="skill.id" :skill="skill" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import SkillCard from "@/components/SkillCard.vue";
import skillsDataRaw from "@/assets/data/skills.json";

interface Skill {
  id: string;
  logo: string;
  titleKey: string;
}

const skillsData: Skill[] = skillsDataRaw;
const { t } = useI18n();
</script>

<style scoped lang="scss">
@use "@/assets/base.scss" as *;

.skills {
  padding: 6rem 0;
  width: 100%;
  text-align: center;
}

.skills h2 {
  font-size: 2rem;
  margin-bottom: 5rem;
  font-weight: 700;
}

.skills-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 2rem;
  justify-items: center;

  @include tablet {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }

  @include desktop {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 2.5rem;
  }
}

.skills-grid :deep(.skill-card) {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);

  &:hover {
    transform: translateY(-8px) scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
}
</style>
