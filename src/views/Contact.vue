<template>
  <section class="contact-section" id="contact">
    <div class="text-content">
      <h2>{{ t("contact.title") }}</h2>
      <p class="contact-accroche">
        <em>{{ t("contact.accroche") }}</em>
      </p>
      <p>{{ t("contact.inviteContact") }}</p>
    </div>

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
        <img :src="linkedInIcon" alt="Linkedin Icon" width="32px" />
        LinkedIn
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

import linkedInIcon from "@/assets/img/menu/IconLinkedin.png";

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

.text-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;

  h2 {
    margin-bottom: 3rem;
  }
  .contact-accroche {
    font-size: 1.2rem;
    font-family: var(--font-family-title);
    color: var(--main-color);
  }
}

.contact-buttons {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.contact-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  height: fit-content;
  border-radius: 1rem;
  background: #fffaf6;
  color: #353a47;
  border: 1px solid var(--main-color);
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.contact-btn:hover {
  border-color: var(--accent-color);
  color: var(--accent-color);
  transform: translateY(-3px);
}
</style>
