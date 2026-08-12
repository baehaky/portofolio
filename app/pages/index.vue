<script setup lang="ts">
import { ref } from "vue";

const isHeroReadyToStart = ref<boolean>(false);
</script>

<template>
  <section id="home" class="min-h-screen relative">
    <IntroOverlay @ready-to-start="isHeroReadyToStart = true" />

    <div
      class="sticky top-0 h-screen w-full z-0 flex items-center justify-center overflow-hidden"
    >
      <HeroSection :start-animation="isHeroReadyToStart" />
    </div>

    <div class="overflow-hidden">
      <SkillsSection id="skills" />
    </div>

    <ContactSection id="contact" />
  </section>
</template>

<style scoped>
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(200%);
  }
}
.animate-shimmer {
  animation: shimmer 3.5s ease-in-out infinite;
}
</style>
