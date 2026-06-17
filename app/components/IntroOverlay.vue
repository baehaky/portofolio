<script setup lang="ts">
import gsap from "gsap";
import { onMounted, onUnmounted } from "vue";

const emit = defineEmits(["readyToStart"]);

onMounted(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline();

    tl.from(".hello-text", {
      opacity: 0,
      scale: 0.9,
      filter: "blur(5px)",
      duration: 1.5,
      ease: "power2.out",
    })
      .to({}, { duration: 0.8 })
      .to(
        ".hello-text",
        {
          opacity: 0,
          scale: 1.05,
          duration: 0.5,
          ease: "power2.inOut",
        },
        "-=0.2",
      )
      .to(
        ".intro-overlay",
        {
          yPercent: -100,
          duration: 1.2,
          ease: "power4.inOut",
        },
        "<0.2",
      )
      .call(
        () => {
          emit("readyToStart");
        },
        [],
        "-=0.8",
      );
  });

  onUnmounted(() => ctx.revert());
});
</script>

<template>
  <Teleport to="body">
    <div
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
