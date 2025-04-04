<template>
  <div class="responsive-container section-padding flex justify-center items-center min-h-screen bg-background-100 dark:bg-background-900">
    <div class="card-fancy w-full max-w-md animate-fade-in">
      <h1 class="heading-3 text-center mb-8 text-black">Créer un Compte</h1>

      <form @submit.prevent="handleRegister" class="space-y-6">
        <div>
          <label for="email" class="input-label">E-mail</label>
          <div class="input-group">
            <input
                id="email"
                v-model="email"
                type="email"
                required
                placeholder="Entrez votre e-mail" class="input-fancy"
            />
          </div>
        </div>

        <div>
          <label for="password" class="input-label">Mot de Passe</label>
          <div class="input-group">
            <input
                id="password"
                v-model="password"
                type="password"
                required
                placeholder="Entrez votre mot de passe" minlength="8"
                class="input-fancy"
                :class="{'input-error': password.length > 0 && password.length < 8}"
            />
          </div>
          <p class="input-help">Le mot de passe doit comporter au moins 8 caractères</p>
        </div>

        <div>
          <label for="passwordConfirm" class="input-label">Confirmer le Mot de Passe</label>
          <div class="input-group">
            <input
                id="passwordConfirm"
                v-model="passwordConfirm"
                type="password"
                required
                placeholder="Confirmez votre mot de passe" class="input-fancy"
                :class="{'input-error': passwordConfirm.length > 0 && password !== passwordConfirm}"
            />
          </div>
          <p v-if="passwordConfirm.length > 0 && password !== passwordConfirm" class="input-error-text">
            Les mots de passe ne correspondent pas
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
          {{ isLoading ? 'Création du compte...' : 'S\'inscrire' }}
        </button>
      </form>

      <p class="text-center mt-6 body-small">
        Vous avez déjà un compte ?
        <NuxtLink to="/login" class="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200">Se connecter</NuxtLink>
      </p>

      <div class="mt-6 p-4 rounded-lg bg-background-200 dark:bg-background-800/50 text-center">
        <p class="body-small text-background-700 dark:text-background-300">
          En vous inscrivant, vous acceptez nos
          <a href="#" class="text-primary-600 hover:text-primary-700">Conditions Générales d'Utilisation</a> et
          <a href="#" class="text-primary-600 hover:text-primary-700">Politique de Confidentialité</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '~/stores/auth'

// Appliquer le middleware invité pour empêcher les utilisateurs connectés d'accéder à cette page // MODIFIED
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

  // Valider que les mots de passe correspondent // MODIFIED
  if (password.value !== passwordConfirm.value) {
    // MODIFIED
    error.value = 'Les mots de passe ne correspondent pas'
    return
  }

  isLoading.value = true

  try {
    // Créer l'utilisateur // MODIFIED
    const userData = {
      email: email.value,
      password: password.value,
      passwordConfirm: passwordConfirm.value,
      // You might want to add a default name or other fields here
      // name: "New User"
    }

    // Inscrire le nouvel utilisateur // MODIFIED
    const newUser = await $pb.collection('users').create(userData)

    // Connexion automatique après l'inscription // MODIFIED
    const authData = await $pb.collection('users').authWithPassword(
        email.value,
        password.value
    )

    // Mettre à jour le store d'authentification // MODIFIED
    authStore.setUser(authData.record)
    authStore.setLoggedIn(true)

    // Naviguer vers // MODIFIED (Navigate to home page after successful registration)
    navigateTo('/')
  } catch (err) {
    // MODIFIED
    console.error('Erreur d\'inscription :', err)
    // MODIFIED
    error.value = err.message || 'Échec de l\'inscription. Veuillez réessayer.'
  } finally {
    isLoading.value = false
  }
}
</script>