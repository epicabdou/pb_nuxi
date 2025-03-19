<!-- pages/register.vue -->
<template>
  <div class="responsive-container section-padding flex justify-center items-center min-h-screen bg-background-100 dark:bg-background-900">
    <div class="card-fancy w-full max-w-md animate-fade-in">
      <h1 class="heading-3 text-center mb-8 text-black">Create Account</h1>

      <form @submit.prevent="handleRegister" class="space-y-6">
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
                minlength="8"
                class="input-fancy"
                :class="{'input-error': password.length > 0 && password.length < 8}"
            />
          </div>
          <p class="input-help">Password must be at least 8 characters</p>
        </div>

        <div>
          <label for="passwordConfirm" class="input-label">Confirm Password</label>
          <div class="input-group">
            <input
                id="passwordConfirm"
                v-model="passwordConfirm"
                type="password"
                required
                placeholder="Confirm your password"
                class="input-fancy"
                :class="{'input-error': passwordConfirm.length > 0 && password !== passwordConfirm}"
            />
          </div>
          <p v-if="passwordConfirm.length > 0 && password !== passwordConfirm" class="input-error-text">
            Passwords do not match
          </p>
        </div>

        <div v-if="error" class="input-error-text p-3 bg-error-50 dark:bg-error-950/50 rounded-lg">
          {{ error }}
        </div>

        <button type="submit" :disabled="isLoading || !isPasswordValid" class="btn-primary w-full">
          <span v-if="isLoading" class="mr-2">
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
          {{ isLoading ? 'Creating account...' : 'Register' }}
        </button>
      </form>

      <p class="text-center mt-6 body-small">
        Already have an account?
        <NuxtLink to="/login" class="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200">Login</NuxtLink>
      </p>

      <div class="mt-6 p-4 rounded-lg bg-background-200 dark:bg-background-800/50 text-center">
        <p class="body-small text-background-700 dark:text-background-300">
          By registering, you agree to our
          <a href="#" class="text-primary-600 hover:text-primary-700">Terms of Service</a> and
          <a href="#" class="text-primary-600 hover:text-primary-700">Privacy Policy</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '~/stores/auth'

// Apply the guest middleware to prevent logged-in users from accessing this page
definePageMeta({
  middleware: ['guest']
})

const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const error = ref('')
const isLoading = ref(false)

const authStore = useAuthStore()
const { $pb } = useNuxtApp()

const isPasswordValid = computed(() => {
  return password.value.length >= 8 && password.value === passwordConfirm.value
})

const handleRegister = async () => {
  error.value = ''

  // Validate passwords match
  if (password.value !== passwordConfirm.value) {
    error.value = 'Passwords do not match'
    return
  }

  isLoading.value = true

  try {
    // Create user
    const userData = {
      email: email.value,
      password: password.value,
      passwordConfirm: passwordConfirm.value,
    }

    // Register new user
    const newUser = await $pb.collection('users').create(userData)

    // Auto login after registration
    const authData = await $pb.collection('users').authWithPassword(
        email.value,
        password.value
    )

    // Update auth store
    authStore.setUser(authData.record)
    authStore.setLoggedIn(true)

    // Navigate to
    navigateTo('/')
  } catch (err) {
    console.error('Registration error:', err)
    error.value = err.message || 'Failed to register. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>