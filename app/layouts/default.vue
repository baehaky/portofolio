<template>
  <header class="sticky top-0 z-50 text-gray-900 dark:text-white">
    <navigation />
  </header>
  <main
    class="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300"
  >
    <slot />
  </main>
  <Footer />
</template>
