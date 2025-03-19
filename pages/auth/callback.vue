<!-- pages/auth/callback.vue -->
<template>
  <div class="oauth-callback">
    <div class="loading-container">
      <div class="loading-spinner"></div>
      <p>Completing authentication...</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'

useSeoMeta({
  title: 'Ajimall | Callback',
  ogTitle: 'Ajimall | Callback',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})

const authStore = useAuthStore()
const { $pb } = useNuxtApp()

onMounted(async () => {
  try {
    // When redirected back from OAuth provider, PocketBase will automatically
    // handle the auth confirmation when this page loads

    // Check if the authentication was successful
    if ($pb.authStore.isValid) {
      // Update auth store
      authStore.setUser($pb.authStore.record)
      authStore.setLoggedIn(true)

      // Redirect to intended destination or dashboard
      const redirectPath = sessionStorage.getItem('redirectPath') || '/'
      sessionStorage.removeItem('redirectPath')
      navigateTo(redirectPath)
    } else {
      // If authentication failed, redirect to login page
      navigateTo('/auth?error=oauth_failed')
    }
  } catch (error) {
    console.error('OAuth callback error:', error)
    // Redirect to login page with error
    navigateTo('/auth?error=oauth_failed')
  }
})
</script>

<style scoped>
.oauth-callback {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.loading-container {
  text-align: center;
}

.loading-spinner {
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 4px solid rgba(59, 130, 246, 0.3);
  border-radius: 50%;
  border-top-color: #3b82f6;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

p {
  color: #6b7280;
  font-size: 16px;
}
</style>