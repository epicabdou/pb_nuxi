<template>
  <div class="responsive-container section-padding">
    <div class="card-fancy text-center py-16">
      <div class="flex justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h1 class="heading-2 mb-4">Merci pour votre commande!</h1>
      <p class="body-regular text-background-600 mb-8">
        Votre commande a été reçue et est maintenant en cours de traitement.
        <br>Un email de confirmation a été envoyé à votre adresse email.
      </p>
      <div class="border-t border-b border-background-200 py-8 mb-8 max-w-md mx-auto">
        <div class="flex justify-between items-center mb-4">
          <span class="text-sm text-background-600">Numéro de commande:</span>
          <span class="font-medium">{{ orderId || 'Processing...' }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm text-background-600">Date:</span>
          <span class="font-medium">{{ formattedDate }}</span>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <NuxtLink to="/products" class="btn-primary">
          Continuer mes achats
        </NuxtLink>
        <NuxtLink to="/account/orders" class="btn-outline">
          Voir mes commandes
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from '~/composables/useToast.js'
import { useCartStore } from '~/stores/cart.js'
import { useCartClearState } from '~/composables/useCartClearState.js'

const route = useRoute()
const toast = useToast()
const cartStore = useCartStore()
const cartClearState = useCartClearState()
const sessionId = ref('')
const orderId = ref('')
const formattedDate = ref('')

onMounted(async () => {
  // Format today's date
  formattedDate.value = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  // Get session ID and order ID from URL
  sessionId.value = route.query.session_id
  orderId.value = route.query.order_id

  // Ensure cart is loaded from local storage first
  cartStore.loadCart()
  
  console.log('Success page - Cart state:', {
    hasItems: cartStore.hasItems,
    itemCount: cartStore.items.length,
    cartTotal: cartStore.cartTotal
  })
  
  // Get cart clearing state
  const clearState = cartClearState.getCartClearingState()
  console.log('Cart clearing state:', clearState)
  
  // If we have a session ID, we can assume payment was successful
  if (sessionId.value) {
    try {
      // Update cart clearing state with the session ID
      if (orderId.value) {
        cartClearState.markCartForClearing(orderId.value, sessionId.value)
      }
      
      // Force clear the cart in multiple ways to ensure it's cleared
      console.log('Clearing cart after successful payment - Session ID:', sessionId.value)
      
      // Method 1: Use the store's clearCart method
      cartStore.clearCart()
      
      // Method 2: Directly clear the items array and save
      cartStore.items = []
      cartStore.saveCart()
      
      // Method 3: Directly remove from localStorage
      if (process.client) {
        localStorage.removeItem('cart')
      }
      
      // Mark cart as cleared in our state tracker
      cartClearState.markCartCleared()
      
      console.log('Cart cleared - items count now:', cartStore.items.length)
      toast.success('Paiement réussi! Votre commande a été confirmée.')
      
      // Optional: You could verify the session with Stripe here if needed
      // const { $pb } = useNuxtApp()
      // await $pb.collection('orders').update(orderId.value, { status: 'paid' })
    } catch (error) {
      console.error('Error processing successful payment:', error)
      toast.error('Une erreur est survenue lors de la finalisation de votre paiement')
    }
  } else {
    console.warn('No session ID found in URL, payment may not have been completed')
  }
})
</script>