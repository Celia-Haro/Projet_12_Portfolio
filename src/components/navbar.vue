<template>
  <nav class="navbar">
    <div class="logo">{{ t("hero.name") }}</div>
    <div class="nav-links">
      <button
        v-for="lang in availableLanguages"
        :key="lang"
        @click="changeLanguage(lang)"
        :class="{ active: currentLanguage === lang }">
        {{ lang.toUpperCase() }}
      </button>

      <button @click="toggleTheme" class="theme-toggle">
        {{ isDark ? "☀️" : "🌙" }}
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

// Les langues disponibles
const availableLanguages = ["en", "fr"];

// Etat local pour savoir quelle langue est active
const currentLanguage = ref(locale.value);

// Fonction pour changer la langue
function changeLanguage(lang: string) {
  locale.value = lang;
  currentLanguage.value = lang;
}

const isDark = ref(false);

const setTheme = (theme: "light" | "dark" | "auto") => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  isDark.value = theme === "dark";
};

const toggleTheme = () => {
  const newTheme = isDark.value ? "light" : "dark";
  setTheme(newTheme);
};

onMounted(() => {
  // Récupérer le thème sauvegardé ou utiliser auto
  const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;

  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    // Détecter la préférence système
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(prefersDark ? "dark" : "light");
  }
});
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
