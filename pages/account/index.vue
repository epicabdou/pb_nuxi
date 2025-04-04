<template>
  <main class="responsive-container section-padding">
    <div v-if="isLoading" class="flex justify-center items-center py-16">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>

    <div v-else>
      <h1 class="heading-2 mb-8">Mon Profil</h1>

      <div class="mb-8 border-b border-background-300 dark:border-background-700">
        <div class="flex flex-wrap">
          <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
              'px-4 py-3 font-medium transition-colors duration-200 border-b-2 -mb-px',
              activeTab === tab.id
                ? 'text-primary-600 border-primary-500'
                : 'text-background-600 dark:text-background-400 border-transparent hover:text-background-900 dark:hover:text-white'
            ]"
          >
            {{ tab.label }} </button>
        </div>
      </div>

      <div v-if="activeTab === 'profile'" class="grid md:grid-cols-[300px_1fr] gap-8">
        <div class="card flex flex-col items-center">
          <div class="relative w-48 h-48 mb-4">
            <img
                v-if="avatarUrl"
                :src="avatarUrl"
                alt="Avatar de profil" class="w-full h-full object-cover rounded-full"
            />
            <div v-else class="w-full h-full bg-background-300 dark:bg-background-700 rounded-full flex items-center justify-center">
              <span class="text-5xl font-bold text-background-500">{{ userInitials }}</span>
            </div>

            <div
                @click="$refs.avatarInput.click()"
                class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer"
            >
              <span class="text-white opacity-0 hover:opacity-100 font-medium">Changer la Photo</span>
            </div>
            <input ref="avatarInput" type="file" class="hidden" accept="image/*" @change="handleAvatarUpload" />
          </div>

          <h2 class="text-xl font-bold">{{ user.name || 'Aucun nom défini' }}</h2>
          <p class="text-background-600 dark:text-background-400">{{ user.email }}</p>

          <button
              v-if="isEditing"
              @click="handleLogout"
              class="btn-ghost mt-6 text-error-500"
          >
            Déconnexion </button>
        </div>

        <div class="card">
          <h2 class="text-xl font-bold mb-6">Informations Personnelles</h2>

          <form @submit.prevent="updateProfile">
            <div class="mb-4">
              <label class="input-label">Nom</label>
              <input
                  v-model="formData.name"
                  type="text"
                  class="input-primary"
                  :disabled="!isEditing"
                  placeholder="Entrez votre nom" />
            </div>

            <div class="mb-4">
              <label class="input-label">E-mail</label>
              <input
                  v-model="user.email"
                  type="email"
                  class="input-primary"
                  disabled
                  placeholder="Adresse e-mail" />
              <p class="input-help">L'e-mail ne peut pas être modifié</p>
            </div>

            <div class="flex justify-end mt-6">
              <button
                  v-if="!isEditing"
                  @click.prevent="isEditing = true"
                  type="button"
                  class="btn-primary"
              >
                Modifier le Profil </button>

              <div v-else class="flex space-x-3">
                <button
                    @click.prevent="cancelEdit"
                    type="button"
                    class="btn-secondary"
                >
                  Annuler </button>
                <button
                    type="submit"
                    class="btn-primary"
                    :disabled="isSubmitting"
                >
                  {{ isSubmitting ? 'Enregistrement...' : 'Enregistrer les Modifications' }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div v-if="activeTab === 'password'" class="max-w-xl mx-auto">
        <div class="card">
          <h2 class="text-xl font-bold mb-6">Changer le Mot de Passe</h2>

          <form @submit.prevent="updatePassword">
            <div class="mb-4">
              <label class="input-label">Mot de Passe Actuel</label>
              <input
                  v-model="passwordData.currentPassword"
                  type="password"
                  class="input-primary"
                  placeholder="Entrez votre mot de passe actuel" required
              />
            </div>

            <div class="mb-4">
              <label class="input-label">Nouveau Mot de Passe</label>
              <input
                  v-model="passwordData.newPassword"
                  type="password"
                  class="input-primary"
                  placeholder="Entrez le nouveau mot de passe" required
                  minlength="8"
              />
              <p class="input-help">Le mot de passe doit comporter au moins 8 caractères</p>
            </div>

            <div class="mb-4">
              <label class="input-label">Confirmer le Nouveau Mot de Passe</label>
              <input
                  v-model="passwordData.confirmPassword"
                  type="password"
                  class="input-primary"
                  placeholder="Confirmez le nouveau mot de passe" required
              />
              <p v-if="passwordMismatch" class="input-error-text">Les mots de passe ne correspondent pas</p>
            </div>

            <div class="flex justify-end mt-6">
              <button
                  type="submit"
                  class="btn-primary"
                  :disabled="isSubmitting || passwordMismatch || !passwordData.newPassword"
              >
                {{ isSubmitting ? 'Mise à jour...' : 'Mettre à jour le Mot de Passe' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div v-if="activeTab === 'orders'" class="space-y-6">
        <div v-if="orders.length === 0" class="card text-center py-12">
          <h3 class="text-xl font-medium mb-2">Aucune Commande pour l'instant</h3>
          <p class="text-background-600 dark:text-background-400">Vous n'avez pas encore passé de commande.</p>
          <nuxt-link to="/products" class="btn-primary mt-6 inline-flex">Commencer les Achats</nuxt-link>
        </div>

        <div v-else>
          <div v-for="order in orders" :key="order.id" class="card mb-6">
            <div class="flex justify-between items-center border-b border-background-300 dark:border-background-700 pb-4 mb-4">
              <div>
                <h3 class="font-bold">Commande #{{ order.id.substring(0, 8) }}</h3>
                <p class="text-sm text-background-600 dark:text-background-400">
                  {{ new Date(order.created).toLocaleDateString('fr-FR') }}
                </p>
              </div>
              <div>
                <span class="badge" :class="{
                  'badge-primary': order.status === 'delivered',
                  'badge-success': order.status === 'shipped',
                  'badge-error': order.status === 'cancelled',
                  'badge-secondary': order.status === 'pending' || order.status === 'paid'
                }">
                  {{ order.status === 'delivered' ? 'Livrée' :
                    order.status === 'shipped' ? 'Expédiée' :
                        order.status === 'cancelled' ? 'Annulée' :
                            order.status === 'pending' ? 'En attente' :
                                order.status === 'paid' ? 'Payée' :
                                    order.status.charAt(0).toUpperCase() + order.status.slice(1) }}
                </span>
              </div>
            </div>

            <div v-if="order.items && order.items.length" class="space-y-4">
              <div v-for="item in order.items" :key="item.id" class="flex items-center py-2">
                <div class="w-16 h-16 bg-background-200 dark:bg-background-800 rounded overflow-hidden mr-4">
                  <img
                      v-if="item.product && item.product.image"
                      :src="getImageUrl(item.product.image)"
                      alt="Produit" class="w-full h-full object-cover"
                  />
                </div>

                <div class="flex-1">
                  <h4 class="font-medium">{{ item.product?.name || 'Produit' }}</h4>
                  <p class="text-sm text-background-600 dark:text-background-400">
                    Qté : {{ item.quantity }} × {{ item.price.toFixed(2) }} €
                  </p>
                </div>

                <div class="text-right">
                  <p class="font-medium">{{ (item.quantity * item.price).toFixed(2) }} €</p>
                </div>
              </div>
            </div>

            <div class="border-t border-background-300 dark:border-background-700 mt-4 pt-4">
              <div class="flex justify-between font-bold">
                <span>Total</span>
                <span>{{ order.totalPrice.toFixed(2) }} €</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="fixed bottom-4 right-4 z-50">
      <div
          v-if="toast.show"
          class="p-4 rounded-lg shadow-lg max-w-sm transform transition-all"
          :class="{
          'bg-success-500 text-white': toast.type === 'success',
          'bg-error-500 text-white': toast.type === 'error'
        }"
      >
        <div class="flex items-center">
          <span class="font-medium">{{ toast.message }}</span>
          <button @click="toast.show = false" class="ml-auto">
            <span class="text-xl">&times;</span>
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, reactive, onMounted, watch } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'

