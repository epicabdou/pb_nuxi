<template>
  <Teleport to="body">
    <!-- Overlay -->
    <Transition
      enter-active-class="transition-opacity ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="cartStore.isCartOpen"
        class="fixed inset-0 bg-background-900/80 dark:bg-background-950/90 backdrop-blur-sm z-50"
        @click="cartStore.toggleCart"
      />
    </Transition>

    <!-- Sidebar -->
    <Transition
      enter-active-class="transition-transform ease-out duration-300"
      enter-from-class="transform translate-x-full"
      enter-to-class="transform translate-x-0"
      leave-active-class="transition-transform ease-in duration-200"
      leave-from-class="transform translate-x-0"
      leave-to-class="transform translate-x-full"
    >
      <div
        v-if="cartStore.isCartOpen"
        class="fixed top-0 right-0 h-full w-full max-w-md bg-white/95 dark:bg-background-800/95 backdrop-blur-lg shadow-2xl z-50 flex flex-col border-l border-background-200/50 dark:border-background-700/50"
        @click.stop
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-background-200/50 dark:border-background-700/50 bg-gradient-to-r from-primary-50/50 to-secondary-50/50 dark:from-primary-900/20 dark:to-secondary-900/20">
          <div class="flex items-center space-x-3">
            <div class="p-2 rounded-xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10">
              <svg class="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <h2 class="text-lg font-bold text-background-900 dark:text-background-100">Votre Panier</h2>
              <p class="text-sm text-background-600 dark:text-background-400">
                {{ cartStore.cartCount }} {{ cartStore.cartCount <= 1 ? 'article' : 'articles' }}
              </p>
            </div>
          </div>
          <button
            @click="cartStore.toggleCart"
            class="p-2 rounded-xl text-background-600 hover:text-background-900 dark:text-background-400 dark:hover:text-background-100 hover:bg-background-100 dark:hover:bg-background-700 transition-all duration-200"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Cart Items -->
        <div class="flex-1 overflow-y-auto p-6">
          <!-- Empty Cart State -->
          <div v-if="cartStore.cartCount === 0" class="flex flex-col items-center justify-center h-full text-center py-12">
            <div class="p-6 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 mb-6">
              <svg class="h-12 w-12 text-primary-500 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-background-900 dark:text-background-100 mb-3">
              Votre panier est vide
            </h3>
            <p class="text-background-600 dark:text-background-400 mb-8 max-w-sm">
              Découvrez nos gommages authentiques et ajoutez vos favoris à votre panier.
            </p>
            <button
              @click="navigateToProducts"
              class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-medium hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2zM7 3v4l2-1 2 1V3" />
              </svg>
              Découvrir nos Gommages
            </button>
          </div>

          <!-- Cart Items List -->
          <div v-else class="space-y-4">
            <TransitionGroup
              enter-active-class="transition-all duration-300"
              enter-from-class="opacity-0 scale-95 translate-x-4"
              enter-to-class="opacity-100 scale-100 translate-x-0"
              leave-active-class="transition-all duration-200"
              leave-from-class="opacity-100 scale-100 translate-x-0"
              leave-to-class="opacity-0 scale-95 -translate-x-4"
              move-class="transition-transform duration-300"
            >
              <div
                v-for="item in cartStore.items"
                :key="item.id"
                class="flex items-start space-x-4 p-4 bg-background-50/50 dark:bg-background-700/30 rounded-xl border border-background-200/50 dark:border-background-600/30 hover:shadow-md transition-all duration-200"
              >
                <!-- Product Image -->
                <div class="flex-shrink-0">
                  <div class="w-16 h-16 rounded-lg overflow-hidden bg-background-200 dark:bg-background-600">
                    <img
                      v-if="item.image"
                      :src="getProductImageUrl(item)"
                      :alt="item.name"
                      class="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div v-else class="w-full h-full flex items-center justify-center">
                      <svg class="h-6 w-6 text-background-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- Product Details -->
                <div class="flex-1 min-w-0">
                  <h3 class="font-medium text-background-900 dark:text-background-100 truncate">
                    {{ item.name }}
                  </h3>
                  <p class="text-sm text-background-600 dark:text-background-400 mt-1">
                    {{ formatPrice(item.price) }} MAD
                  </p>
                  
                  <!-- Quantity Controls -->
                  <div class="flex items-center space-x-3 mt-3">
                    <div class="flex items-center bg-background-100 dark:bg-background-600 rounded-lg overflow-hidden">
                      <button
                        @click="updateQuantity(item.id, item.quantity - 1)"
                        :disabled="item.quantity <= 1"
                        class="p-1.5 text-background-600 dark:text-background-400 hover:text-background-900 dark:hover:text-background-100 hover:bg-background-200 dark:hover:bg-background-500 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                        </svg>
                      </button>
                      <span class="px-3 py-1.5 text-sm font-medium text-background-900 dark:text-background-100">
                        {{ item.quantity }}
                      </span>
                      <button
                        @click="updateQuantity(item.id, item.quantity + 1)"
                        class="p-1.5 text-background-600 dark:text-background-400 hover:text-background-900 dark:hover:text-background-100 hover:bg-background-200 dark:hover:bg-background-500 transition-colors duration-150"
                      >
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Remove Button -->
                <button
                  @click="removeFromCart(item.id)"
                  class="flex-shrink-0 p-2 text-background-400 hover:text-error-500 hover:bg-error-50 dark:hover:bg-error-900/20 rounded-lg transition-all duration-200"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </TransitionGroup>
          </div>
        </div>

        <!-- Footer/Checkout Section -->
        <div v-if="cartStore.cartCount > 0" class="border-t border-background-200/50 dark:border-background-700/50 p-6 bg-gradient-to-r from-background-50/50 to-cream-50/50 dark:from-background-800/50 dark:to-background-700/50">
          <!-- Subtotal -->
          <div class="flex justify-between items-center mb-4">
            <span class="text-background-700 dark:text-background-300 font-medium">Sous-total:</span>
            <span class="text-xl font-bold text-background-900 dark:text-background-100">
              {{ formatPrice(cartStore.cartTotal) }} MAD
            </span>
          </div>

          <!-- Shipping Notice -->
          <div class="flex items-center space-x-2 mb-6 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200/50 dark:border-primary-800/50">
            <svg class="h-5 w-5 text-primary-600 dark:text-primary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-sm text-primary-700 dark:text-primary-300">
              Livraison gratuite pour les commandes de plus de 500 MAD
            </p>
          </div>

          <!-- Action Buttons -->
          <div class="space-y-3">
            <button
              @click="navigateToCheckout"
              :disabled="isProcessing"
              class="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-medium hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <svg v-if="isProcessing" class="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              {{ isProcessing ? 'Traitement...' : 'Finaliser la Commande' }}
            </button>
            
            <button
              @click="continueShopping"
              class="w-full flex items-center justify-center px-6 py-3 bg-background-100 hover:bg-background-200 dark:bg-background-700 dark:hover:bg-background-600 text-background-700 dark:text-background-300 rounded-xl font-medium transition-all duration-200"
            >
              <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Continuer les Achats
            </button>
          </div>

          <!-- Clear Cart -->
          <div class="mt-4 pt-4 border-t border-background-200/50 dark:border-background-600/50">
            <button
              @click="clearCart"
              class="w-full text-sm text-background-500 hover:text-error-500 transition-colors duration-200"
            >
              Vider le panier
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '~/stores/cart'
import { useNuxtApp, navigateTo } from 'nuxt/app'

