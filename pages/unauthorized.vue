<!-- pages/unauthorized.vue -->
<template>
  <div class="responsive-container section-padding flex justify-center items-center min-h-screen bg-background-100 dark:bg-background-900">
    <div class="card-fancy w-full max-w-lg animate-slide-up text-center">
      <div class="mb-6 text-error-500 text-8xl">
        <div class="inline-block animate-bounce-subtle">🔐</div>
      </div>

      <h1 class="heading-2 mb-4 text-error-600 dark:text-error-400">Access Denied</h1>

      <div class="space-y-3 mb-8">
        <p class="body-large text-background-700 dark:text-background-300">
          You don't have permission to access this page.
        </p>
        <p class="body-regular text-background-600 dark:text-background-400">
          This area is restricted to administrators only.
        </p>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button @click="goToHome" class="btn-primary">
          Go to Home
        </button>
        <button v-if="isLoggedIn" @click="logout" class="btn-secondary">
          Logout
        </button>
      </div>

      <div class="mt-8 p-4 rounded-lg border border-background-300 dark:border-background-700">
        <p class="body-small text-background-600 dark:text-background-400">
          If you believe this is an error, please contact your system administrator or
          <a href="#" class="text-primary-600 hover:text-primary-700 transition-colors">request access</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useRoute } from 'vue-router'

useSeoMeta({
  title: 'Ajimall | Unauthorized',
  ogTitle: 'Ajimall | Unauthorized',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})

const route = useRoute()
const authStore = useAuthStore()
const isLoggedIn = computed(() => authStore.isAuthenticated)

const goToHome = () => {
  navigateTo('/')
}

const logout = () => {
  authStore.logout()
}
</script>