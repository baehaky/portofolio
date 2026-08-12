<script setup lang="ts">
import gsap from "gsap";
import { onMounted, onUnmounted, ref } from "vue";

const emit = defineEmits(["readyToStart"]);

const show = ref(true);

onMounted(() => {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const alreadyShown = sessionStorage.getItem("introShown") !== null;

  if (alreadyShown || prefersReduced) {
    show.value = false;
    emit("readyToStart");
    return;
  }

  sessionStorage.setItem("introShown", "1");

  const ctx = gsap.context(() => {
    const tl = gsap.timeline();

    tl.from(".hello-text", {
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      ease: "power2.out",
    })
      .to({}, { duration: 0.4 })
      .to(
        ".hello-text",
        {
          opacity: 0,
          scale: 1.05,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "-=0.1",
      )
      .to(
        ".intro-overlay",
        {
          yPercent: -100,
          duration: 0.7,
          ease: "power4.inOut",
        },
        "<0.1",
      )
      .call(
        () => {
          show.value = false;
          emit("readyToStart");
        },
        [],
        "-=0.4",
      );
  });

  onUnmounted(() => ctx.revert());
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="intro-overlay fixed inset-0 z-[9999] bg-black flex items-center justify-center pointer-events-none"
    >
      <h1
        class="hello-text text-white text-5xl md:text-7xl font-medium tracking-tight font-sans"
      >
        Welcome
      </h1>
    </div>
  </Teleport>
</template>
