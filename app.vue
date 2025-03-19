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
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
</style>