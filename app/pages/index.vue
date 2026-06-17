<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ref, onMounted, onUnmounted } from "vue";

gsap.registerPlugin(ScrollTrigger);

const isHeroReadyToStart = ref<boolean>(false);

onMounted(() => {
  const ctx = gsap.context(() => {
    gsap.from(".skills-heading", {
      scrollTrigger: { trigger: ".skills-section", start: "top 80%" },
      opacity: 0,
      y: 40,
      duration: 0.7,
      ease: "power3.out",
    });
    gsap.from(".skill-card", {
      scrollTrigger: { trigger: ".skills-grid", start: "top 80%" },
      opacity: 0,
      y: 60,
      duration: 0.7,
      stagger: 0.15,
      ease: "power3.out",
    });
    gsap
      .from(".cta-box", {
        scrollTrigger: { trigger: ".cta-section", start: "top 85%" },
        opacity: 0,
        y: 50,
        scale: 0.97,
        duration: 0.8,
        ease: "power3.out",
      })
      .then(() => {
        isHeroReadyToStart.value = true;
      });
  });

  onUnmounted(() => ctx.revert());
});
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