// Middleware de route pour assurer l'authentification // MODIFIED
definePageMeta({
  middleware: 'auth'
})

const { $pb } = useNuxtApp()
const authStore = useAuthStore()
const router = useRouter()

// État // MODIFIED
const isLoading = ref(true)
const isSubmitting = ref(false)
const isEditing = ref(false)
const user = ref({})
const formData = reactive({
  name: ''
})
const passwordData = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const orders = ref([])
const toast = reactive({
  show: false,
  message: '',
  type: 'success',
  timeout: null
})

// Onglets // MODIFIED
const activeTab = ref('profile')
const tabs = [
  // MODIFIED Labels
  { id: 'profile', label: 'Profil' },
  { id: 'password', label: 'Mot de Passe' },
  { id: 'orders', label: 'Commandes' }
]

// Propriétés calculées // MODIFIED
const avatarUrl = computed(() => {
  if (user.value && user.value.avatar) {
    return `${$pb.baseUrl}/api/files/${user.value.collectionId}/${user.value.id}/${user.value.avatar}`
  }
  return null
})

const userInitials = computed(() => {
  if (!user.value.name) return '?'
  return user.value.name.split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2)
})

const passwordMismatch = computed(() => {
  return passwordData.newPassword &&
      passwordData.confirmPassword &&
      passwordData.newPassword !== passwordData.confirmPassword
})

// Cycle de vie // MODIFIED
onMounted(async () => {
  try {
    // Redirect if not authenticated
    if (!authStore.isAuthenticated) {
      return router.push('/login')
    }

    // Fetch user data
    await fetchUserData()

    // Fetch orders
    await fetchOrders()

    isLoading.value = false
  } catch (error) {
    // MODIFIED
    showToast('Erreur lors du chargement des données du profil', 'error')
    // MODIFIED
    console.error('Erreur lors du chargement du profil :', error)
    isLoading.value = false
  }
})

// Surveiller les changements d'état d'authentification // MODIFIED
watch(() => authStore.isAuthenticated, (isAuth) => {
  if (!isAuth) {
    router.push('/login')
  }
})

