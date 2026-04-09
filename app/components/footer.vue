<script setup lang="ts">
const currentyear: number = new Date().getFullYear();

interface socialMedia {
  url: string;
  icon: string;
  label: string;
}

interface navItems {
  name: string;
  path: string;
}

const socialsMedia: socialMedia[] = [
  { url: "https://github.com/baehaky", icon: "mdi:github", label: "GitHub" },
  {
    url: "https://linkedin.com/in/muhamad-baehaky-86860b214/",
    icon: "mdi:linkedin",
    label: "LinkedIn",
  },
  { url: "mailto:baehaky1504@gmail.com", icon: "mdi:email", label: "Email" },
];

const navItems: navItems[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Portofolio", path: "/portofolio" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];
</script>

<template>
  <footer class="bg-gray-100 dark:bg-gray-900 border-t border-gray-400/40">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="mb-4 font-semibold dark:text-white">Muhamad Baehaky</h3>
          <p class="text-gray-500 dark:text-gray-300">
            Creating beautiful and functional web experiences.
          </p>
        </div>
        <div>
          <h4 class="mb-4 font-semibold dark:text-white">Quick Links</h4>
          <div class="space-y-2 flex flex-col">
            <NuxtLink
              v-for="(item, index) in navItems"
              :key="index"
              class="text-gray-500 dark:text-gray-300 hover:text-black transition-all duration-300"
              :to="item.path"
              >{{ item.name }}</NuxtLink
            >
          </div>
        </div>

        <div>
          <h4 class="mb-4 font-semibold dark:text-white">Connect</h4>
          <div class="space-x-4 flex">
            <a
              v-for="(item, index) in socialsMedia"
              :key="index"
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="item.label"
              class="p-2 rounded-lg dark:bg-gray-400/40 dark:text-gray-300 hover:scale-105 transition-all flex items-center justify-center"
            >
              <Icon :name="item.icon" size="30" />
            </a>
          </div>
        </div>
      </div>
      <div class="mt-8 pt-8 border-t border-gray-400/40 dark:text-gray-300 text-center">
        <p>© {{ currentyear }} Muhamad Baehaky. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
