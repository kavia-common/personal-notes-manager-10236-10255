<template>
  <div class="container" style="padding: 40px 16px;">
    <h1 style="margin:0 0 8px;">Something went wrong</h1>
    <p class="muted" style="margin:0 0 16px;">{{ error?.message || 'Unknown error' }}</p>
    <NuxtLink class="btn btn-primary" to="/">Go back home</NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  error: any
}>()
</script>
