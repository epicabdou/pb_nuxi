<template>
  <div
      class="card group relative overflow-hidden transition-all duration-300 hover:shadow-modern h-full flex flex-col"
      :class="{ 'opacity-75': product.stock <= 0 }"
  >
    <!-- Product badges -->
    <div class="absolute top-2 left-2 z-10 flex flex-col gap-2">
      <span
          v-if="product.isFeatured"
          class="badge-primary text-xs font-medium px-2 py-1"
      >
        Featured
      </span>
      <span
          v-if="isNewProduct"
          class="badge bg-secondary-500 text-white text-xs font-medium px-2 py-1"
      >
        New
      </span>
      <span
          v-if="hasDiscount"
          class="badge bg-error-500 text-white text-xs font-medium px-2 py-1"
      >
        -{{ discountPercentage }}%
      </span>
      <span
          v-if="product.stock <= 0"
          class="badge bg-background-600 text-white text-xs font-medium px-2 py-1"
      >
        Out of Stock
      </span>
    </div>

    <!-- Wishlist button -->
    <button
        @click.prevent="$emit('add-to-wishlist', product)"
        class="absolute top-2 right-2 z-10 p-2 bg-white dark:bg-background-800 rounded-full shadow-sm opacity-80 hover:opacity-100 transition-opacity"
        :class="{ 'text-error-500 hover:bg-error-50': isInWishlist, 'text-background-500 hover:bg-background-50': !isInWishlist }"
        aria-label="Add to wishlist"
    >
      <svg
          v-if="isInWishlist"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
      >
        <path
            fill-rule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clip-rule="evenodd"
        />
      </svg>
      <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
      >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>

    <!-- Image section -->
    <div class="relative h-48 md:h-52 mb-3 overflow-hidden bg-background-100 dark:bg-background-900">
      <NuxtLink :to="`/products/${product.slug}`" class="block h-full">
        <img
            v-if="product.image"
            :src="getImageUrl(product.image, product.id)"
            :alt="product.name"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div v-else class="w-full h-full flex items-center justify-center bg-background-200 dark:bg-background-800">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-background-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </NuxtLink>

      <!-- Quick view button -->
      <button
          @click="openQuickView"
          class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white py-2 text-sm font-medium opacity-0 transform translate-y-full transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
      >
        Quick View
      </button>
    </div>

    <!-- Product details -->
    <div class="flex flex-col flex-grow px-3 py-2">
      <!-- Category -->
      <div v-if="showCategory && product.expand?.category" class="mb-1">
        <NuxtLink
            v-for="cat in getCategoryArray(product)"
            :key="cat.id"
            :to="`/categories/${cat.slug}`"
            class="text-xs text-background-500 hover:text-primary-600 mr-2"
        >
          {{ cat.name }}
        </NuxtLink>
      </div>

      <!-- Title -->
      <h3 class="text-base md:text-lg font-medium mb-1 line-clamp-2">
        <NuxtLink :to="`/products/${product.slug}`" class="hover:text-primary-600 transition-colors">
          {{ product.name }}
        </NuxtLink>
      </h3>

      <!-- Short description -->
      <p v-if="product.shortDescription && showDescription" class="text-sm text-background-600 dark:text-background-400 mb-3 line-clamp-2">
        {{ product.shortDescription }}
      </p>

      <!-- Tags -->
      <div v-if="showTags && product.expand?.tags && product.expand.tags.length" class="mb-2 flex flex-wrap gap-1">
        <NuxtLink
            v-for="tag in product.expand.tags"
            :key="tag.id"
            :to="`/tags/${tag.slug}`"
            class="text-xs bg-background-100 dark:bg-background-800 px-2 py-0.5 rounded-full text-background-600 dark:text-background-400 hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
        >
          {{ tag.name }}
        </NuxtLink>
      </div>

      <!-- Spacer to push price and buttons to bottom -->
      <div class="flex-grow"></div>

      <!-- Price -->
      <div class="flex items-baseline mb-3">
        <span
            v-if="hasDiscount"
            class="text-lg font-bold text-error-600 dark:text-error-500"
        >
          {{ formatPrice(product.promoPrice) }}
        </span>
        <span
            :class="{
            'text-lg font-bold': !hasDiscount,
            'text-sm text-background-500 line-through ml-2': hasDiscount
          }"
        >
          {{ formatPrice(product.price) }}
        </span>
      </div>

      <!-- Buttons -->
      <div class="mt-auto flex gap-2">
        <button
            @click.prevent="$emit('add-to-cart', product)"
            class="btn-primary py-2 flex-grow text-sm"
            :disabled="product.stock <= 0"
            :class="{ 'opacity-50 cursor-not-allowed': product.stock <= 0 }"
        >
          <span v-if="product.stock <= 0">Out of Stock</span>
          <span v-else>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Add to Cart
          </span>
        </button>
        <button
            @click="openQuickView"
            class="btn-ghost p-2 text-background-600 dark:text-background-300"
            aria-label="Quick view"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Quick View Modal using the component -->
    <QuickViewModal
        :show="showQuickView"
        :product="product"
        :is-in-wishlist="isInWishlist"
        @close="closeQuickView"
        @add-to-cart="handleQuickViewAddToCart"
        @toggle-wishlist="$emit('add-to-wishlist', product)"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import QuickViewModal from '~/components/QuickViewModal.vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  isInWishlist: {
    type: Boolean,
    default: false
  },
  // Optional configurations
  showCategory: {
    type: Boolean,
    default: true
  },
  showDescription: {
    type: Boolean,
    default: true
  },
  showTags: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['add-to-cart', 'add-to-wishlist'])

// PocketBase URL from Nuxt config
const config = useRuntimeConfig()
const pocketbaseUrl = config.public?.pocketbaseUrl || ''

// Quick view state
const showQuickView = ref(false)

// Computed properties
const hasDiscount = computed(() => {
  return props.product.promoPrice && props.product.promoPrice < props.product.price
})

const discountPercentage = computed(() => {
  if (!hasDiscount.value) return 0
  const discount = props.product.price - props.product.promoPrice
  return Math.round((discount / props.product.price) * 100)
})

const isNewProduct = computed(() => {
  if (!props.product.created) return false
  const createdDate = new Date(props.product.created)
  const now = new Date()
  const diffTime = Math.abs(now - createdDate)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays <= 14 // Consider products newer than 14 days as "new"
})

// Methods
function getImageUrl(image, productId) {
  if (!image) return ''

  // Handle different image object structures from PocketBase
  if (typeof image === 'string') {
    return `${pocketbaseUrl}/api/files/products/${productId}/${image}`
  } else if (image.url) {
    return image.url
  } else if (typeof image === 'object' && image.name) {
    // If it's an object with a name property (PocketBase expanded record)
    return `${pocketbaseUrl}/api/files/products/${productId}/${image.name}`
  } else {
    // Fallback - log for debugging
    console.error('Unhandled image format:', image)
    return ''
  }
}

function formatPrice(price) {
  if (!price && price !== 0) return ''
  return `$${parseFloat(price).toFixed(2)}`
}

function getCategoryArray(product) {
  // Handle both single category and array of categories
  if (!product.expand?.category) return []

  if (Array.isArray(product.expand.category)) {
    return product.expand.category
  } else {
    return [product.expand.category]
  }
}

function openQuickView() {
  showQuickView.value = true
}

function closeQuickView() {
  showQuickView.value = false
}

function handleQuickViewAddToCart(productWithQuantity) {
  emit('add-to-cart', productWithQuantity)
}
</script>

<style scoped>
/* Line clamp utilities */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>