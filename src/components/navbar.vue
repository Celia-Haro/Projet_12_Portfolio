<template>
  <nav class="navbar" role="navigation" aria-label="Navigation principale">
    <a class="logo" href="#" @click.prevent="smoothScrollTo('#top')">
      {{ t("navigation.logo") }}
    </a>

    <!-- Menu desktop -->
    <div class="nav-links desktop">
      <template v-for="link in navigationLinks" :key="link.href">
        <a :href="link.href" @click.prevent="smoothScrollTo(link.href)">
          {{ t(link.labelKey) }}
        </a>
      </template>

      <div class="action-buttons">
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
          :aria-label="themeToggleLabel">
          <component :is="themeIcon" class="icon" />
        </button>
      </div>
    </div>

    <!-- Menu tablette : boutons + burger -->
    <div class="nav-tablet">
      <div class="tablet-buttons action-buttons">
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
          :aria-label="themeToggleLabel">
          <component :is="themeIcon" class="icon" />
        </button>
      </div>

      <button
        @click.stop="toggleMobileMenu($event)"
        class="burger-btn"
        :class="{ active: mobileMenuOpen }"
        :aria-expanded="mobileMenuOpen"
        aria-haspopup="true"
        aria-controls="tablet-menu"
        aria-label="Menu principal">
        <component :is="menuIcon" class="icon" />
      </button>

      <transition name="slide">
        <div
          v-show="mobileMenuOpen"
          id="tablet-menu"
          class="dropdown-menu"
          role="menu">
          <template v-for="link in navigationLinks" :key="link.href">
            <a
              :href="link.href"
              @click.prevent="smoothScrollTo(link.href)"
              role="menuitem"
              tabindex="0">
              {{ t(link.labelKey) }}
            </a>
          </template>
        </div>
      </transition>
    </div>

    <!-- Menu mobile : uniquement le burger -->
    <div class="mobile-menu">
      <button
        @click.stop="toggleMobileMenu($event)"
        class="burger-btn"
        :class="{ active: mobileMenuOpen }"
        :aria-expanded="mobileMenuOpen"
        aria-haspopup="true"
        aria-controls="mobile-menu"
        aria-label="Menu principal">
        <component :is="menuIcon" class="icon" />
      </button>

      <transition name="slide">
        <div
          v-show="mobileMenuOpen"
          id="mobile-menu"
          class="dropdown-menu"
          role="menu">
          <template v-for="link in navigationLinks" :key="link.href">
            <a
              :href="link.href"
              @click.prevent="smoothScrollTo(link.href)"
              role="menuitem"
              tabindex="0">
              {{ t(link.labelKey) }}
            </a>
          </template>

          <div class="mobile-actions">
            <button
              v-for="lang in availableLanguages"
              :key="lang"
              @click="handleMobileLanguageChange(lang)"
              :class="{ active: currentLanguage === lang }">
              {{ lang.toUpperCase() }}
            </button>

            <button
              @click="toggleTheme"
              class="theme-toggle"
              aria-label="Basculer le thème">
              <component :is="themeIcon" class="icon" />
            </button>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted, nextTick } from "vue";
import { useI18n } from "vue-i18n";

// Icônes SVG
import IconSun from "@/assets/svg/menu/IconSun.svg";
import IconMoon from "@/assets/svg/menu/IconMoon.svg";
import IconMenu from "@/assets/svg/menu/IconMenu.svg";
import IconX from "@/assets/svg/menu/IconX.svg";

const { t, locale } = useI18n();
const availableLanguages = ["en", "fr"] as const;
type Language = (typeof availableLanguages)[number];

const navigationLinks = [
  { href: "#about", labelKey: "about.title" },
  { href: "#projects", labelKey: "projects.title" },
  { href: "#skills", labelKey: "skills.title" },
  { href: "#contact", labelKey: "contact.title" },
] as const;

// État
const currentLanguage = ref<Language>(locale.value as Language);
const isDark = ref(false);
const mobileMenuOpen = ref(false);

