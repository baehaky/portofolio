<script setup lang="ts">
const { data: clientInfo } = await useFetch("/api/client-info");
</script>

<template>
  <div v-if="clientInfo">
    <p>IP: {{ clientInfo.ip }}</p>
    <p>Lokasi: {{ clientInfo.city }}, {{ clientInfo.country }}</p>
    <p>Device: {{ clientInfo.device }}</p>
  </div>
</template>
