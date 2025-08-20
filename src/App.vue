<script setup lang="ts">
import Navbar from "./components/navbar.vue";
import Hero from "./views/Hero.vue";
import About from "./views/About.vue";
import Projects from "./views/Projects.vue";
import Skills from "./views/Skills.vue";
import Contact from "./views/Contact.vue";
</script>

<template>
  <header>
    <Navbar />
  </header>
  <main class="content">
    <Hero />
    <About />
    <Projects />
    <Skills />
    <Contact />
  </main>
</template>

<style lang="scss">
@use "@/assets/base.scss" as *;

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}
</style>
