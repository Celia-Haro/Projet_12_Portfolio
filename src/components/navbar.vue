<template>
  <nav class="navbar">
    <div class="logo">{{ t("hero.name") }}</div>

    <!-- Menu desktop complet -->
    <div class="nav-links desktop">
      <a href="">{{ t("about.title") }}</a>
      <a href="">{{ t("projects.title") }}</a>
      <a href="">{{ t("skills.title") }}</a>
      <a href="">{{ t("contact.title") }}</a>

      <button
        v-for="lang in availableLanguages"
        :key="lang"
        @click="changeLanguage(lang)"
        :class="{ active: currentLanguage === lang }">
        {{ lang.toUpperCase() }}
      </button>

      <button
        @click="toggleTheme"
        class="theme-toggle"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
        <component :is="isDark ? IconSun : IconMoon" class="icon" />
      </button>
    </div>

    <!-- Menu tablette : boutons + burger pour les liens -->
    <div class="nav-tablet">
      <!-- Boutons toujours visibles sur tablette -->
      <div class="tablet-buttons">
        <button
          v-for="lang in availableLanguages"
          :key="lang"
          @click="changeLanguage(lang)"
          :class="{ active: currentLanguage === lang }">
          {{ lang.toUpperCase() }}
        </button>

        <button
          @click="toggleTheme"
          class="theme-toggle"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
          <component :is="isDark ? IconSun : IconMoon" class="icon" />
        </button>
      </div>

      <!-- Menu burger pour les liens de navigation -->
      <button
        @click="toggleMobileMenu"
        class="burger-btn"
        :class="{ active: mobileMenuOpen }">
        <component
          :is="IconMenu"
          v-show="!mobileMenuOpen"
          class="icon menu-icon" />
        <component
          :is="IconX"
          v-show="mobileMenuOpen"
          class="icon close-icon" />
      </button>

      <transition name="slide">
        <div v-if="mobileMenuOpen" class="tablet-links">
          <a href="" @click="toggleMobileMenu">{{ t("about.title") }}</a>
          <a href="" @click="toggleMobileMenu">{{ t("projects.title") }}</a>
          <a href="" @click="toggleMobileMenu">{{ t("skills.title") }}</a>
          <a href="" @click="toggleMobileMenu">{{ t("contact.title") }}</a>
        </div>
      </transition>
    </div>

    <!-- Menu mobile : uniquement le burger -->
    <div class="mobile-menu">
      <button
        @click="toggleMobileMenu"
        class="burger-btn"
        :class="{ active: mobileMenuOpen }">
        <component
          :is="IconMenu"
          v-show="!mobileMenuOpen"
          class="icon menu-icon" />
        <component
          :is="IconX"
          v-show="mobileMenuOpen"
          class="icon close-icon" />
      </button>

      <transition name="slide">
        <div v-if="mobileMenuOpen" class="mobile-links">
          <a href="" @click="toggleMobileMenu">{{ t("about.title") }}</a>
          <a href="" @click="toggleMobileMenu">{{ t("projects.title") }}</a>
          <a href="" @click="toggleMobileMenu">{{ t("skills.title") }}</a>
          <a href="" @click="toggleMobileMenu">{{ t("contact.title") }}</a>

          <button
            v-for="lang in availableLanguages"
            :key="lang"
            @click="
              changeLanguage(lang);
              toggleMobileMenu();
            "
            :class="{ active: currentLanguage === lang }">
            {{ lang.toUpperCase() }}
          </button>

          <button @click="toggleTheme" class="theme-toggle">
            <component :is="isDark ? IconSun : IconMoon" class="icon" />
          </button>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";

// Import des SVG comme composants
import IconSun from "@/assets/svg/menu/IconSun.svg";
import IconMoon from "@/assets/svg/menu/IconMoon.svg";
import IconMenu from "@/assets/svg/menu/IconMenu.svg";
import IconX from "@/assets/svg/menu/IconX.svg";