// Store
const cartStore = useCartStore()
const { $pb } = useNuxtApp()

// State
const isProcessing = ref(false)

// Methods
const getProductImageUrl = (item) => {
  if (!item.image || !item.collectionId || !item.id) {
    return null
  }
  return `${$pb.baseUrl}/api/files/${item.collectionId}/${item.id}/${item.image}`
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-MA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price)
}

const updateQuantity = (itemId, newQuantity) => {
  if (newQuantity <= 0) {
    cartStore.removeItem(itemId)
  } else {
    cartStore.updateQuantity(itemId, newQuantity)
  }
}

const removeFromCart = (itemId) => {
  cartStore.removeItem(itemId)
}

const clearCart = () => {
  if (confirm('Êtes-vous sûr de vouloir vider votre panier ?')) {
    cartStore.clearCart()
  }
}

const navigateToProducts = () => {
  cartStore.toggleCart()
  navigateTo('/products')
}

const continueShopping = () => {
  cartStore.toggleCart()
}

const navigateToCheckout = async () => {
  if (cartStore.cartCount === 0) return
  
  isProcessing.value = true
  try {
    cartStore.toggleCart()
    await navigateTo('/checkout')
  } catch (error) {
    console.error('Error navigating to checkout:', error)
  } finally {
    isProcessing.value = false
  }
}
</script>

<style scoped>
/* Scrollbar styling for cart items */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  @apply bg-background-100 dark:bg-background-700 rounded-full;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  @apply bg-background-300 dark:bg-background-500 rounded-full hover:bg-background-400 dark:hover:bg-background-400;
}

/* Enhanced animations */
.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Smooth transitions for all interactive elements */
button {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Enhanced hover effects */
.hover\:scale-105:hover {
  transform: scale(1.05);
}
</style>