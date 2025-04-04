<template>
  <div class="responsive-container section-padding">
    <div class="mb-10">
      <h1 class="heading-2 mb-4">Validation</h1>
      <div class="flex items-center text-background-600">
        <NuxtLink to="/" class="hover:text-primary-500 transition-colors">Accueil</NuxtLink>
        <span class="mx-2">/</span>
        <NuxtLink to="/cart" class="hover:text-primary-500 transition-colors">Panier</NuxtLink>
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
            <h2 class="heading-4 mb-6">Informations de Livraison</h2>
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
            <h2 class="heading-4 mb-6">Informations de Paiement</h2>
            <form @submit.prevent class="space-y-4">
              <div>
                <label class="input-label">Méthode de Paiement</label>
                <div class="space-y-2">
                  <div
                      v-for="method in paymentMethods"
                      :key="method.value"
                      class="flex items-center border p-3 rounded-lg cursor-pointer"
                      :class="checkoutForm.payment.method === method.value ? 'border-primary-500 bg-primary-50' : 'border-background-300'"
                      @click="checkoutForm.payment.method = method.value"
                  >
                    <input
                        type="radio"
                        :id="method.value"
                        :value="method.value"
                        v-model="checkoutForm.payment.method"
                        class="radio mr-2"
                    />
                    <label :for="method.value" class="flex items-center cursor-pointer flex-grow">
                      <div class="ml-2">
                        <span class="font-medium">{{ method.label }}</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div v-if="checkoutForm.payment.method === 'credit_card'" class="space-y-4">
                <div>
                  <label for="cardName" class="input-label">Nom sur la Carte</label>
                  <input
                      id="cardName"
                      v-model="checkoutForm.payment.cardName"
                      type="text"
                      class="input-primary"
                      required
                  />
                </div>
                <div>
                  <label for="cardNumber" class="input-label">Numéro de Carte</label>
                  <input
                      id="cardNumber"
                      v-model="checkoutForm.payment.cardNumber"
                      type="text"
                      class="input-primary"
                      placeholder="1234 5678 9012 3456"
                      required
                  />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label for="expiryDate" class="input-label">Date d'Expiration</label>
                    <input
                        id="expiryDate"
                        v-model="checkoutForm.payment.expiryDate"
                        type="text"
                        class="input-primary"
                        placeholder="MM/AA" required
                    />
                  </div>
                  <div>
                    <label for="cvv" class="input-label">CVV</label>
                    <input
                        id="cvv"
                        v-model="checkoutForm.payment.cvv"
                        type="text"
                        class="input-primary"
                        placeholder="123"
                        required
                    />
                  </div>
                </div>
              </div>
            </form>
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
            <span v-else>Valider la Commande</span> </button>

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
import { useCartStore } from '~/stores/cart'
import { useAuthStore } from '~/stores/auth'
import { useToast } from '~/composables/useToast'
import { useRouter } from 'vue-router'

// Stores et composables // MODIFIED
const cartStore = useCartStore()
const authStore = useAuthStore()
const toast = useToast()
const router = useRouter()

// Vérifier si l'utilisateur est authentifié // MODIFIED
onMounted(() => {
  if (!authStore.isAuthenticated) {
    // MODIFIED
    toast.error('Veuillez vous connecter pour passer à la validation')
    router.push('/login?redirect=/checkout')
  }
})

// Méthodes de paiement // MODIFIED
const paymentMethods = [
  // MODIFIED Labels
  { value: 'credit_card', label: 'Carte de Crédit' },
  { value: 'paypal', label: 'PayPal' },
  { value: 'bank_transfer', label: 'Virement Bancaire' }
]

// Liste de pays (exemple) // MODIFIED
const countries = [
  // Country names kept in English - adjust if specific French names are needed
  'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France',
  'Japan', 'China', 'India', 'Brazil', // Add more as needed
  'Belgium', 'Switzerland' // Added some French-speaking countries
]

// Variables de calcul de la commande // MODIFIED
const taxRate = 0.08 // 8% tax - consider adjusting based on locale (e.g., TVA 20% in France)
const shipping = computed(() => {
  // Livraison gratuite pour les commandes supérieures à 100 € // MODIFIED: Comment and currency
  return cartStore.cartTotal >= 100 ? 0 : 10 // Shipping cost might need adjustment for locale
})
const tax = computed(() => {
  return cartStore.cartTotal * taxRate
})
const orderTotal = computed(() => {
  return cartStore.cartTotal + shipping.value + tax.value
})

// État du formulaire de validation // MODIFIED
const checkoutForm = ref({
  shipping: {
    fullName: '',
    address: '',
    city: '',
    postCode: '',
    country: '',
    phone: ''
  },
  payment: {
    method: 'credit_card',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  }
})

// Validation du formulaire // MODIFIED
const isFormValid = computed(() => {
  const { shipping, payment } = checkoutForm.value

  // Valider les champs d'expédition requis // MODIFIED
  if (!shipping.fullName || !shipping.address || !shipping.city ||
      !shipping.postCode || !shipping.country || !shipping.phone) {
    return false
  }

  // Valider les champs de paiement en fonction de la méthode // MODIFIED
  if (payment.method === 'credit_card') {
    if (!payment.cardName || !payment.cardNumber ||
        !payment.expiryDate || !payment.cvv) {
      return false
    }
  }

  return true
})

// État de traitement // MODIFIED
const isProcessing = ref(false)

// Formater la devise // MODIFIED
const formatCurrency = (amount) => {
  // MODIFIED: Locale and Currency
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount)
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

// Passer la commande // MODIFIED
const placeOrder = async () => {
  if (!isFormValid.value) {
    // MODIFIED
    toast.error('Veuillez remplir tous les champs obligatoires')
    return
  }

  if (!authStore.isAuthenticated) {
    // MODIFIED
    toast.error('Veuillez vous connecter pour passer une commande')
    router.push('/login?redirect=/checkout')
    return
  }

  isProcessing.value = true

  try {
    const { $pb } = useNuxtApp()

    // Créer d'abord la commande // MODIFIED
    const order = await cartStore.createOrder($pb, checkoutForm.value.shipping)

    // Créer l'enregistrement de paiement // MODIFIED
    await $pb.collection('payments').create({
      order: order.id,
      user: $pb.authStore.model.id,
      amount: orderTotal.value,
      paymentMethod: checkoutForm.value.payment.method,
      status: 'pending' // Assuming payment is confirmed later
    })

    // Afficher le message de succès // MODIFIED
    // MODIFIED
    toast.success('Commande passée avec succès !')

    // Rediriger vers la page de confirmation de commande // MODIFIED
    router.push(`/order-confirmation/${order.id}`)

  } catch (error) {
    // MODIFIED
    console.error('Erreur lors de la passation de la commande :', error)
    // MODIFIED
    toast.error('Une erreur s\'est produite lors de la passation de votre commande. Veuillez réessayer.')
  } finally {
    isProcessing.value = false
  }
}
</script>