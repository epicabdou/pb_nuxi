<!-- pages/login.vue -->
<template>
  <div class="responsive-container section-padding flex justify-center items-center min-h-screen bg-background-100 dark:bg-background-900">
    <div class="card-fancy w-full max-w-md animate-fade-in">
      <h1 class="heading-3 text-center mb-8 text-black">Login</h1>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="input-label">Email</label>
          <div class="input-group">
            <input
                id="email"
                v-model="email"
                type="email"
                required
                placeholder="Enter your email"
                class="input-fancy"
            />
          </div>
        </div>

        <div>
          <label for="password" class="input-label">Password</label>
          <div class="input-group">
            <input
                id="password"
                v-model="password"
                type="password"
                required
                placeholder="Enter your password"
                class="input-fancy"
            />
          </div>
        </div>

        <div v-if="error" class="input-error-text p-3 bg-error-50 dark:bg-error-950/50 rounded-lg">
          {{ error }}
        </div>

        <button type="submit" :disabled="isLoading" class="btn-primary w-full">
          <span v-if="isLoading" class="mr-2">
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <div class="mt-8 space-y-4">
        <div class="divider">
          <span class="px-2 bg-white dark:bg-background-800 text-background-500">OR</span>
        </div>

        <button @click="handleGoogleAuth" class="btn-secondary w-full btn-icon-text">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
          </svg>
          Login with Google
        </button>
      </div>

      <p class="text-center mt-6 body-small">
        Don't have an account?
        <NuxtLink to="/register" class="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200">Register</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'

// Apply the guest middleware to prevent logged-in users from accessing this page
definePageMeta({
  middleware: ['guest']
})

const email = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)

const authStore = useAuthStore()
const { $pb } = useNuxtApp()

const handleLogin = async () => {
  error.value = ''
  isLoading.value = true

  try {
    // Authenticate with PocketBase
    const authData = await $pb.collection('users').authWithPassword(email.value, password.value)

    // Update auth store
    authStore.setUser(authData.record)
    authStore.setLoggedIn(true)

    // Get redirect path or default to
    const redirectPath = sessionStorage.getItem('redirectPath') || '/'
    sessionStorage.removeItem('redirectPath')

    // Navigate to destination
    navigateTo(redirectPath)
  } catch (err) {
    console.error('Login error:', err)
    error.value = err.message || 'Failed to login. Please check your credentials.'
  } finally {
    isLoading.value = false
  }
}

const handleGoogleAuth = async () => {
  error.value = ''
  isLoading.value = true

  try {
    // Define redirect URL
    const redirectUrl = window.location.origin + '/auth/callback'

    // Start Google OAuth flow
    await $pb.collection('users').authWithOAuth2({
      provider: 'google',
      scopes: ['email', 'profile'],
      redirectUrl: redirectUrl
    })

    // Note: The code below won't execute immediately as the browser will redirect
  } catch (err) {
    console.error('Google auth error:', err)
    error.value = err.message || 'Failed to login with Google. Please try again.'
    isLoading.value = false
  }
}
</script>

<style scoped>
.divider {
  position: relative;
  text-align: center;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  @apply bg-background-300 dark:bg-background-700;
}
</style>