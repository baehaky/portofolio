<script setup lang="ts">
import gsap from "gsap";
import { onMounted, onUnmounted, watch } from "vue";

const props = defineProps<{ startAnimation: boolean }>();

let ctx: gsap.Context;
let heroTl: GSAPTimeline;

onMounted(() => {
  ctx = gsap.context(() => {
    heroTl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });

    heroTl
      .from(".status-pill", { opacity: 0, y: 16, duration: 0.5 })
      .from(".hero-eyebrow", { opacity: 0, y: 12, duration: 0.4 }, "-=0.2")
      .from(".hero-name", { opacity: 0, y: 32, duration: 0.6 }, "-=0.2")
      .from(".hero-role", { opacity: 0, y: 32, duration: 0.6 }, "-=0.4")
      .from(".hero-tags", { opacity: 0, y: 16, duration: 0.5 }, "-=0.3")
      .from(".hero-desc", { opacity: 0, y: 20, duration: 0.5 }, "-=0.3")
      .from(".hero-buttons", { opacity: 0, y: 16, duration: 0.4 }, "-=0.2")
      .from(
        ".stat-item",
        { opacity: 0, y: 12, stagger: 0.1, duration: 0.4 },
        "-=0.2",
      )
      .from(
        ".bg-blob",
        {
          opacity: 0,
          scale: 0.6,
          stagger: 0.15,
          duration: 1.2,
          ease: "power2.out",
        },
        0,
      );

    // Continuous blob float
    gsap.to(".bg-blob-1", {
      y: -28,
      x: 10,
      scale: 1.15,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    gsap.to(".bg-blob-2", {
      y: 22,
      x: -14,
      scale: 1.2,
      duration: 5.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1,
    });
    gsap.to(".bg-blob-3", {
      y: -16,
      x: 8,
      scale: 1.3,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 2,
    });

    // Status dot pulse
    gsap.to(".status-dot", {
      scale: 1.3,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });
});

watch(
  () => props.startAnimation,
  (val) => {
    if (val && heroTl) heroTl.play();
  },
);

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>

<template>
  <div
    class="relative w-full min-h-screen flex items-center overflow-x-hidden overflow-y-hidden bg-slate-50 dark:bg-[#06060a] transition-colors duration-500"
  >
    <div
      class="relative z-10 container mx-auto px-6 sm:px-10 lg:px-20 py-28 md:py-36"
    >
      <div class="max-w-3xl">
        <div
          class="status-pill inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-10 border border-black/10 dark:border-white/10 bg-white/50 dark:bg-transparent backdrop-blur-sm"
        >
          <span
            class="status-dot w-2 h-2 rounded-full bg-red-500 dark:bg-red-400 shrink-0"
            style="box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.2)"
          />
          <span
            class="text-[12px] text-neutral-600 dark:text-white/40 tracking-wide"
          >
            <span class="font-semibold text-neutral-800 dark:text-white/70"
              >Not</span
            >
            Available for work
          </span>
        </div>

        <p
          class="hero-eyebrow text-[11px] tracking-[0.2em] uppercase text-neutral-500 dark:text-white/25 font-semibold mb-5"
        >
          Full Stack Developer &amp; AI Enthusiast
        </p>

        <h1
          class="hero-name text-5xl md:text-6xl lg:text-7xl font-extrabold text-neutral-900 dark:text-white mb-3 leading-[1.05]"
          style="letter-spacing: -2px"
        >
          Muhamad Baehaky
        </h1>

        <h2
          class="hero-role text-5xl md:text-6xl lg:text-7xl pb-2 font-extrabold mb-6 leading-[1.05] bg-clip-text text-transparent"
          style="
            letter-spacing: -3px;
            background-image: linear-gradient(
              135deg,
              #6366f1 0%,
              #8b5cf6 50%,
              #a78bfa 100%
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          "
        >
          Crafting the Web.
        </h2>

        <div class="hero-tags flex flex-wrap gap-2 mb-8">
          <span
            v-for="tag in [
              'Vue · Nuxt',
              'Node · Bun',
              'TypeScript',
              'React',
              'Python',
            ]"
            :key="tag"
            class="text-[11px] px-3 py-1 tracking-wide rounded-md border border-black/10 dark:border-white/10 text-neutral-600 dark:text-white/40 bg-white/50 dark:bg-transparent backdrop-blur-sm"
          >
            {{ tag }}
          </span>
        </div>

        <p
          class="hero-desc text-[15px] text-neutral-600 dark:text-white/50 leading-[1.8] max-w-lg mb-10 font-normal"
        >
          Building fast, accessible, and impactful digital experiences — from
          pixel-perfect interfaces to scalable backend systems.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-grid-pattern {
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 64px 64px;
}

.dark .bg-grid-pattern {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.018) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.018) 1px, transparent 1px);
}

.bg-blob-glow {
  background: radial-gradient(
    circle,
    rgba(59, 130, 246, 0.15) 0%,
    transparent 70%
  );
}

.dark .bg-blob-glow {
  background: radial-gradient(
    circle,
    rgba(59, 130, 246, 0.06) 0%,
    transparent 70%
  );
}
</style>
