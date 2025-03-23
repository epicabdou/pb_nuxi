<template>
  <div class="responsive-container section-padding">
    <!-- Page Header -->
    <div class="mb-10">
      <h1 class="heading-2 mb-4">Checkout</h1>
      <div class="flex items-center text-background-600">
        <NuxtLink to="/" class="hover:text-primary-500 transition-colors">Home</NuxtLink>
        <span class="mx-2">/</span>
        <NuxtLink to="/cart" class="hover:text-primary-500 transition-colors">Cart</NuxtLink>
        <span class="mx-2">/</span>
        <span class="text-primary-500">Checkout</span>
      </div>
    </div>

    <!-- Empty Cart Warning -->
    <div v-if="!cartStore.hasItems" class="card flex flex-col items-center py-16">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-20 h-20 text-background-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <h2 class="heading-3 mb-4">Your cart is empty</h2>
      <p class="body-regular text-background-600 mb-6">Add some items to your cart before checking out.</p>
      <NuxtLink to="/products" class="btn-primary">Continue Shopping</NuxtLink>
    </div>

    <!-- Checkout Form -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Shipping and Billing Information -->
      <div class="lg:col-span-2">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <!-- Shipping Information -->
          <div class="card">
            <h2 class="heading-4 mb-6">Shipping Information</h2>
            <form @submit.prevent class="space-y-4">
              <div>
                <label for="fullName" class="input-label">Full Name</label>
                <input
                    id="fullName"
                    v-model="checkoutForm.shipping.fullName"
                    type="text"
                    class="input-primary"
                    required
                />
              </div>
              <div>
                <label for="address" class="input-label">Address</label>
                <input
                    id="address"
                    v-model="checkoutForm.shipping.address"
                    type="text"
                    class="input-primary"
                    required
                />
              </div>
              <div>
                <label for="city" class="input-label">City</label>
                <input
                    id="city"
                    v-model="checkoutForm.shipping.city"
                    type="text"
                    class="input-primary"
                    required
                />
              </div>
              <div>
                <label for="postCode" class="input-label">Postal Code</label>
                <input
                    id="postCode"
                    v-model="checkoutForm.shipping.postCode"
                    type="text"
                    class="input-primary"
                    required
                />
              </div>
              <div>
                <label for="country" class="input-label">Country</label>
                <select
                    id="country"
                    v-model="checkoutForm.shipping.country"
                    class="select"
                    required
                >
                  <option value="">Select a country</option>
                  <option v-for="country in countries" :key="country" :value="country">
                    {{ country }}
                  </option>
                </select>
              </div>
              <div>
                <label for="phone" class="input-label">Phone</label>
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

          <!-- Payment Information -->
          <div class="card">
            <h2 class="heading-4 mb-6">Payment Information</h2>
            <form @submit.prevent class="space-y-4">
              <div>
                <label class="input-label">Payment Method</label>
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

              <!-- Credit Card Details (shown only when credit card is selected) -->
              <div v-if="checkoutForm.payment.method === 'credit_card'" class="space-y-4">
                <div>
                  <label for="cardName" class="input-label">Name on Card</label>
                  <input
                      id="cardName"
                      v-model="checkoutForm.payment.cardName"
                      type="text"
                      class="input-primary"
                      required
                  />
                </div>
                <div>
                  <label for="cardNumber" class="input-label">Card Number</label>
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
                    <label for="expiryDate" class="input-label">Expiry Date</label>
                    <input
                        id="expiryDate"
                        v-model="checkoutForm.payment.expiryDate"
                        type="text"
                        class="input-primary"
                        placeholder="MM/YY"
                        required
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

      <!-- Order Summary -->
      <div class="lg:col-span-1">
        <div class="card-fancy sticky top-24">
          <h2 class="heading-4 mb-6">Order Summary</h2>

          <!-- Cart Items Summary -->
          <div class="space-y-4 mb-6">
            <div v-for="item in cartStore.items" :key="item.id" class="flex items-center gap-4 py-3 border-b border-background-200">
              <div class="relative w-16 h-16 bg-background-100 rounded-md flex-shrink-0 overflow-hidden">
                <img v-if="item.image" :src="item.image" :alt="item.name" class="object-cover w-full h-full" />
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

          <!-- Cost Summary -->
          <div class="space-y-3 py-4 border-b border-t border-background-200">
            <div class="flex justify-between">
              <span class="text-background-600">Subtotal</span>
              <span class="font-medium">{{ formatCurrency(cartStore.cartTotal) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-background-600">Shipping</span>
              <span class="font-medium">{{ shipping > 0 ? formatCurrency(shipping) : 'Free' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-background-600">Tax ({{ taxRate * 100 }}%)</span>
              <span class="font-medium">{{ formatCurrency(tax) }}</span>
            </div>
          </div>

          <!-- Total -->
          <div class="flex justify-between items-center py-4 mb-6">
            <span class="text-lg font-bold">Total</span>
            <span class="text-xl font-bold">{{ formatCurrency(orderTotal) }}</span>
          </div>

          <!-- Place Order Button -->
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
              Processing...
            </span>
            <span v-else>Place Order</span>
          </button>

          <p class="text-xs text-background-500 text-center mt-4">
            By placing your order, you agree to our
            <a href="#" class="text-primary-500 hover:underline">Terms of Service</a> and
            <a href="#" class="text-primary-500 hover:underline">Privacy Policy</a>.
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

// Stores and composables
const cartStore = useCartStore()
const authStore = useAuthStore()
const toast = useToast()
const router = useRouter()

// Check if user is authenticated
onMounted(() => {
  if (!authStore.isAuthenticated) {
    toast.error('Please log in to proceed with checkout')
    router.push('/login?redirect=/checkout')
  }
})

// Payment methods
const paymentMethods = [
  { value: 'credit_card', label: 'Credit Card' },
  { value: 'paypal', label: 'PayPal' },
  { value: 'bank_transfer', label: 'Bank Transfer' }
]

// Country list (sample)
const countries = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'China',
  'India',
  'Brazil'
]

// Order calculation variables
const taxRate = 0.08 // 8% tax
const shipping = computed(() => {
  // Free shipping for orders over $100
  return cartStore.cartTotal >= 100 ? 0 : 10
})
const tax = computed(() => {
  return cartStore.cartTotal * taxRate
})
const orderTotal = computed(() => {
  return cartStore.cartTotal + shipping.value + tax.value
})

// Checkout form state
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

// Form validation
const isFormValid = computed(() => {
  const { shipping, payment } = checkoutForm.value

  // Validate required shipping fields
  if (!shipping.fullName || !shipping.address || !shipping.city ||
      !shipping.postCode || !shipping.country || !shipping.phone) {
    return false
  }

  // Validate payment fields based on method
  if (payment.method === 'credit_card') {
    if (!payment.cardName || !payment.cardNumber ||
        !payment.expiryDate || !payment.cvv) {
      return false
    }
  }

  return true
})

// Processing state
const isProcessing = ref(false)

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

// Place order
const placeOrder = async () => {
  if (!isFormValid.value) {
    toast.error('Please fill in all required fields')
    return
  }

  if (!authStore.isAuthenticated) {
    toast.error('Please log in to place an order')
    router.push('/login?redirect=/checkout')
    return
  }

  isProcessing.value = true

  try {
    const { $pb } = useNuxtApp()

    // Create order first
    const order = await cartStore.createOrder($pb, checkoutForm.value.shipping)

    // Create payment record
    await $pb.collection('payments').create({
      order: order.id,
      user: $pb.authStore.model.id,
      amount: orderTotal.value,
      paymentMethod: checkoutForm.value.payment.method,
      status: 'pending'
    })

    // Show success message
    toast.success('Order placed successfully!')

    // Redirect to order confirmation page
    router.push(`/order-confirmation/${order.id}`)

  } catch (error) {
    console.error('Error placing order:', error)
    toast.error('There was an error placing your order. Please try again.')
  } finally {
    isProcessing.value = false
  }
}
</script>