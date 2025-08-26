<template>
  <div
    class="skill-card"
    :title="skill.titleKey"
    tabindex="0"
    @touchstart="setActive(true)"
    @touchend="setActive(false)"
    @mousedown="setActive(true)"
    @mouseup="setActive(false)"
    @mouseleave="setActive(false)"
    @focus="setActive(true)"
    @blur="setActive(false)"
    :class="{ active }">
    <img :src="skill.logo" :alt="skill.titleKey" />
    <div class="skill-overlay">
      <span class="skill-label">{{ skill.titleKey }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Skill {
  id: string;
  logo: string;
  titleKey: string;
}

const { skill } = defineProps<{ skill: Skill }>();
const active = ref(false);

const setActive = (value: boolean) => {
  active.value = value;
};
</script>

<style scoped>
.skill-card {
  position: relative;
  width: 80px;
  height: 80px;
  background: #fffaf6;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease;
  cursor: pointer;
  overflow: hidden;
  border: 1px solid transparent;
}

.skill-card:focus,
.skill-card:hover,
.skill-card.active {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.13);
  border: 1px solid black;
}

/* Image */
.skill-card img {
  width: 100%;
  height: 60px;
  object-fit: contain;
  transition: filter 0.3s ease, opacity 0.3s;
  z-index: 1;
}

/* Overlay */
.skill-overlay {
  position: absolute;
  inset: 0;
  background: rgba(30, 32, 36, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  z-index: 2;
  transition: opacity 0.3s;
}

.skill-card:focus .skill-overlay,
.skill-card:hover .skill-overlay,
.skill-card.active .skill-overlay {
  opacity: 1;
  pointer-events: auto;
}

/* On overlay, le nom apparait au centre */
.skill-label {
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
}

.skill-card:focus img,
.skill-card:hover img,
.skill-card.active img {
  filter: grayscale(1) brightness(0.6);
}
</style>
