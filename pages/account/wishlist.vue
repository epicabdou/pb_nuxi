<template>
  <main class="responsive-container section-padding">
    <h1 class="heading-2 mb-8">My Wishlist</h1>

    <!-- Loading state -->
    <div v-if="isLoading" class="flex justify-center items-center py-16">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>

    <!-- Empty wishlist state -->
    <div v-else-if="wishlistItems.length === 0" class="card text-center py-12">
      <div class="text-background-400 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>
      <h3 class="text-xl font-medium mb-2">Your Wishlist is Empty</h3>
      <p class="text-background-600 dark:text-background-400 mb-8">
        Save items you're interested in for later by adding them to your wishlist.
      </p>
      <nuxt-link to="/products" class="btn-primary inline-flex">
        Explore Products
      </nuxt-link>
    </div>

    <!-- Wishlist items using ProductCard component -->
    <div v-else>
      <div class="mb-8 flex justify-between items-center">
        <p class="text-sm text-background-700 dark:text-background-300">
          {{ wishlistItems.length }} items in your wishlist
        </p>
        <button
            @click="clearWishlist"
            class="btn-ghost text-sm text-error-600 hover:text-error-700"
            :disabled="isClearing"
        >
          <span v-if="isClearing">Clearing...</span>
          <span v-else>Clear Wishlist</span>
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

    <!-- Toast component from composable -->
  </main>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useCartStore } from '~/stores/cart'
import { useWishlistStore } from '~/stores/wishlist'
import { useToast } from '~/composables/useToast'
import ProductCard from '~/components/ProductCard.vue'

// Route middleware to ensure authentication
definePageMeta({
  middleware: 'auth'
})

const { $pb } = useNuxtApp()
const authStore = useAuthStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const toast = useToast()

// State
const isLoading = ref(true)
const wishlistItems = ref([])
const removing = reactive({})
const addingToCart = ref(null)
const isClearing = ref(false)

// Meta
useHead({
  title: 'My Wishlist',
  meta: [
    { name: 'description', content: 'View and manage your saved items' }
  ]
})

// Lifecycle
onMounted(async () => {
  if (!authStore.isAuthenticated) {
    return navigateTo('/login?redirect=/wishlist')
  }

  try {
    await fetchWishlistItems()
  } catch (error) {
    console.error('Error fetching wishlist:', error)
    toast.error('Failed to load wishlist items')
  } finally {
    isLoading.value = false
  }
})

// Methods
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
    console.error('Error fetching wishlist items:', error)
    throw error
  }
}

async function removeFromWishlist(itemId) {
  removing[itemId] = true

  try {
    // Get product name before removing for toast
    const item = wishlistItems.value.find(i => i.id === itemId)
    const productName = item?.product?.name || 'Item'

    // Remove from PocketBase
    await $pb.collection('wishlists').delete(itemId)

    // Remove from local state
    wishlistItems.value = wishlistItems.value.filter(item => item.id !== itemId)

    // Show success message
    toast.success(`${productName} removed from wishlist`)

    // Refresh wishlist store
    wishlistStore.fetchItems()
  } catch (error) {
    console.error('Error removing from wishlist:', error)
    toast.error('Failed to remove item')
  } finally {
    removing[itemId] = false
  }
}

async function clearWishlist() {
  if (!confirm('Are you sure you want to clear your entire wishlist?')) {
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
    toast.success('Wishlist cleared')

    // Refresh wishlist store
    wishlistStore.fetchItems()
  } catch (error) {
    console.error('Error clearing wishlist:', error)
    toast.error('Failed to clear wishlist')
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

    toast.success(`${product.name} added to cart`)

    // Optionally open cart drawer
    cartStore.toggleCart()
  } catch (error) {
    console.error('Error adding to cart:', error)
    toast.error('Failed to add item to cart')
  } finally {
    addingToCart.value = null
  }
}
</script>