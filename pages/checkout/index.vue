<template>
  <div class="responsive-container section-padding">
    <div class="mb-10">
      <h1 class="heading-2 mb-4">Validation</h1>
      <div class="flex items-center text-background-600">
        <NuxtLink to="/public" class="hover:text-primary-500 transition-colors">Accueil</NuxtLink>
        <span class="mx-2">/</span>
        <NuxtLink to="/cart/cart" class="hover:text-primary-500 transition-colors">Panier</NuxtLink>
        <span class="mx-2">/</span>
        <span class="text-primary-500">Validation</span>
      </div>
    </div>

    <div v-if="!cartStore.hasItems" class="card flex flex-col items-center py-16">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-20 h-20 text-background-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <h2 class="heading-3 mb-4">Votre panier est vide</h2>
      <p class="body-regular text-background-600 mb-6">Ajoutez des articles à votre panier avant de valider.</p>
      <NuxtLink to="/products" class="btn-primary">Continuer les Achats</NuxtLink>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div class="card">
            <div class="flex items-center justify-between mb-4">
              <h2 class="heading-4">Informations de Livraison</h2>
              <span v-if="isAddressLoaded" class="text-xs text-green-600 bg-green-100 py-1 px-2 rounded-full flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Adresse précédente chargée
              </span>
            </div>
            <div v-if="isAddressLoaded" class="mb-4 flex justify-end">
              <button 
                @click="resetShippingForm" 
                type="button" 
                class="text-xs text-gray-600 underline hover:text-primary-500 transition-colors">
                Utiliser une autre adresse
              </button>
            </div>
            <form @submit.prevent class="space-y-4">
              <div>
                <label for="fullName" class="input-label">Nom Complet</label>
                <input
                    id="fullName"
                    v-model="checkoutForm.shipping.fullName"
                    type="text"
                    class="input-primary"
                    required
                />
              </div>
              <div>
                <label for="address" class="input-label">Adresse</label>
                <input
                    id="address"
                    v-model="checkoutForm.shipping.address"
                    type="text"
                    class="input-primary"
                    required
                />
              </div>
              <div>
                <label for="city" class="input-label">Ville</label>
                <input
                    id="city"
                    v-model="checkoutForm.shipping.city"
                    type="text"
                    class="input-primary"
                    required
                />
              </div>
              <div>
                <label for="postCode" class="input-label">Code Postal</label>
                <input
                    id="postCode"
                    v-model="checkoutForm.shipping.postCode"
                    type="text"
                    class="input-primary"
                    required
                />
              </div>
              <div>
                <label for="country" class="input-label">Pays</label>
                <select
                    id="country"
                    v-model="checkoutForm.shipping.country"
                    class="select"
                    required
                >
                  <option value="">Sélectionnez un pays</option>
                  <option v-for="country in countries" :key="country" :value="country">
                    {{ country }} </option>
                </select>
              </div>
              <div>
                <label for="phone" class="input-label">Téléphone</label>
                <input
                    id="phone"
                    v-model="checkoutForm.shipping.phone"
                    type="tel"
                    class="input-primary"
                    required
                />
              </div>
            </form>
          </div>

          <div class="card">
            <h2 class="heading-4 mb-6">Méthode de Paiement</h2>
            <div class="space-y-4">
              <p class="text-sm text-background-600">Cette boutique utilise Stripe pour un paiement sécurisé par carte. Vous serez redirigé vers la plateforme de paiement Stripe après avoir confirmé votre commande.</p>
              
              <div class="flex items-center space-x-4 mt-4">
                <img src="https://cdn.cdnlogo.com/logos/v/69/visa.svg" alt="Visa" class="h-8">
                <img src="https://cdn.cdnlogo.com/logos/m/33/mastercard.svg" alt="Mastercard" class="h-8">
                <img src="https://cdn.cdnlogo.com/logos/a/57/american-express.svg" alt="American Express" class="h-8">
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-1">
        <div class="card-fancy sticky top-24">
          <h2 class="heading-4 mb-6">Résumé de la Commande</h2>

          <div class="space-y-4 mb-6">
            <div v-for="item in cartStore.items" :key="item.id" class="flex items-center gap-4 py-3 border-b border-background-200">
              <div class="relative w-16 h-16 bg-background-100 rounded-md flex-shrink-0 overflow-hidden">
                <img v-if="item.image" :src="getCartImageUrl(item)" :alt="item.name" class="object-cover w-full h-full" />
                <div v-else class="flex items-center justify-center w-full h-full text-background-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div class="absolute top-0 right-0 bg-primary-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {{ item.quantity }}
                </div>
              </div>
              <div class="flex-grow min-w-0">
                <h3 class="text-sm font-medium truncate">{{ item.name }}</h3>
                <p class="text-sm text-background-600">
                  {{ formatCurrency(item.price) }} x {{ item.quantity }}
                </p>
              </div>
              <div class="text-sm font-medium">
                {{ formatCurrency(item.price * item.quantity) }}
              </div>
            </div>
          </div>

          <div class="space-y-3 py-4 border-b border-t border-background-200">
            <div class="flex justify-between">
              <span class="text-background-600">Sous-total</span>
              <span class="font-medium">{{ formatCurrency(cartStore.cartTotal) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-background-600">Livraison</span>
              <span class="font-medium">{{ shipping > 0 ? formatCurrency(shipping) : 'Gratuit' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-background-600">Taxes ({{ taxRate * 100 }}%)</span>
              <span class="font-medium">{{ formatCurrency(tax) }}</span>
            </div>
          </div>

          <div class="flex justify-between items-center py-4 mb-6">
            <span class="text-lg font-bold">Total</span>
            <span class="text-xl font-bold">{{ formatCurrency(orderTotal) }}</span>
          </div>

          <button
              @click="placeOrder"
              :disabled="isProcessing || !isFormValid"
              class="btn-primary w-full"
              :class="{ 'opacity-70 cursor-not-allowed': isProcessing || !isFormValid }"
          >
            <span v-if="isProcessing">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Traitement en cours... </span>
            <span v-else>Payer avec Stripe</span> </button>

          <p class="text-xs text-background-500 text-center mt-4">
            En passant votre commande, vous acceptez nos
            <a href="#" class="text-primary-500 hover:underline">Conditions Générales de Vente</a> et
            <a href="#" class="text-primary-500 hover:underline">Politique de Confidentialité</a>.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '~/stores/cart.js'
import { useAuthStore } from '~/stores/auth.js'
import { useToast } from '~/composables/useToast.js'
import { useStripe } from '~/composables/useStripe.js'
import { useCartClearState } from '~/composables/useCartClearState.js'
import { useRouter } from 'vue-router'

// Stores et composables
const cartStore = useCartStore()
const authStore = useAuthStore()
const toast = useToast()
const router = useRouter()
const stripe = useStripe()
const cartClearState = useCartClearState()

// Fetch the user's previous shipping address if available
const fetchUserShippingAddress = async () => {
  try {
    const { $pb } = useNuxtApp()
    
    // Make sure user is authenticated
    if (!$pb?.authStore?.model?.id) {
      console.warn('Cannot fetch shipping address - user not authenticated')
      return null
    }
    
    console.log('Fetching previous shipping addresses for user:', $pb.authStore.model.id)
    
    // Get the most recent shipping address for this user
    const result = await $pb.collection('shippingAddresses').getList(1, 1, {
      filter: `user = "${$pb.authStore.model.id}"`,
      sort: '-created'
    })
    
    if (result && result.items && result.items.length > 0) {
      console.log('Found previous shipping address:', result.items[0])
      return result.items[0]
    } else {
      console.log('No previous shipping address found')
      return null
    }
  } catch (error) {
    console.error('Error fetching shipping address:', error)
    return null
  }
}

// Populate the form with the user's previous shipping address
const populateShippingForm = (addressData) => {
  if (!addressData) return
  
  // Map the shipping address data to the form fields
  const mappedData = {
    fullName: addressData.fullName || '',
    address: addressData.address || '',
    city: addressData.city || '',
    postCode: addressData.postCode || '',
    country: addressData.country || '',
    phone: addressData.phone || ''
  }
  
  // Update the checkout form with the address data
  checkoutForm.value.shipping = {
    ...checkoutForm.value.shipping,
    ...mappedData
  }
  
  // Set the flag that an address was loaded
  isAddressLoaded.value = true
  
  console.log('Shipping form populated with previous address data')
}

// Vérifier si l'utilisateur est authentifié et charger le panier
onMounted(async () => {
  // Check authentication
  if (!authStore.isAuthenticated) {
    toast.error('Veuillez vous connecter pour passer à la validation')
    router.push('/login?redirect=/checkout')
    return
  }
  
  // Ensure cart is loaded
  cartStore.loadCart()
  
  // If cart is empty after loading, offer a test product (for development) 
  // or redirect to cart page
  if (!cartStore.hasItems) {
    // For production, uncomment this to redirect
    // toast.error('Votre panier est vide')
    // router.push('/cart')
    // return
    
    // For development, add a test product
    if (addTestProductIfEmpty()) {
      toast.info('Un produit test a été ajouté à votre panier pour démonstration')
    }
  }
  
  // Fetch and populate previous shipping address if available
  const previousAddress = await fetchUserShippingAddress()
  if (previousAddress) {
    populateShippingForm(previousAddress)
  }
  
  console.log('Checkout page loaded with cart items:', cartStore.items.length)
})

// Liste de pays
const countries = [
  'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France',
  'Japan', 'China', 'India', 'Brazil', 'Belgium', 'Switzerland' 
]

// Variables de calcul de la commande
const taxRate = 0.08 // 8% tax
const shipping = computed(() => {
  // Livraison gratuite pour les commandes supérieures à 100 €
  return cartStore.cartTotal >= 100 ? 0 : 10
})
const tax = computed(() => {
  return cartStore.cartTotal * taxRate
})
const orderTotal = computed(() => {
  return cartStore.cartTotal + shipping.value + tax.value
})

// État du formulaire de validation
const checkoutForm = ref({
  shipping: {
    fullName: '',
    address: '',
    city: '',
    postCode: '',
    country: '',
    phone: ''
  }
})

// Validation du formulaire
const isFormValid = computed(() => {
  const { shipping } = checkoutForm.value

  // Valider les champs d'expédition requis
  if (!shipping.fullName || !shipping.address || !shipping.city ||
      !shipping.postCode || !shipping.country || !shipping.phone) {
    return false
  }

  return true
})

// État de traitement
const isProcessing = ref(false)

// Tracks whether a previous address was loaded
const isAddressLoaded = ref(false)

// Formater la devise
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount)
}

// Reset the shipping form
const resetShippingForm = () => {
  checkoutForm.value.shipping = {
    fullName: '',
    address: '',
    city: '',
    postCode: '',
    country: '',
    phone: ''
  }
  isAddressLoaded.value = false
}

// Helper function to add a test product if cart is empty (for debugging)
const addTestProductIfEmpty = () => {
  if (cartStore.items.length === 0) {
    console.log('Adding test product to empty cart');
    
    cartStore.addItem({
      id: 'test123',
      name: 'Test Product',
      price: 19.99,
      quantity: 1,
      image: '',
      shortDescription: 'Test product for checkout'
    });
    
    return true;
  }
  return false;
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

// Passer la commande avec Stripe
const placeOrder = async () => {
  if (!isFormValid.value) {
    toast.error('Veuillez remplir tous les champs obligatoires')
    return
  }

  if (!authStore.isAuthenticated) {
    toast.error('Veuillez vous connecter pour passer une commande')
    router.push('/login?redirect=/checkout')
    return
  }
  
  // Ensure cart is loaded and has items
  cartStore.loadCart()
  
  if (!cartStore.hasItems) {
    toast.error('Votre panier est vide')
    return
  }
  
  console.log(`Starting checkout with ${cartStore.items.length} items, total: ${cartStore.cartTotal}€`)

  isProcessing.value = true

  try {
    const { $pb } = useNuxtApp()

    console.log('Cart check before order creation:', {
      hasItems: cartStore.hasItems,
      itemCount: cartStore.items.length,
      cartTotal: cartStore.cartTotal
    })

    // Create the order first in PocketBase
    const order = await cartStore.createOrder($pb, checkoutForm.value.shipping)

    // Debug the cart items
    console.log('Raw cart items:', JSON.stringify(cartStore.items));
    
    // Prepare checkout data for Stripe - create clean objects with only necessary properties
    const processedItems = cartStore.items.map(item => {
      // Create a new object with only the properties needed for Stripe
      const processedItem = {
        id: item.id,
        name: item.name || 'Product',
        price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
        quantity: item.quantity || 1
      };
      
      // Only include shortDescription if it has a value
      if (item.shortDescription && item.shortDescription.trim() !== '') {
        processedItem.shortDescription = item.shortDescription;
      }
      
      // Handle image URL
      if (item.image) {
        if (typeof item.image === 'string') {
          if (item.image.startsWith('http')) {
            processedItem.image = item.image;
          } else {
            // Use the helper to get full URL
            processedItem.image = getCartImageUrl(item);
          }
        }
      }
      
      // Validate processed item
      if (!processedItem.price || isNaN(processedItem.price)) {
        console.error(`Invalid price for item ${processedItem.name}:`, processedItem.price);
        processedItem.price = 0; // Default to zero to avoid breaking the checkout
      }
      
      return processedItem;
    });
    
    console.log('Sending checkout data to Stripe:', processedItems);
    
    const checkoutData = {
      items: processedItems,
      userId: $pb.authStore.model.id,
      orderId: order.id,
      customerEmail: authStore.user.email || $pb.authStore.model.email,
      shippingDetails: checkoutForm.value.shipping
    }

    // Mark the cart for clearing after successful checkout
    cartClearState.markCartForClearing(order.id, 'pending')
    
    // Redirect to Stripe Checkout
    await stripe.createCheckoutSession(checkoutData)
    
    // Note: No need for success message here as we're redirecting to Stripe
    // The success/cancel pages will handle user feedback after payment

  } catch (error) {
    console.error('Erreur lors de la passation de la commande :', error)
    toast.error('Une erreur s\'est produite lors de la passation de votre commande. Veuillez réessayer.')
    isProcessing.value = false
  }
}
</script>