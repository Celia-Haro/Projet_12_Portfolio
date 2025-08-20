<template>
  <h2>{{ t("contact.title") }}</h2>
  <form action=""></form>
  <!-- mettre un formulaire de contact tout simple avec le nom prénom, l'objet,
  l'input texte et un btn submit qui m'envoi un mail -->
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
</script>
