<template>
  <h1>Dashboard Page</h1>
  <button @click="logout">
    Logout
  </button>
</template>
<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
const authStore = useAuthStore()

definePageMeta({
  layout: 'dashboard'
});

useSeoMeta({
  title: 'Ajimall | Dashboard',
  ogTitle: 'Ajimall | Dashboard',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})

const logout = () => {
  authStore.logout()
}
</script>