<script setup lang="ts"></script>

<template>
  <NuxtLayout name="default">
    <section class="min-h-screen dark:bg-black flex items-center justify-center px-4">
      <div class="text-center">
        <h1 class="text-9xl font-medium mb-4 dark:text-white">404</h1>
        <p class="text-3xl mb-4 font-bold dark:text-white">Page not found</p>
        <p class="mb-8 text-gray-500">
          Sorry, the page you are looking for does not exist.
        </p>
        <NuxtLink class="bg-black py-3 px-10 rounded-md dark:bg-white" to="/">
          <button class="text-lg font-semibold text-white dark:text-black">Back to Home</button>
        </NuxtLink>
      </div>
    </section>
  </NuxtLayout>
</template>
