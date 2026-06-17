<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ref, onMounted, onUnmounted } from "vue";
import { skills, technologies } from "~/types/skills";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref<HTMLElement | null>(null);
const techPanelRef = ref<HTMLElement | null>(null);
const skillPanelRef = ref<HTMLElement | null>(null);

onMounted(() => {
  const ctx = gsap.context(() => {
    const techPanel = techPanelRef.value;
    const skillPanel = skillPanelRef.value;
    if (!techPanel || !skillPanel) return;

    gsap.set(techPanel, { xPercent: 100 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
      },
    });

    tl.to({}, { duration: 0.4 });
    tl.to(techPanel, { xPercent: 0, ease: "power2.inOut", duration: 0.4 }, ">");

    // PERBAIKAN: Gunakan fromTo agar opacity terjamin kembali ke 1
    tl.fromTo(
      techPanel.querySelectorAll(".skill-chip"),
      {
        opacity: 0,
        x: 24,
      },
      {
        opacity: 1,
        x: 0,
        stagger: 0.04,
        duration: 0.3,
        ease: "power2.out",
      },
      "<0.15",
    );
    tl.to({}, { duration: 0.6 });
  }, sectionRef.value!);

  onUnmounted(() => ctx.revert());
});
</script>

<template>
  <section
    ref="sectionRef"
    class="relative overflow-hidden bg-white dark:bg-[#0a0a0f] text-neutral-900 dark:text-white"
  >
    <div class="relative h-screen overflow-hidden">
      <div
        ref="skillPanelRef"
        class="absolute inset-0 z-[1] flex flex-col justify-center px-8 md:px-20 py-16 bg-white dark:bg-[#0a0a0f]"
      >
        <p
          class="text-[11px] tracking-[0.18em] uppercase font-medium text-neutral-400 dark:text-neutral-600"
        >
          Skills I use
        </p>

        <div class="flex flex-wrap gap-3 mt-8 max-w-2xl">
          <div
            v-for="(item, i) in skills"
            :key="'skill-' + i"
            class="skill-chip flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-[13px] font-medium cursor-default bg-neutral-100 dark:bg-[#111118] text-neutral-600 dark:text-neutral-500 border border-neutral-200 dark:border-[#1e1e2e] hover:text-neutral-900 dark:hover:text-neutral-200 hover:border-neutral-400 dark:hover:border-[#2e2e42] hover:-translate-y-0.5 transition-all duration-200"
          >
            <span class="w-1.5 h-1.5 rounded-full shrink-0 bg-[#5b5bd6]" />
            <Icon
              :name="item.icon"
              size="22"
              class="opacity-70 group-hover:opacity-100 transition-opacity"
            />
            <span>{{ item.title }}</span>
          </div>
        </div>

        <span
          class="absolute bottom-6 right-8 text-7xl md:text-[7rem] font-black select-none pointer-events-none text-neutral-100 dark:text-gray-900"
          style="letter-spacing: -4px; line-height: 1"
        >
          {{ String(skills.length).padStart(2, "0") }}
        </span>
      </div>

      <!-- Panel 2: Technologies -->
      <div
        ref="techPanelRef"
        class="absolute inset-0 z-[2] flex flex-col justify-center px-8 md:px-20 py-16 bg-neutral-50 dark:bg-[#0d0d14] border-l border-neutral-200 dark:border-[#1e1e2e]"
      >
        <div class="flex items-center gap-3">
          <p
            class="text-[11px] tracking-[0.18em] uppercase font-medium text-neutral-400 dark:text-neutral-600"
          >
            Technologies
          </p>
          <span
            class="text-[10px] px-2 py-0.5 rounded-full font-medium tracking-wide bg-neutral-100 dark:bg-[#13131e] text-neutral-400 dark:text-neutral-600 border border-neutral-200 dark:border-[#1e1e2e]"
          >
            {{ technologies.length }} tools
          </span>
        </div>

        <div class="flex flex-wrap gap-3 mt-8 max-w-2xl">
          <div
            v-for="(item, i) in technologies"
            :key="'tech-' + i"
            class="skill-chip flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-[13px] font-medium cursor-default bg-neutral-100 dark:bg-[#111118] text-neutral-600 dark:text-neutral-500 border border-neutral-200 dark:border-[#1e1e2e] hover:text-neutral-900 dark:hover:text-neutral-200 hover:border-neutral-400 dark:hover:border-[#2e2e42] hover:-translate-y-0.5 transition-all duration-200"
          >
            <span class="w-1.5 h-1.5 rounded-full shrink-0 bg-[#1d9e75]" />
            <Icon
              :name="item.icon"
              size="22"
              class="opacity-70 transition-opacity"
            />
            <span>{{ item.title }}</span>
          </div>
        </div>

        <span
          class="absolute bottom-6 right-8 text-7xl md:text-[7rem] font-black select-none pointer-events-none text-neutral-100 dark:text-gray-900"
          style="letter-spacing: -4px; line-height: 1"
        >
          {{ String(technologies.length).padStart(2, "0") }}
        </span>
      </div>

      <!-- Scroll hint -->
      <div
        class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-neutral-300 dark:text-neutral-700 pointer-events-none select-none"
      >
        <span class="text-[10px] tracking-widest uppercase">scroll</span>
        <span class="scroll-caret" />
      </div>
    </div>

    <div
      class="border-t border-b overflow-hidden py-2 border-neutral-200 dark:border-[#111] bg-neutral-50 dark:bg-[#050508]"
    >
      <div class="marquee-inner flex whitespace-nowrap">
        <span
          v-for="n in 4"
          :key="n"
          class="text-[5rem] md:text-[8rem] leading-none font-black italic uppercase px-6 tracking-tighter shrink-0 text-neutral-200 text dark:text-slate-800"
          style="-webkit-text-stroke: 1px"
          :style="{
            WebkitTextStrokeColor: 'var(--marquee-stroke)',
          }"
          :aria-hidden="n > 1 ? 'true' : undefined"
        >
          WEB &bull; DEVELOPER &bull;
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scroll-caret {
  display: block;
  width: 1px;
  height: 32px;
  background: linear-gradient(to bottom, currentColor, transparent);
  animation: caretPulse 1.6s ease-in-out infinite;
}

@keyframes caretPulse {
  0%,
  100% {
    opacity: 0.2;
    transform: scaleY(0.6);
  }
  50% {
    opacity: 0.6;
    transform: scaleY(1);
  }
}

.marquee-inner {
  animation: marquee 15s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

:root {
  --marquee-stroke: theme("colors.neutral.200");
}
.dark {
  --marquee-stroke: #1e1e2e;
}

@media (prefers-reduced-motion: reduce) {
  .marquee-inner {
    animation: none;
  }
  .scroll-caret {
    animation: none;
  }
}
</style>
