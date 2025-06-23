<template>
  <NuxtLayout>
    <NuxtPage />
    <Toast />
  </NuxtLayout>
</template>
<script setup lang="ts">
import Toast from '@/components/Toast.vue'
import { useWishlistStore } from '~/stores/wishlist'
import { useAuthStore } from '~/stores/auth'

const wishlistStore = useWishlistStore()
const authStore = useAuthStore()

// Load wishlist when user is authenticated
watchEffect(async () => {
  if (authStore.isAuthenticated) {
    await wishlistStore.fetchItems()
  }
})
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap');
</style>