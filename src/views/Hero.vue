<template>
  <section class="hero">
    <div class="animation"></div>
    <div class="text-content">
      <h2>{{ t("hero.welcome") }}</h2>
      <h1>{{ t("hero.name") }}</h1>
      <h2>{{ t("hero.role") }}</h2>
      <p>{{ t("hero.location") }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<style scoped lang="scss">
@use "@/assets/base.scss" as *;

.hero {
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  height: 90vh;
  padding: 1rem;
  @include tablet {
    flex-direction: row;
  }

  .animation {
    display: flex;
    @include tablet {
      width: 30%;
    }
    @include desktop {
      width: 40%;
    }
  }
  .text-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    h2 {
      color: var(--main-color);
    }

    @include tablet {
      width: 70%;
    }
    @include desktop {
      width: 60%;
    }
  }
}

//styles mobile : section animation en dessous de text content (  .hero en column-reverse)
// styles tablette : anim et text content en 30 70 de large
// style desktop : 40 anim 60 texte
</style>
