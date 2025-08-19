<script setup lang="ts">
import Hero from "./views/Hero.vue";
import Navbar from "./components/Navbar.vue";
import About from "./views/About.vue";
</script>

<template>
  <Navbar />

  <Hero />

  <About />
</template>

<style lang="scss">
@use "@/assets/base.scss" as *;
</style>
