<template>
  <div class="responsive-container section-padding">
    <div class="mb-10">
      <h1 class="heading-2 mb-4">Panier d'Achat</h1>
      <div class="flex items-center text-background-600">
        <NuxtLink to="/" class="hover:text-primary-500 transition-colors">Accueil</NuxtLink>
        <span class="mx-2">/</span>
        <span class="text-primary-500">Panier</span>
      </div>
    </div>

    <div v-if="!cartStore.hasItems" class="card flex flex-col items-center py-16">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-20 h-20 text-background-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <h2 class="heading-3 mb-4">Votre panier est vide</h2>
      <p class="body-regular text-background-600 mb-6">Il semble que vous n'ayez pas encore ajouté de produits à votre panier.</p>
      <NuxtLink to="/products" class="btn-primary">Commencer les Achats</NuxtLink>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2">
        <div class="card-fancy">
          <div class="flex justify-between items-center mb-6">
            <h2 class="heading-4">Articles du Panier ({{ cartStore.cartCount }})</h2>
            <button @click="cartStore.clearCart" class="btn-ghost text-sm">
              Vider le Panier
            </button>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="border-b border-background-200">
              <tr>
                <th class="text-left py-3 font-medium">Produit</th>
                <th class="text-center py-3 font-medium">Prix</th>
                <th class="text-center py-3 font-medium">Quantité</th>
                <th class="text-right py-3 font-medium">Total</th>
                <th class="text-right py-3 font-medium">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in cartStore.items" :key="item.id" class="border-b border-background-200 last:border-b-0">
                <td class="py-4">
                  <div class="flex items-center gap-3">
                    <div class="relative w-16 h-16 bg-background-100 rounded-md flex-shrink-0 overflow-hidden">
                      <img v-if="item.image" :src="getCartImageUrl(item)" :alt="item.name" class="object-cover w-full h-full" />
                      <div v-else class="flex items-center justify-center w-full h-full text-background-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 class="font-medium">{{ item.name }}</h3>
                      <p v-if="item.shortDescription" class="text-sm text-background-600 line-clamp-1">
                        {{ item.shortDescription }}
                      </p>
                    </div>
                  </div>
                </td>

                <td class="py-4 text-center">
                  <div class="text-background-700">
                    {{ formatCurrency(item.price) }}
                  </div>
                </td>

                <td class="py-4 text-center">
                  <div class="flex items-center justify-center">
                    <button
                        @click="cartStore.decrementItem(item.id)"
                        class="w-8 h-8 flex items-center justify-center border border-background-300 rounded-l-md hover:bg-background-100"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                      </svg>
                    </button>
                    <div class="w-10 h-8 flex items-center justify-center border-t border-b border-background-300">
                      {{ item.quantity }}
                    </div>
                    <button
                        @click="cartStore.incrementItem(item.id)"
                        class="w-8 h-8 flex items-center justify-center border border-background-300 rounded-r-md hover:bg-background-100"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </td>

                <td class="py-4 text-right font-medium">
                  {{ formatCurrency(item.price * item.quantity) }}
                </td>

                <td class="py-4 text-right">
                  <button
                      @click="cartStore.removeItem(item.id)"
                      class="text-error-500 hover:text-error-700 transition-colors"
                      title="Supprimer l'article" >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="mt-6 flex justify-between items-center">
          <NuxtLink to="/products" class="btn-outline flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Continuer les Achats
          </NuxtLink>

          <button
              @click="updateCart"
              class="btn-ghost flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Mettre à jour le Panier
          </button>
        </div>
      </div>

      <div class="lg:col-span-1">
        <CartSummary>
          <NuxtLink
              to="/checkout"
              class="btn-primary w-full"
          >
            Passer à la Caisse </NuxtLink>

          <div class="text-center mt-4">
            <p class="text-sm text-background-600">
              Nous acceptons les méthodes de paiement suivantes :
            </p>
            <div class="flex justify-center gap-3 mt-2">
              <span class="w-10 h-6 bg-background-200 rounded flex items-center justify-center text-xs font-medium">Visa</span>
              <span class="w-10 h-6 bg-background-200 rounded flex items-center justify-center text-xs font-medium">MC</span>
              <span class="w-10 h-6 bg-background-200 rounded flex items-center justify-center text-xs font-medium">Amex</span>
              <span class="w-10 h-6 bg-background-200 rounded flex items-center justify-center text-xs font-medium">PayPal</span>
            </div>
          </div>
        </CartSummary>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cart'
import { useToast } from '~/composables/useToast'
import CartSummary from '~/components/checkout/CartSummary.vue'

// Stores et composables // MODIFIED
const cartStore = useCartStore()
const toast = useToast()

// Formater la devise // MODIFIED
const formatCurrency = (amount) => {
  // MODIFIED: Changed locale and currency
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount)
}

// Mettre à jour le panier // MODIFIED
const updateCart = () => {
  cartStore.saveCart()
  // MODIFIED
  toast.success('Panier mis à jour avec succès')
}

// Generate image URL for cart items
const getCartImageUrl = (item) => {
  // If image is already a full URL, use it
  if (item.image && (item.image.startsWith('http://') || item.image.startsWith('https://'))) {
    return item.image;
  }
  
  // Otherwise construct PocketBase URL
  const config = useRuntimeConfig();
  const { $pb } = useNuxtApp();
  const baseUrl = $pb?.baseUrl || config.public.pocketbaseUrl;
  
  if (item.image) {
    return `${baseUrl}/api/files/products/${item.id}/${item.image}`;
  }
  
  return '';
}
</script>