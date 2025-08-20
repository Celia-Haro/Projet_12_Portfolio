<template>
  <section class="about" id="about">
    <h2>{{ t("about.title") }}</h2>
    <p>{{ t("about.text1") }}</p>
    <p>{{ t("about.text2") }}</p>
    <p>{{ t("about.text3") }}</p>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<style scoped lang="scss">
@use "@/assets/base.scss" as *;

.about {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 90%;
  height: 90vh;

  @include tablet {
    width: 80%;
  }

  @include desktop {
    width: 70%;
  }

  h2 {
    margin-bottom: 3rem;
  }
}
</style>
