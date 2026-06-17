<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const el = ref<HTMLElement | null>(null);

onMounted(() => {
  gsap.from(el.value, {
    opacity: 0,
    y: 10,
    duration: 0.5,
    ease: "power2.out",
    clearProps: "all",
  });
});
</script>

<template>
  <header class="sticky top-0 z-50 text-gray-900 dark:text-white">
    <navigation />
  </header>
  <main
    ref="el"
    class="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300"
  >
    <slot />
  </main>
  <Footer />
</template>