// Icônes
const themeIcon = computed(() => (isDark.value ? IconSun : IconMoon));
const menuIcon = computed(() => (mobileMenuOpen.value ? IconX : IconMenu));
const themeToggleLabel = computed(() =>
  isDark.value ? "Passer en mode clair" : "Passer en mode sombre"
);

// Mémorise le dernier bouton burger déclencheur pour rendre le focus à la fermeture
let lastToggler: HTMLButtonElement | null = null;

// Fonctions
const changeLanguage = (lang: Language) => {
  locale.value = lang;
  currentLanguage.value = lang;
};

const setTheme = (theme: "light" | "dark" | "auto") => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  isDark.value = theme === "dark";
};

const toggleTheme = () => {
  const newTheme = isDark.value ? "light" : "dark";
  setTheme(newTheme);
};

const focusFirstVisibleMenuItem = () => {
  const items = Array.from(
    document.querySelectorAll<HTMLAnchorElement>(".dropdown-menu a")
  );
  const firstVisible = items.find((el) => el.offsetParent !== null);
  firstVisible?.focus();
};

const toggleMobileMenu = (e?: MouseEvent) => {
  if (e?.currentTarget instanceof HTMLButtonElement) {
    lastToggler = e.currentTarget;
  }
  mobileMenuOpen.value = !mobileMenuOpen.value;

  if (mobileMenuOpen.value) {
    nextTick(focusFirstVisibleMenuItem);
  } else {
    nextTick(() => lastToggler?.focus());
  }
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
  nextTick(() => lastToggler?.focus());
};

const handleMobileLanguageChange = (lang: Language) => {
  changeLanguage(lang);
  closeMobileMenu();
};

const smoothScrollTo = (targetId: string) => {
  const target = document.querySelector<HTMLElement>(targetId);
  if (target) {
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  } else if (targetId === "#top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  closeMobileMenu();
};

// Fermer le menu en cliquant à l'extérieur
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement;
  if (
    mobileMenuOpen.value &&
    !target.closest(".dropdown-menu") &&
    !target.closest(".burger-btn")
  ) {
    closeMobileMenu();
  }
};

// Escape pour fermer
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Escape" && mobileMenuOpen.value) {
    closeMobileMenu();
  }
};

// Lifecycle
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

  document.addEventListener("click", handleClickOutside);
  document.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  document.removeEventListener("keydown", handleKeyDown);
});
</script>

<style lang="scss" scoped>
@use "@/assets/base.scss" as *;

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  width: 100%;
  height: 10vh;
  z-index: 1000;
  box-sizing: border-box;
  background-color: var(--bg-color);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;

  @include tablet {
    padding: 1rem 1.5rem;
    height: 15vh;
  }

  @include desktop {
    padding: 2rem 1.5rem;
  }

  .logo {
    font-family: var(--font-family-title);
    font-size: 1.5rem;
  }
}

a {
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--hover-bg, rgba(0, 0, 0, 0.1));
  }
}

.action-buttons {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @include desktop {
    gap: 1rem;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-weight: bold;
    padding: 0.25rem 0.5rem;
    transition: all 0.2s ease;

    &.active {
      text-decoration: underline;
    }
  }

  .theme-toggle .icon {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }
}

.dropdown-menu {
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color);
  position: absolute;
  top: 100%;
  right: 0;
  padding: 1rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  gap: 0.5rem;
  min-width: 200px;
  z-index: 1001;
  border: 1px solid var(--border-color, rgba(0, 0, 0, 0.1));

  .mobile-actions {
    @extend .action-buttons;
    flex-direction: column;
    align-items: stretch;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid var(--border-color, rgba(0, 0, 0, 0.1));

    button {
      margin: 0.25rem 0;
    }
  }
}

.desktop {
  display: none;

  @include desktop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }
}

.nav-tablet {
  display: none;

  @include tablet {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  @include desktop {
    display: none;
  }
}

.mobile-menu {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @include tablet {
    display: none;
  }

  @include desktop {
    display: none;
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
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
}

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
