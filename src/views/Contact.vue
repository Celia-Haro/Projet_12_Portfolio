<template>
  <section class="contact-section" id="contact">
    <h2>{{ t("contact.title") }}</h2>
    <p>{{ t("contact.accroche") }}</p>

    <form @submit.prevent="handleSubmit" class="contact-form">
      <input
        type="text"
        v-model="fullName"
        :placeholder="t('contact.fullName')"
        required />

      <input
        type="email"
        v-model="email"
        :placeholder="t('contact.email')"
        required />

      <textarea
        v-model="message"
        :placeholder="t('contact.message')"
        rows="5"
        required></textarea>

      <button type="submit" :disabled="!isFormValid">
        {{ t("contact.send") }}
      </button>
    </form>

    <p v-if="successMessage" class="success-message">
      {{ successMessage }}
    </p>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const fullName = ref("");
const email = ref("");
const message = ref("");
const successMessage = ref("");

// Vérification simple : tous les champs doivent être remplis
const isFormValid = computed(
  () =>
    fullName.value.trim() !== "" &&
    email.value.trim() !== "" &&
    message.value.trim() !== ""
);

const handleSubmit = () => {
  if (!isFormValid.value) return;

  // Préparer le mailto
  const subject = encodeURIComponent(
    `${t("contact.subject")} ${fullName.value}`
  );
  const body = encodeURIComponent(
    message.value +
      `\n\n---\n${t("contact.from")}: ${fullName.value} (${email.value})`
  );
  const mailtoLink = `mailto:tonemail@example.com?subject=${subject}&body=${body}`;

  // Ouvrir le client mail
  window.location.href = mailtoLink;

  // Message de confirmation traduit
  successMessage.value = t("contact.success");

  // Reset
  fullName.value = "";
  email.value = "";
  message.value = "";
};
</script>

<style scoped>
.contact-section {
  padding: 4rem 0;
  background: var(--bg-color);
  text-align: center;
  font-family: var(--font-family-main);
  height: 80vh;
}

.contact-section h2 {
  margin-bottom: 4rem;
}

.contact-form {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-form input,
.contact-form textarea {
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 2px solid transparent;
  background: var(--card-bg);
  font-size: 1rem;
  font-family: var(--font-family-main);
  color: var(--main-color);
  transition: border-color 0.3s ease, background 0.3s ease;
}

.contact-form input:focus,
.contact-form textarea:focus {
  outline: none;
  border-color: var(--other-color);
  background: var(--card-bg-hover);
}

.contact-form button {
  background: var(--other-color);
  color: white;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background 0.3s ease;
}

.contact-form button:disabled {
  background: #aaa;
  cursor: not-allowed;
}

.contact-form button:hover:enabled {
  background: var(--accent-color);
}

.success-message {
  margin-top: 1.5rem;
  color: var(--other-color);
  font-weight: bold;
  font-size: 1.1rem;
}
</style>
