<script setup lang="ts">
import { useThemeStore } from "../../stores/theme";
import { ref } from "vue";

const isMenuOpen = ref(false);
const themeStore = useThemeStore();

interface navItems {
  name: string;
  path: string;
}

const navItems: navItems[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Portofolio", path: "/portofolio" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];
</script>

<template>
  <nav
    class="border-b bg-white/10 dark:bg-black dark:backdrop-blur-sm backdrop-blur-xl border-gray-200/50 dark:border-gray-800 shadow-sm relative z-50 transition-colors duration-300"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink
          class="flex items-center space-x-2 text-gray-900 dark:text-white group"
          to="/"
        >
          <h1
            class="text-2xl font-bold font-lobster tracking-wide transition-transform duration-500 ease-out group-hover:scale-105"
          >
            Baehaky
          </h1>
        </NuxtLink>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-2 lg:space-x-4">
          <template v-for="(item, index) in navItems" :key="index">
            <NuxtLink
              class="relative px-4 py-2 rounded-md text-sm dark:text-gray-400 transition-all duration-300 ease-out hover:text-black dark:hover:text-white hover:-translate-y-0.5 active:translate-y-0"
              active-class="text-black font-bold dark:text-white bg-gray-200/70 dark:bg-gray-800 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/10  "
              :to="item.path"
            >
              {{ item.name }}
            </NuxtLink>
          </template>
        </div>

        <!-- Actions -->
        <div class="flex items-center space-x-3">
          <button
            @click="themeStore.toggleTheme()"
            class="focus:outline-none bg-gray-100 dark:bg-gray-800 text-gray-600 hover:rotate-12 dark:text-gray-300 flex items-center justify-center py-2 px-2 rounded-md transition-all duration-300 hover:scale-110 hover:text-black dark:hover:text-white active:scale-95 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/10"
            aria-label="Toggle Theme"
          >
            <transition name="fade" mode="out-in">
              <Icon
                v-if="themeStore.isDark"
                name="material-symbols:dark-mode-outline"
                size="20"
                class="transition-transform duration-500"
              />
              <Icon
                v-else
                name="material-symbols:sunny-outline-rounded"
                size="20"
                class="transition-transform duration-300 hover:rotate-90"
              />
            </transition>
          </button>

          <button
            @click="isMenuOpen = !isMenuOpen"
            class="md:hidden focus:outline-none flex items-center justify-center p-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white bg-gray-100 dark:bg-gray-800 rounded-md transition-all duration-300 hover:scale-105 active:scale-95 ring-1 ring-gray-900/5 dark:ring-white/10"
            aria-label="Toggle Menu"
          >
            <Icon
              v-if="isMenuOpen"
              name="material-symbols:close-rounded"
              size="20"
              class="transition-transform duration-300 rotate-90"
            />
            <Icon
              v-else
              name="material-symbols:menu-rounded"
              size="20"
              class="transition-transform duration-500 rotate-90"
            />
          </button>
        </div>
      </div>
    </div>

    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 -translate-y-4 scale-95"
    >
      <div
        v-if="isMenuOpen"
        class="md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-black/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800 shadow-2xl origin-top"
      >
        <div class="px-4 py-6 space-y-2">
          <template v-for="(item, index) in navItems" :key="index">
            <NuxtLink
              @click="isMenuOpen = false"
              class="flex items-center px-4 py-3.5 rounded-2xl text-base font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/80 transition-all duration-300 ease-out hover:pl-6"
              active-class="text-black dark:text-white font-semibold bg-gray-100 dark:bg-gray-800 shadow-sm"
              :to="item.path"
            >
              {{ item.name }}
            </NuxtLink>
          </template>
        </div>
      </div>
    </transition>
  </nav>
</template>

<style scoped>
.font-lobster {
  font-family: "Lobster Two", cursive;
}
</style>
