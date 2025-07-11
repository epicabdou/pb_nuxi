<template>
  <main class="responsive-container section-padding">
    <h1 class="heading-2 mb-8">Ma Liste de Souhaits</h1>

    <div v-if="isLoading" class="flex justify-center items-center py-16">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>

    <div v-else-if="wishlistItems.length === 0" class="card text-center py-12">
      <div class="text-background-400 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>
      <h3 class="text-xl font-medium mb-2">Votre Liste de Souhaits est Vide</h3>
      <p class="text-background-600 dark:text-background-400 mb-8">
        Enregistrez les articles qui vous intéressent pour plus tard en les ajoutant à votre liste de souhaits.
      </p>
      <nuxt-link to="/products" class="btn-primary inline-flex">
        Explorer les Produits
      </nuxt-link>
    </div>

    <div v-else>
      <div class="mb-8 flex justify-between items-center">
        <p class="text-sm text-background-700 dark:text-background-300">
          {{ wishlistItems.length }} article(s) dans votre liste de souhaits
        </p>
        <button
            @click="clearWishlist"
            class="btn-ghost text-sm text-error-600 hover:text-error-700"
            :disabled="isClearing"
        >
          <span v-if="isClearing">Suppression en cours...</span>
          <span v-else>Vider la Liste de Souhaits</span>
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard
            v-for="item in wishlistItems"
            :key="item.id"
            :product="item.product"
            :is-in-wishlist="true"
            @add-to-cart="addToCart"
            @add-to-wishlist="removeFromWishlist(item.id)"
        />
      </div>
    </div>

  </main>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useCartStore } from '~/stores/cart'
import { useWishlistStore } from '~/stores/wishlist'
import { useToast } from '~/composables/useToast'
import ProductCard from '~/components/ProductCard.vue'

// Middleware de route pour assurer l'authentification // MODIFIED
definePageMeta({
  middleware: 'auth'
})

const { $pb } = useNuxtApp()
const authStore = useAuthStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const toast = useToast()

// État // MODIFIED
const isLoading = ref(true)
const wishlistItems = ref([])
const removing = reactive({})
const addingToCart = ref(null)
const isClearing = ref(false)

// Méta // MODIFIED
useHead({
  // MODIFIED
  title: 'Ma Liste de Souhaits',
  meta: [
    // MODIFIED
    { name: 'description', content: 'Voir et gérer vos articles enregistrés' }
  ]
})

// Cycle de vie // MODIFIED
onMounted(async () => {
  if (!authStore.isAuthenticated) {
    return navigateTo('/login?redirect=/wishlist')
  }

  try {
    await fetchWishlistItems()
  } catch (error) {
    // MODIFIED
    console.error('Erreur lors de la récupération de la liste de souhaits :', error)
    // MODIFIED
    toast.error('Échec du chargement des articles de la liste de souhaits')
  } finally {
    isLoading.value = false
  }
})

// Méthodes // MODIFIED
async function fetchWishlistItems() {
  if (!authStore.isAuthenticated || !$pb.authStore.isValid) {
    return
  }

  try {
    const userId = $pb.authStore.model.id

    const result = await $pb.collection('wishlists').getList(1, 100, {
      filter: `user="${userId}"`,
      expand: 'product'
    })

    wishlistItems.value = result.items.map(item => ({
      id: item.id,
      product: item.expand.product
    }))
  } catch (error) {
    // MODIFIED
    console.error('Erreur lors de la récupération des articles de la liste de souhaits :', error)
    throw error
  }
}

async function removeFromWishlist(itemId) {
  removing[itemId] = true

  try {
    // Get product name before removing for toast
    const item = wishlistItems.value.find(i => i.id === itemId)
    // MODIFIED Fallback name
    const productName = item?.product?.name || 'Article'

    // Remove from PocketBase
    await $pb.collection('wishlists').delete(itemId)

    // Remove from local state
    wishlistItems.value = wishlistItems.value.filter(item => item.id !== itemId)

    // Show success message
    // MODIFIED Toast message
    toast.success(`${productName} retiré(e) de la liste de souhaits`)

    // Refresh wishlist store
    wishlistStore.fetchItems()
  } catch (error) {
    // MODIFIED
    console.error('Erreur lors de la suppression de la liste de souhaits :', error)
    // MODIFIED
    toast.error('Échec de la suppression de l\'article')
  } finally {
    removing[itemId] = false
  }
}

async function clearWishlist() {
  // MODIFIED Confirmation message
  if (!confirm('Êtes-vous sûr de vouloir vider toute votre liste de souhaits ?')) {
    return
  }

  isClearing.value = true

  try {
    // Delete each item one by one
    const deletePromises = wishlistItems.value.map(item =>
        $pb.collection('wishlists').delete(item.id)
    )

    await Promise.all(deletePromises)

    // Clear local state
    wishlistItems.value = []

    // Show success message
    // MODIFIED Toast message
    toast.success('Liste de souhaits vidée')

    // Refresh wishlist store
    wishlistStore.fetchItems()
  } catch (error) {
    // MODIFIED
    console.error('Erreur lors de la suppression de la liste de souhaits :', error)
    // MODIFIED
    toast.error('Échec de la suppression de la liste de souhaits')
  } finally {
    isClearing.value = false
  }
}

async function addToCart(product) {
  if (!product || product.stock <= 0) return

  const quantity = product.quantity || 1
  addingToCart.value = product.id

  try {
    // Add to cart using cart store
    cartStore.addItem({
      id: product.id,
      name: product.name,
      price: product.promoPrice || product.price,
      image: product.image,
      quantity: quantity
    })

    // MODIFIED Toast message
    toast.success(`${product.name} ajouté(e) au panier`)

    // Optionnellement ouvrir le tiroir du panier // MODIFIED Comment
    cartStore.toggleCart()
  } catch (error) {
    // MODIFIED
    console.error('Erreur lors de l\'ajout au panier :', error)
    // MODIFIED
    toast.error('Échec de l\'ajout de l\'article au panier')
  } finally {
    addingToCart.value = null
  }
}
</script>