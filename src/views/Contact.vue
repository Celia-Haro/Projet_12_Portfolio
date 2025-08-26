<template>
  <section class="contact-section" id="contact">
    <h2>{{ t("contact.title") }}</h2>
    <p class="contact-accroche">{{ t("contact.accroche") }}</p>

    <div class="contact-buttons">
      <a
        :href="`mailto:${email}`"
        class="contact-btn"
        target="_blank"
        rel="noopener">
        <img
          src="/src/assets/img/menu/Iconmail.png"
          alt="Email Icon"
          width="32px" />
        Email
      </a>
      <a :href="githubUrl" class="contact-btn" target="_blank" rel="noopener">
        <img
          src="/src/assets/img/skills/github.webp"
          alt="Github Icon"
          width="32px" />
        GitHub
      </a>
      <a :href="linkedinUrl" class="contact-btn" target="_blank" rel="noopener">
        <img
          src="/src/assets/img/menu/IconLinkedin.svg"
          alt="Linkedin Icon"
          width="32px" />
        LinkedIn
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const email = "haro.celia@hotmail.fr";
const githubUrl = "https://github.com/Celia-Haro";
const linkedinUrl = "https://www.linkedin.com/in/célia-haro-279641365/";
</script>

<style scoped>
.contact-section {
  padding: 4rem 0;
  background: var(--bg-color);
  text-align: center;
  font-family: var(--font-family-main);
}

.contact-section h2 {
  font-family: var(--font-family-title);
  font-size: 2.5rem;
  color: var(--main-color);
  margin-bottom: 1rem;
}

.contact-accroche {
  font-size: 1.2rem;
  color: var(--main-color);
  margin-bottom: 2rem;
}

.contact-buttons {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.contact-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  background-color: var(--card-bg);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.contact-btn:hover {
  background-color: var(--accent-color);
  transform: translateY(-3px);
}
</style>
