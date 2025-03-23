<template>
  <div class="card-fancy">
    <h2 class="heading-4 mb-6">Order Summary</h2>

    <!-- Cart Items Summary -->
    <div v-if="displayItems" class="space-y-4 mb-6">
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

    <!-- Action Button -->
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '~/stores/cart.js'

// Props
const props = defineProps({
  taxRate: {
    type: Number,
    default: 0.08 // 8% tax
  },
  displayItems: {
    type: Boolean,
    default: true
  }
})

// Stores
const cartStore = useCartStore()

// Computed values
const shipping = computed(() => {
  // Free shipping for orders over $100
  return cartStore.cartTotal >= 100 ? 0 : 10
})

const tax = computed(() => {
  return cartStore.cartTotal * props.taxRate
})

const orderTotal = computed(() => {
  return cartStore.cartTotal + shipping.value + tax.value
})

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}
</script>