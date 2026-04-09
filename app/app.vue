<script setup lang="ts">
import { useThemeStore } from "../stores/theme";

const themeStore = useThemeStore();

onMounted(() => {
  themeStore.initTheme();
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style scoped>
* {
  font-family: "Inter", sans-serif;
}
</style>