// Méthodes // MODIFIED
async function fetchUserData() {
  try {
    // Check if we need to refresh user data
    if (!$pb.authStore.isValid) {
      return router.push('/login')
    }

    user.value = $pb.authStore.model

    // Set form data
    formData.name = user.value.name || ''
  } catch (error) {
    // MODIFIED
    console.error('Erreur lors de la récupération des données utilisateur :', error)
    throw error
  }
}

async function fetchOrders() {
  try {
    // Fetch user orders with items
    const ordersList = await $pb.collection('orders').getList(1, 50, {
      filter: `user="${user.value.id}"`,
      sort: '-created',
      expand: 'user'
    })

    // We need to fetch order items for each order
    const ordersWithItems = await Promise.all(
        ordersList.items.map(async (order) => {
          const items = await $pb.collection('orderItems').getList(1, 100, {
            filter: `order="${order.id}"`,
            expand: 'product'
          })

          return {
            ...order,
            items: items.items
          }
        })
    )

    orders.value = ordersWithItems
  } catch (error) {
    // MODIFIED
    console.error('Erreur lors de la récupération des commandes :', error)
    // MODIFIED
    showToast('Échec du chargement de l\'historique des commandes', 'error')
  }
}

async function updateProfile() {
  if (!isEditing.value) return

  isSubmitting.value = true

  try {
    const data = {
      name: formData.name
    }

    const updatedUser = await $pb.collection('users').update(user.value.id, data)

    // Update local state
    user.value = updatedUser

    // Update auth store
    authStore.setUser(updatedUser)

    isEditing.value = false
    // MODIFIED
    showToast('Profil mis à jour avec succès', 'success')
  } catch (error) {
    // MODIFIED
    console.error('Erreur lors de la mise à jour du profil :', error)
    // MODIFIED
    showToast('Échec de la mise à jour du profil', 'error')
  } finally {
    isSubmitting.value = false
  }
}

async function updatePassword() {
  if (passwordMismatch.value) return

  isSubmitting.value = true

  try {
    // Verify current password by trying to authenticate
    await $pb.collection('users').authWithPassword(
        user.value.email,
        passwordData.currentPassword
    )

    // Update password
    await $pb.collection('users').update(user.value.id, {
      password: passwordData.newPassword,
      passwordConfirm: passwordData.confirmPassword
    })

    // Reset form
    passwordData.currentPassword = ''
    passwordData.newPassword = ''
    passwordData.confirmPassword = ''

    // MODIFIED
    showToast('Mot de passe mis à jour avec succès', 'success')
  } catch (error) {
    // MODIFIED
    console.error('Erreur lors de la mise à jour du mot de passe :', error)

    if (error.status === 400) {
      // MODIFIED
      showToast('Le mot de passe actuel est incorrect', 'error')
    } else {
      // MODIFIED
      showToast('Échec de la mise à jour du mot de passe', 'error')
    }
  } finally {
    isSubmitting.value = false
  }
}

async function handleAvatarUpload(event) {
  const file = event.target.files[0]
  if (!file) return

  // Validate file
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  if (!validTypes.includes(file.type)) {
    // MODIFIED
    showToast('Veuillez télécharger une image valide (JPEG, PNG, GIF ou WebP)', 'error')
    return
  }

  isSubmitting.value = true

  try {
    const formData = new FormData()
    formData.append('avatar', file)

    const updatedUser = await $pb.collection('users').update(user.value.id, formData)

    // Update local state
    user.value = updatedUser

    // Update auth store
    authStore.setUser(updatedUser)

    // MODIFIED
    showToast('Photo de profil mise à jour', 'success')
  } catch (error) {
    // MODIFIED
    console.error('Erreur lors du téléchargement de l\'avatar :', error)
    // MODIFIED
    showToast('Échec du téléchargement de la photo de profil', 'error')
  } finally {
    isSubmitting.value = false
    // Réinitialiser l'entrée de fichier // MODIFIED
    event.target.value = null
  }
}

function cancelEdit() {
  isEditing.value = false
  // Réinitialiser les données du formulaire aux données utilisateur actuelles // MODIFIED
  formData.name = user.value.name || ''
}

async function handleLogout() {
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    // MODIFIED
    console.error('Erreur lors de la déconnexion :', error)
  }
}

function getImageUrl(image) {
  // Assuming product images are stored differently than user avatars
  if (!image) return ''
  // Need to know the correct collection and record ID for product images
  // Example placeholder path - ADJUST AS NEEDED
  // return `${$pb.baseUrl}/api/files/products/${image.recordId || image.id}/${image.name}`
  return '' // Provide actual implementation based on your data structure
}

function showToast(message, type = 'success') {
  // Effacer tout timeout existant // MODIFIED
  if (toast.timeout) {
    clearTimeout(toast.timeout)
  }

  // Afficher le nouveau toast // MODIFIED
  toast.message = message
  toast.type = type
  toast.show = true

  // Masquer automatiquement après 5 secondes // MODIFIED
  toast.timeout = setTimeout(() => {
    toast.show = false
  }, 5000)
}
</script>