// Gestion de la langue
const { t, locale } = useI18n();
const availableLanguages = ["en", "fr"];
const currentLanguage = ref(locale.value);

function changeLanguage(lang: string) {
  locale.value = lang;
  currentLanguage.value = lang;
}

// Gestion du mode dark / light
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
  const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(prefersDark ? "dark" : "light");
  }
});

// Menu mobile
const mobileMenuOpen = ref(false);
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: var(--navbar-bg);
  position: relative;

  .nav-links,
  .mobile-links,
  .tablet-links {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    button {
      background: none;
      border: none;
      cursor: pointer;
      font-weight: bold;
      padding: 0.25rem 0.5rem;

      &.active {
        text-decoration: underline;
      }
    }

    .theme-toggle .icon {
      width: 24px;
      height: 24px;
      fill: currentColor;
      transition: transform 0.2s ease;
    }
  }

  /* Menu desktop complet (>1024px) */
  .desktop {
    @media (max-width: 1024px) {
      display: none;
    }
  }

  /* Menu tablette : boutons + burger (769px à 1024px) */
  .nav-tablet {
    display: none;

    @media (min-width: 769px) and (max-width: 1024px) {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-direction: column;
      align-items: flex-end;

      .tablet-buttons {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        button {
          background: none;
          border: none;
          cursor: pointer;
          font-weight: bold;
          padding: 0.25rem 0.5rem;

          &.active {
            text-decoration: underline;
          }
        }

        .theme-toggle .icon {
          width: 24px;
          height: 24px;
          fill: currentColor;
          transition: transform 0.2s ease;
        }
      }

      .burger-btn {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.25rem;
        position: relative;
        width: 28px;
        height: 28px;
        transition: transform 0.2s ease;

        .icon {
          text-align: center;
          fill: currentColor;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .menu-icon {
          opacity: 1;
          transform: translateY(0);
        }

        .close-icon {
          opacity: 0;
          transform: translateY(-5px);
        }

        &.active {
          .menu-icon {
            opacity: 0;
            transform: translateY(5px);
          }
          .close-icon {
            opacity: 1;
            transform: translateY(0);
          }
        }
      }

      .tablet-links {
        display: flex;
        flex-direction: column;
        background-color: var(--navbar-bg);
        position: absolute;
        top: 100%;
        right: 0;
        padding: 1rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        gap: 0.5rem;
        min-width: 200px;

        a {
          padding: 0.5rem;
          text-decoration: none;
          border-radius: 4px;
          transition: background-color 0.2s ease;

          &:hover {
            background-color: var(--hover-bg, rgba(0, 0, 0, 0.1));
          }
        }
      }
    }
  }

  /* Menu mobile uniquement burger (≤768px) */
  .mobile-menu {
    display: none;

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      .burger-btn {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.25rem;
        position: relative;
        width: 28px;
        height: 28px;
        transition: transform 0.2s ease;

        .icon {
          text-align: center;
          fill: currentColor;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .menu-icon {
          opacity: 1;
          transform: translateY(0);
        }

        .close-icon {
          opacity: 0;
          transform: translateY(-5px);
        }

        &.active {
          .menu-icon {
            opacity: 0;
            transform: translateY(5px);
          }
          .close-icon {
            opacity: 1;
            transform: translateY(0);
          }
        }
      }

      .mobile-links {
        display: flex;
        flex-direction: column;
        background-color: var(--navbar-bg);
        position: absolute;
        top: 100%;
        right: 0;
        padding: 1rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        gap: 0.5rem;
        min-width: 200px;

        a {
          padding: 0.5rem;
          text-decoration: none;
          border-radius: 4px;
          transition: background-color 0.2s ease;

          &:hover {
            background-color: var(--hover-bg, rgba(0, 0, 0, 0.1));
          }
        }

        button {
          margin: 0.25rem 0;
        }
      }
    }
  }
}

/* Transition slide pour menus déroulants */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
