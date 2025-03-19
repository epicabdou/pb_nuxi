<template>
  <Teleport to="body">
    <div
        v-if="show"
        class="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300"
        @click.self="closeModal"
    >
      <div
          class="bg-white dark:bg-background-800 rounded-2xl shadow-fancy w-full max-w-4xl max-h-[90vh] overflow-auto transition-standard animate-slide-up"
          ref="modalRef"
      >
        <div class="relative">
          <!-- Close button -->
          <button
              @click="closeModal"
              class="absolute top-4 right-4 z-10 p-2 rounded-full bg-white dark:bg-background-800 shadow-md text-background-700 dark:text-background-300 hover:bg-background-100 dark:hover:bg-background-700 hover:text-background-900 dark:hover:text-white transition-colors"
              aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="flex flex-col md:flex-row">
            <!-- Product image gallery with improved styling -->
            <div class="md:w-1/2 p-6">
              <div class="aspect-w-1 aspect-h-1 bg-background-50 dark:bg-background-900 rounded-xl overflow-hidden mb-4 shadow-soft">
                <img
                    :src="getImageUrl(currentImage || product.image, product.id)"
                    :alt="product.name"
                    class="w-full h-full object-cover transition-standard hover:scale-105"
                />
              </div>
              <!-- Thumbnails gallery with improved styling -->
              <div class="flex gap-3 overflow-x-auto py-2 px-1" v-if="product.gallery && product.gallery.length">
                <!-- Main product image -->
                <button
                    @click="currentImage = product.image"
                    class="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all duration-200 hover:shadow-md"
                    :class="!currentImage ? 'border-primary-500 shadow-md' : 'border-transparent'"
                >
                  <img
                      :src="getImageUrl(product.image, product.id)"
                      :alt="product.name"
                      class="w-full h-full object-cover"
                  />
                </button>
                <!-- Additional gallery images -->
                <button
                    v-for="(image, index) in product.gallery"
                    :key="index"
                    @click="currentImage = image"
                    class="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all duration-200 hover:shadow-md"
                    :class="currentImage === image ? 'border-primary-500 shadow-md' : 'border-transparent'"
                >
                  <img
                      :src="getImageUrl(image, product.id)"
                      :alt="`${product.name} ${index + 1}`"
                      class="w-full h-full object-cover"
                  />
                </button>
              </div>
            </div>

            <!-- Product details with improved spacing and typography -->
            <div class="md:w-1/2 p-6 md:p-8">
              <!-- Category links -->
              <div v-if="product.expand?.category" class="mb-3 flex flex-wrap">
                <NuxtLink
                    v-for="cat in getCategoryArray(product)"
                    :key="cat.id"
                    :to="`/categories/${cat.slug}`"
                    class="text-sm text-background-500 hover:text-primary-600 mr-2 transition-colors"
                >
                  <span class="inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {{ cat.name }}
                  </span>
                </NuxtLink>
              </div>

              <!-- Product name with improved typography -->
              <h2 class="text-3xl font-bold mb-3 text-background-900 dark:text-white">{{ product.name }}</h2>

              <!-- Rating - This could be integrated with your review system -->
              <div class="flex items-center mb-4" v-if="showRatings">
                <div class="flex text-yellow-500">
                  <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span class="text-background-500 ml-2 text-sm">(0 reviews)</span>
              </div>

              <!-- Price with improved styling -->
              <div class="flex items-baseline mb-6 bg-background-50 dark:bg-background-900 rounded-lg p-3">
                <span
                    v-if="hasDiscount"
                    class="text-2xl font-bold text-error-600 dark:text-error-500"
                >
                  {{ formatPrice(product.promoPrice) }}
                </span>
                <span
                    :class="{
                    'text-2xl font-bold text-background-900 dark:text-white': !hasDiscount,
                    'text-lg text-background-500 line-through ml-2': hasDiscount
                  }"
                >
                  {{ formatPrice(product.price) }}
                </span>
                <span
                    v-if="hasDiscount"
                    class="ml-3 text-sm bg-error-100 dark:bg-error-900 text-error-700 dark:text-error-300 px-3 py-1 rounded-full"
                >
                  Save {{ discountPercentage }}%
                </span>
              </div>

              <!-- Availability with improved styling -->
              <div class="mb-6">
                <span
                    class="inline-flex items-center text-sm font-medium rounded-full px-3 py-1"
                    :class="product.stock > 0 ? 'bg-success-50 dark:bg-success-900/30 text-success-700 dark:text-success-300' : 'bg-error-50 dark:bg-error-900/30 text-error-700 dark:text-error-300'"
                >
                  <span
                      class="w-2 h-2 rounded-full mr-1.5"
                      :class="product.stock > 0 ? 'bg-success-600' : 'bg-error-600'"
                  ></span>
                  {{ product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock' }}
                </span>
              </div>

              <!-- Short description with character limit -->
              <div class="prose dark:prose-invert mb-6 text-background-700 dark:text-background-300">
                <div>
                  <template v-if="isDescriptionTruncated">
                    <p v-html="truncatedDescription" class="inline"></p>
                    <button
                        @click="expandDescription = !expandDescription"
                        class="text-primary-600 hover:text-primary-700 font-medium text-sm ml-1 focus:outline-none focus:underline"
                    >
                      {{ expandDescription ? 'Show less' : 'Read more' }}
                    </button>
                  </template>
                  <p v-else>{{ product.shortDescription }}</p>
                </div>
              </div>

              <!-- Tags with improved styling -->
              <div v-if="product.expand?.tags && product.expand.tags.length" class="mb-6">
                <div class="text-sm font-medium mb-2 text-background-700 dark:text-background-300">Tags:</div>
                <div class="flex flex-wrap gap-2">
                  <NuxtLink
                      v-for="tag in product.expand.tags"
                      :key="tag.id"
                      :to="`/tags/${tag.slug}`"
                      class="text-xs bg-background-100 dark:bg-background-800 px-3 py-1.5 rounded-full text-background-600 dark:text-background-400 hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                  >
                    {{ tag.name }}
                  </NuxtLink>
                </div>
              </div>

              <!-- Actions with improved styling -->
              <div class="space-y-5">
                <!-- Quantity selector with improved styling -->
                <div class="flex items-center" v-if="product.stock > 0">
                  <label :for="`quantity-${modalId}`" class="text-sm font-medium mr-4 text-background-700 dark:text-background-300">Quantity:</label>
                  <div class="flex items-center border border-background-300 dark:border-background-600 rounded-lg overflow-hidden shadow-sm">
                    <button
                        @click.prevent="decrementQuantity"
                        class="px-4 py-2 text-background-600 hover:text-background-800 dark:text-background-400 dark:hover:text-white hover:bg-background-100 dark:hover:bg-background-700 transition-colors"
                        :disabled="quantity <= 1"
                        :class="{ 'opacity-50 cursor-not-allowed': quantity <= 1 }"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                      </svg>
                    </button>
                    <input
                        type="number"
                        :id="`quantity-${modalId}`"
                        v-model="quantity"
                        min="1"
                        :max="product.stock"
                        class="w-12 text-center border-x border-background-300 dark:border-background-600 py-2 focus:outline-none dark:bg-background-800 dark:text-white"
                    />
                    <button
                        @click.prevent="incrementQuantity"
                        class="px-4 py-2 text-background-600 hover:text-background-800 dark:text-background-400 dark:hover:text-white hover:bg-background-100 dark:hover:bg-background-700 transition-colors"
                        :disabled="quantity >= product.stock"
                        :class="{ 'opacity-50 cursor-not-allowed': quantity >= product.stock }"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Add to cart / Wishlist buttons with improved styling -->
                <div class="flex flex-col sm:flex-row gap-3">
                  <button
                      @click.prevent="addToCartWithQuantity"
                      class="btn-primary py-3 flex-grow flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                      :disabled="product.stock <= 0"
                      :class="{ 'opacity-50 cursor-not-allowed': product.stock <= 0 }"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span v-if="product.stock <= 0">Out of Stock</span>
                    <span v-else>Add to Cart</span>
                  </button>
                  <button
                      @click.prevent="toggleWishlist"
                      class="btn-outline py-3 flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-1"
                      :class="{ 'text-error-600 border-error-600 hover:bg-error-50 dark:text-error-400 dark:border-error-400 dark:hover:bg-error-900': isInWishlist }"
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
                    {{ isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist' }}
                  </button>
                </div>

                <!-- View full details link with improved styling -->
                <div class="text-center pt-2">
                  <NuxtLink
                      :to="`/products/${product.slug}`"
                      class="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors group"
                  >
                    View Full Details
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { onClickOutside } from '@vueuse/core'

// Unique ID for quantity input to prevent duplicate IDs
const modalId = ref(Math.random().toString(36).substring(2, 9))

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  product: {
    type: Object,
    required: true
  },
  isInWishlist: {
    type: Boolean,
    default: false
  },
  showRatings: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'add-to-cart', 'toggle-wishlist'])

// PocketBase URL from Nuxt config
const config = useRuntimeConfig()
const pocketbaseUrl = config.public?.pocketbaseUrl || ''

// State
const modalRef = ref(null)
const currentImage = ref(null)
const quantity = ref(1)
const expandDescription = ref(false)

// Set description character limit
const DESCRIPTION_LIMIT = 120

// Computed properties
const hasDiscount = computed(() => {
  return props.product.promoPrice && props.product.promoPrice < props.product.price
})

const discountPercentage = computed(() => {
  if (!hasDiscount.value) return 0
  const discount = props.product.price - props.product.promoPrice
  return Math.round((discount / props.product.price) * 100)
})

// Check if description needs truncation
const isDescriptionTruncated = computed(() => {
  return props.product.shortDescription && props.product.shortDescription.length > DESCRIPTION_LIMIT
})

// Get truncated description
const truncatedDescription = computed(() => {
  if (!props.product.shortDescription) return ''

  if (expandDescription.value) {
    return props.product.shortDescription
  }

  // Make sure we don't cut words in the middle
  const truncated = props.product.shortDescription.substring(0, DESCRIPTION_LIMIT)
  const lastSpaceIndex = truncated.lastIndexOf(' ')

  // If there's no space or it's at the beginning, just use the character limit
  const breakPoint = lastSpaceIndex > 10 ? lastSpaceIndex : DESCRIPTION_LIMIT

  return props.product.shortDescription.substring(0, breakPoint) + '...'
})

// Methods
function closeModal() {
  emit('close')
}

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

function incrementQuantity() {
  if (quantity.value < props.product.stock) {
    quantity.value++
  }
}

function decrementQuantity() {
  if (quantity.value > 1) {
    quantity.value--
  }
}

function addToCartWithQuantity() {
  if (props.product.stock <= 0) return

  const productWithQuantity = {
    ...props.product,
    quantity: quantity.value
  }

  emit('add-to-cart', productWithQuantity)
  closeModal()
}

function toggleWishlist() {
  emit('toggle-wishlist', props.product)
}

// Handlers for modal behaviors
onMounted(() => {
  // Handle click outside
  if (modalRef.value) {
    onClickOutside(modalRef, () => {
      closeModal()
    })
  }

  // Handle escape key
  const handleEscape = (e) => {
    if (e.key === 'Escape' && props.show) {
      closeModal()
    }
  }

  document.addEventListener('keydown', handleEscape)

  // Prevent body scroll when modal is open
  if (props.show) {
    document.body.style.overflow = 'hidden'
  }

  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
    document.body.style.overflow = ''
  })
})

// Watch for show prop changes to manage body scroll
watch(() => props.show, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
    // Reset state on open
    currentImage.value = null
    quantity.value = 1
    expandDescription.value = false
  } else {
    document.body.style.overflow = ''
  }
})

// Watch for product changes to reset internal state
watch(() => props.product, () => {
  currentImage.value = null
  quantity.value = 1
  expandDescription.value = false
})
</script>

<style scoped>
/* Ensure proper aspect ratio for images */
.aspect-w-1 {
  position: relative;
  padding-bottom: 100%;
}

.aspect-w-1 > * {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

/* Hide input number spinner */
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number] {
  -moz-appearance: textfield;
}
</style>