<script setup lang="ts">
import { useThemeStore } from "~~/stores/theme";
import gsap from "gsap";

const themeStore = useThemeStore();
const isMenuOpen = ref(false);
const navEl = ref<HTMLElement | null>(null);

onMounted(() => {
  gsap.from(navEl.value, {
    y: -60,
    opacity: 0,
    duration: 0.7,
    ease: "power3.out",
    delay: 0.1,
  });

  gsap.from(".nav-link", {
    opacity: 0,
    y: -10,
    stagger: 0.08,
    duration: 0.5,
    ease: "power2.out",
    delay: 0.4,
  });
});

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
  if (isMenuOpen.value) {
    gsap.from(".mobile-link", {
      opacity: 0,
      x: -20,
      stagger: 0.08,
      duration: 0.4,
      ease: "power2.out",
    });
  }
}

function toggleTheme() {
  gsap.to(".theme-icon", {
    scale: 0,
    rotate: 90,
    duration: 0.2,
    ease: "power2.in",
    onComplete: () => {
      themeStore.toggleTheme();
      gsap.fromTo(
        ".theme-icon",
        { scale: 0, rotate: -90 },
        { scale: 1, rotate: 0, duration: 0.3, ease: "back.out(2)" },
      );
    },
  });
}

const links = [
  { label: "Home", target: "home" },
  { label: "Skills", target: "skills" },
  { label: "Contact", target: "contact" },
];

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }

  if (isMenuOpen.value) {
    isMenuOpen.value = false;
  }
}
</script>

<template>
  <nav
    ref="navEl"
    class="backdrop-blur-md bg-white/80 dark:bg-black/95 border-b border-gray-200/60 dark:border-gray-800/60 transition-colors duration-300"
  >
    <div class="container mx-auto lg:px-10 sm:px-7 px-4">
      <div class="flex items-center justify-between h-16">
        <NuxtLink
          to="/"
          class="font-bold text-lg tracking-tight bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
        >
          Baehaky
        </NuxtLink>

        <div class="hidden md:flex items-center gap-6">
          <a
            v-for="link in links"
            :key="link.target"
            href="javascript:void(0)"
            @click.prevent="scrollToSection(link.target)"
            class="nav-link cursor-pointer text-sm font-medium transition-colors duration-200 relative group text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            {{ link.label }}
            <span
              class="absolute -bottom-0.5 left-0 h-px bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 w-0 group-hover:w-full"
            />
          </a>
        </div>

        <div class="flex items-center gap-3">
          <button
            @click="toggleTheme"
            class="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            :aria-label="
              themeStore.isDark ? 'Switch to light mode' : 'Switch to dark mode'
            "
          >
            <span class="theme-icon inline-flex">
              <Icon
                :name="
                  themeStore.isDark ? 'mdi:weather-sunny' : 'mdi:weather-night'
                "
                size="22"
              />
            </span>
          </button>

          <button
            @click="toggleMenu"
            class="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <Icon :name="isMenuOpen ? 'mdi:close' : 'mdi:menu'" size="20" />
          </button>
        </div>
      </div>

      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="isMenuOpen" class="md:hidden pb-4 pt-2 flex flex-col gap-1">
          <a
            v-for="link in links"
            :key="link.target"
            href="javascript:void(0)"
            @click.prevent="scrollToSection(link.target)"
            class="nav-link cursor-pointer text-sm font-medium transition-colors duration-200 relative group text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            {{ link.label }}
            <span
              class="absolute -bottom-0.5 left-0 h-px bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 w-0 group-hover:w-full"
            />
          </a>
        </div>
      </Transition>
    </div>
  </nav>
</template>
