<!-- components/ProductCard.vue -->
<template>
  <div
    class="card-natural group relative overflow-hidden transition-all duration-500 hover:shadow-warm h-full flex flex-col transform hover:-translate-y-2"
    :class="{ 
      'opacity-75 grayscale': product.stock <= 0,
      'animate-fade-in-up': enhanced
    }"
  >
    <!-- Enhanced Badge Section -->
    <div class="absolute top-3 left-3 z-20 flex flex-col gap-2">
      <span
        v-if="product.isFeatured"
        class="badge-natural text-xs font-semibold px-3 py-1 shadow-natural"
      >
        Bestseller
      </span>
      <span
        v-if="isNewProduct"
        class="badge-eucalyptus text-xs font-semibold px-3 py-1 shadow-natural animate-pulse"
      >
        Nouveau
      </span>
      <span
        v-if="hasDiscount"
        class="badge-organic text-xs font-bold px-3 py-1 shadow-natural"
      >
        -{{ discountPercentage }}%
      </span>
      <span
        v-if="product.stock <= 0"
        class="badge bg-background-600 text-white text-xs font-semibold px-3 py-1 shadow-natural"
      >
        Épuisé
      </span>
      <span
        v-if="isLimitedStock"
        class="badge bg-secondary-500 text-white text-xs font-semibold px-3 py-1 shadow-natural animate-bounce"
      >
        Stock Limité
      </span>
    </div>

    <!-- Enhanced Wishlist Button -->
    <button
      @click.prevent="$emit('add-to-wishlist', product)"
      class="absolute top-3 right-3 z-20 w-10 h-10 bg-background-50/95 dark:bg-background-800/95 backdrop-blur-sm rounded-full shadow-natural opacity-80 hover:opacity-100 transition-all duration-300 flex items-center justify-center group/wishlist hover:scale-110"
      :class="{ 
        'text-secondary-500 bg-secondary-50 dark:bg-secondary-900/20': isInWishlist, 
        'text-background-500 hover:text-secondary-500': !isInWishlist 
      }"
      aria-label="Ajouter à la liste de souhaits"
    >
      <svg
        v-if="isInWishlist"
        class="w-5 h-5 transition-transform duration-300 group-hover/wishlist:scale-110"
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
        class="w-5 h-5 transition-transform duration-300 group-hover/wishlist:scale-110"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>

    <!-- Enhanced Image Section -->
    <div class="relative h-56 md:h-60 mb-4 overflow-hidden rounded-soft bg-gradient-to-br from-eucalyptus-50 to-cream-50 dark:from-eucalyptus-900/10 dark:to-cream-900/10">
      <NuxtLink :to="`/products/${product.slug}`" class="block h-full group/image">
        <img
          v-if="product.image"
          :src="getImageUrl(product.image, product.id)"
          :alt="product.name"
          class="w-full h-full object-cover transition-all duration-500 group-hover/image:scale-110"
          @error="handleImageError"
        />
        <div v-else class="w-full h-full flex items-center justify-center">
          <div class="w-24 h-24 rounded-organic bg-gradient-to-br from-eucalyptus-200 to-primary-200 flex items-center justify-center">
            <svg class="w-12 h-12 text-eucalyptus-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        
        <!-- Image Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-background-900/20 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
      </NuxtLink>

      <!-- Enhanced Quick View Button -->
      <button
        @click="openQuickView"
        class="absolute bottom-3 left-3 right-3 bg-background-50/95 dark:bg-background-800/95 backdrop-blur-sm text-primary-700 dark:text-primary-300 py-3 px-4 rounded-soft text-sm font-semibold opacity-0 transform translate-y-full transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-eucalyptus-50 dark:hover:bg-eucalyptus-900/20 flex items-center justify-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        Aperçu Rapide
      </button>

      <!-- Rating Stars Overlay -->
      <div v-if="averageRating > 0 || isLoadingReviews" class="absolute top-3 left-3 flex items-center gap-1 bg-background-50/95 dark:bg-background-800/95 backdrop-blur-sm px-3 py-1 rounded-soft opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div v-if="isLoadingReviews" class="flex items-center gap-1">
          <div class="loading-shimmer w-12 h-3 rounded"></div>
        </div>
        <div v-else class="flex items-center gap-1">
          <div class="flex">
            <svg v-for="i in 5" :key="i" 
                 :class="[
                   'w-3 h-3',
                   i <= Math.floor(averageRating) ? 'text-cream-500' : 'text-background-300'
                 ]" 
                 fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <span class="text-xs font-medium text-background-700 dark:text-background-300">
            {{ averageRating.toFixed(1) }}
          </span>
          <span class="text-xs text-background-500 dark:text-background-400">
            ({{ totalReviews }})
          </span>
        </div>
      </div>
    </div>

    <!-- Enhanced Content Section -->
    <div class="flex flex-col flex-grow px-4 pb-4">
      <!-- Category Tags -->
      <div v-if="showCategory && product.expand?.category" class="mb-2">
        <NuxtLink
          v-for="cat in getCategoryArray(product)"
          :key="cat.id"
          :to="`/categories/${cat.slug}`"
          class="inline-flex items-center text-xs bg-eucalyptus-100 dark:bg-eucalyptus-900/20 text-eucalyptus-700 dark:text-eucalyptus-300 px-2 py-1 rounded-full hover:bg-eucalyptus-200 dark:hover:bg-eucalyptus-900/40 transition-colors mr-2"
        >
          {{ cat.name }}
        </NuxtLink>
      </div>

      <!-- Product Title -->
      <h3 class="text-lg md:text-xl font-display font-bold mb-2 line-clamp-2 h-14 flex items-center">
        <NuxtLink :to="`/products/${product.slug}`" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors leading-tight">
          {{ truncateText(product.name, 50) }}
        </NuxtLink>
      </h3>

      <!-- Product Description -->
      <p v-if="product.shortDescription && showDescription" class="text-sm text-background-600 dark:text-background-400 mb-3 line-clamp-2 h-10 leading-relaxed">
        {{ truncateText(product.shortDescription, 80) }}
      </p>

      <!-- Ingredients Preview -->
      <!--div v-if="productIngredients.length > 0" class="mb-3">
        <div class="flex flex-wrap gap-1">
          <span
            v-for="ingredient in productIngredients.slice(0, 3)"
            :key="ingredient"
            class="text-xs bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 px-2 py-1 rounded-full font-medium"
          >
            {{ ingredient }}
          </span>
          <span v-if="productIngredients.length > 3" class="text-xs text-background-500 dark:text-background-400 px-2 py-1">
            +{{ productIngredients.length - 3 }} autres
          </span>
        </div>
      </div-->

      <!-- Customer Reviews Preview (New Section) -->
      <div v-if="productReviews.length > 0" class="mb-3">
        <div class="bg-eucalyptus-50 dark:bg-eucalyptus-900/10 rounded-soft p-3">
          <div class="flex items-center gap-2 mb-2">
            <div class="flex">
              <svg v-for="i in 5" :key="i" 
                   :class="[
                     'w-3 h-3',
                     i <= Math.floor(averageRating) ? 'text-cream-500' : 'text-background-300'
                   ]" 
                   fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <span class="text-xs font-semibold text-eucalyptus-700 dark:text-eucalyptus-300">
              {{ averageRating.toFixed(1) }}/5
            </span>
            <span class="text-xs text-eucalyptus-600 dark:text-eucalyptus-400">
              ({{ reviewsText }})
            </span>
          </div>
          
          <!-- Latest Review Preview -->
          <!--div v-if="productReviews[0]" class="text-xs text-eucalyptus-600 dark:text-eucalyptus-400 italic">
            "{{ truncateText(productReviews[0].comment || productReviews[0].content, 60) }}"
            <span class="font-medium">
              - {{ productReviews[0].expand?.user?.name || 'Client Vérifié' }}
            </span>
          </div-->
        </div>
      </div>

      <!-- Loading Reviews State -->
      <div v-else-if="isLoadingReviews" class="mb-3">
        <div class="bg-eucalyptus-50 dark:bg-eucalyptus-900/10 rounded-soft p-3">
          <div class="loading-shimmer h-4 rounded mb-2"></div>
          <div class="loading-shimmer h-3 rounded w-3/4"></div>
        </div>
      </div>
      <div v-if="showTags && product.expand?.tags && product.expand.tags.length" class="mb-3 flex flex-wrap gap-1">
        <NuxtLink
          v-for="tag in product.expand.tags.slice(0, 3)"
          :key="tag.id"
          :to="`/tags/${tag.slug}`"
          class="text-xs bg-background-100 dark:bg-background-800 px-2 py-1 rounded-full text-background-600 dark:text-background-400 hover:bg-eucalyptus-100 dark:hover:bg-eucalyptus-900/20 hover:text-eucalyptus-700 dark:hover:text-eucalyptus-300 transition-colors"
        >
          {{ tag.name }}
        </NuxtLink>
      </div>

      <!-- Spacer -->
      <div class="flex-grow"></div>

      <!-- Enhanced Pricing Section -->
      <div class="mb-4">
        <div class="flex items-baseline justify-between">
          <div class="flex items-baseline gap-2">
            <span
              v-if="hasDiscount"
              class="text-xl md:text-2xl font-bold text-secondary-600 dark:text-secondary-400"
            >
              {{ product.promoPrice }}€
            </span>
            <span
              :class="{
                'text-xl md:text-2xl font-bold text-primary-700 dark:text-primary-300': !hasDiscount,
                'text-sm text-background-500 line-through': hasDiscount
              }"
            >
              {{ product.price }}€
            </span>
          </div>
          
          <!-- Stock Indicator -->
          <div v-if="product.stock <= 10 && product.stock > 0" class="text-right">
            <span class="text-xs text-secondary-600 dark:text-secondary-400 font-medium">
              {{ product.stock }} restant{{ product.stock > 1 ? 's' : '' }}
            </span>
          </div>
        </div>
        
        <!-- Savings Display -->
        <div v-if="hasDiscount" class="mt-2 flex items-center justify-between">
          <span class="text-xs bg-secondary-100 dark:bg-secondary-900/20 text-secondary-700 dark:text-secondary-300 px-2 py-1 rounded-full font-medium">
            Économisez {{ (product.price - product.promoPrice) / product.price * 100 }}%
          </span>
          
          <!-- Review Count for Mobile -->
          <div v-if="totalReviews > 0" class="md:hidden">
            <div class="flex items-center gap-1">
              <svg class="w-3 h-3 text-cream-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span class="text-xs text-eucalyptus-600 dark:text-eucalyptus-400 font-medium">
                {{ averageRating.toFixed(1) }} ({{ totalReviews }})
              </span>
            </div>
          </div>
        </div>
        
        <!-- Review Count Display (when no discount) -->
        <div v-else-if="totalReviews > 0" class="mt-2">
          <div class="flex items-center gap-1">
            <div class="flex">
              <svg v-for="i in 5" :key="i" 
                   :class="[
                     'w-3 h-3',
                     i <= Math.floor(averageRating) ? 'text-cream-500' : 'text-background-300'
                   ]" 
                   fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <span class="text-xs text-eucalyptus-600 dark:text-eucalyptus-400 font-medium">
              {{ averageRating.toFixed(1) }} ({{ reviewsText }})
            </span>
          </div>
        </div>
      </div>

      <!-- Enhanced Action Buttons -->
      <div class="flex gap-2">
        <button
          @click.prevent="handleAddToCart"
          class="flex-1 group/button transition-all duration-300"
          :class="[
            product.stock <= 0 
              ? 'btn-ghost opacity-50 cursor-not-allowed' 
              : 'btn-primary hover:shadow-warm'
          ]"
          :disabled="product.stock <= 0"
        >
          <span v-if="product.stock <= 0" class="flex items-center justify-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
            </svg>
            Épuisé
          </span>
          <span v-else class="flex items-center justify-center gap-2">
            <svg class="w-4 h-4 transition-transform duration-300 group-hover/button:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span class="font-medium">Ajouter</span>
          </span>
        </button>
        
        <button
          @click="openQuickView"
          class="btn-outline border-eucalyptus-500 text-eucalyptus-700 hover:bg-eucalyptus-500 hover:text-white p-3 group/quick"
          aria-label="Aperçu rapide"
        >
          <svg class="w-5 h-5 transition-transform duration-300 group-hover/quick:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
      </div>

      <!-- Enhanced Product Benefits -->
      <div v-if="productBenefits.length > 0" class="mt-3 pt-3 border-t border-background-200 dark:border-background-700">
        <div class="space-y-1">
          <div
            v-for="(benefit, index) in productBenefits.slice(0, 2)"
            :key="index"
            class="flex items-center gap-2 text-xs text-eucalyptus-600 dark:text-eucalyptus-400"
          >
            <svg class="w-3 h-3 text-eucalyptus-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            <span>{{ benefit }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Quick View Modal -->
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
import { ref, computed, watch } from 'vue'
import { useToast } from '~/composables/useToast'
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
  enhanced: {
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

const emit = defineEmits(['add-to-cart', 'add-to-wishlist', 'quick-view'])

// Composables
const toast = useToast()

// PocketBase URL from Nuxt config
const config = useRuntimeConfig()
const pocketbaseUrl = config.public?.pocketbaseUrl || ''

// Quick view state
const showQuickView = ref(false)

// Reviews data
const productReviews = ref([])
const isLoadingReviews = ref(false)
const reviewsLoaded = ref(false)

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
  return diffDays <= 14
})

const isLimitedStock = computed(() => {
  return props.product.stock > 0 && props.product.stock <= 5
})

const averageRating = computed(() => {
  if (productReviews.value.length === 0) return 0
  
  const sum = productReviews.value.reduce((acc, review) => acc + (review.rating || 0), 0)
  return sum / productReviews.value.length
})

const totalReviews = computed(() => {
  return productReviews.value.length
})

const reviewsText = computed(() => {
  const count = totalReviews.value
  if (count === 0) return 'Aucun avis'
  if (count === 1) return '1 avis'
  return `${count} avis`
})

const productIngredients = computed(() => {
  // Mock ingredients based on product name or actual ingredients field
  const defaultIngredients = ['Eucalyptus Bio', 'Sel de Mer', 'Huile de Coco', 'Beurre de Karité', 'Vitamine E']
  return props.product.ingredients || defaultIngredients.slice(0, Math.floor(Math.random() * 3) + 2)
})

const productBenefits = computed(() => {
  // Mock benefits or actual benefits field
  const defaultBenefits = [
    'Hydratation longue durée',
    'Exfoliation douce',
    'Parfum naturel relaxant',
    'Convient aux peaux sensibles'
  ]
  return props.product.benefits || defaultBenefits.slice(0, 2)
})

// Fetch product reviews from PocketBase
const fetchProductReviews = async (productId) => {
  if (!productId || reviewsLoaded.value) return
  
  isLoadingReviews.value = true
  
  try {
    const { $pb } = useNuxtApp()
    
    const reviews = await $pb.collection('reviews').getList(1, 50, {
      filter: `product = "${productId}"`,
      sort: '-created',
      expand: 'user'
    })
    
    productReviews.value = reviews.items
    reviewsLoaded.value = true
    
  } catch (error) {
    console.error('Error fetching product reviews:', error)
    // Set empty array on error
    productReviews.value = []
  } finally {
    isLoadingReviews.value = false
  }
}

// Watch for product changes to fetch reviews
watch(() => props.product.id, (newProductId) => {
  if (newProductId) {
    reviewsLoaded.value = false
    productReviews.value = []
    fetchProductReviews(newProductId)
  }
}, { immediate: true })
function getImageUrl(image, productId) {
  if (!image) return ''

  // Handle different image object structures from PocketBase
  if (typeof image === 'string') {
    return `${pocketbaseUrl}/api/files/products/${productId}/${image}`
  } else if (image.url) {
    return image.url
  } else if (typeof image === 'object' && image.name) {
    return `${pocketbaseUrl}/api/files/products/${productId}/${image.name}`
  } else {
    console.error('Unhandled image format:', image)
    return ''
  }
}

function handleImageError(event) {
  // Hide the broken image
  event.target.style.display = 'none'
}

function formatPrice(price) {
  if (!price && price !== 0) return '0.00'
  return (price / 100).toFixed(2)
}

function truncateText(text, maxLength) {
  if (!text) return ''
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

function getCategoryArray(product) {
  if (!product.expand?.category) return []

  if (Array.isArray(product.expand.category)) {
    return product.expand.category
  } else {
    return [product.expand.category]
  }
}

function handleAddToCart() {
  if (props.product.stock <= 0) return
  
  emit('add-to-cart', props.product)
  toast.success(`${props.product.name} ajouté au panier`)
}

function openQuickView() {
  showQuickView.value = true
  emit('quick-view', props.product)
}

function closeQuickView() {
  showQuickView.value = false
}

function handleQuickViewAddToCart(productWithQuantity) {
  emit('add-to-cart', productWithQuantity)
  closeQuickView()
}
</script>

<style scoped>
/* Enhanced line clamp utilities */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Custom hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:translate-y-0 {
  transform: translateY(0);
}

/* Enhanced card animations */
.card-natural {
  background: theme('colors.background.50');
  border: 1px solid theme('colors.background.200');
}

.dark .card-natural {
  background: theme('colors.background.800');
  border-color: theme('colors.background.700');
}

.card-natural:hover {
  border-color: theme('colors.eucalyptus.300');
}

.dark .card-natural:hover {
  border-color: theme('colors.eucalyptus.600');
}

/* Enhanced button animations */
.group\/button:hover .group-hover\/button\:scale-110 {
  transform: scale(1.1);
}

.group\/quick:hover .group-hover\/quick\:scale-110 {
  transform: scale(1.1);
}

.group\/wishlist:hover .group-hover\/wishlist\:scale-110 {
  transform: scale(1.1);
}

/* Image zoom effect */
.group\/image:hover img {
  transform: scale(1.1);
}

/* Stock indicator animation */
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 5px theme('colors.secondary.400');
  }
  50% {
    box-shadow: 0 0 20px theme('colors.secondary.400');
  }
}

.animate-bounce {
  animation: pulse-glow 2s infinite;
}

/* Enhanced focus states */
button:focus-visible {
  outline: 2px solid theme('colors.eucalyptus.400');
  outline-offset: 2px;
  border-radius: theme('borderRadius.soft');
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: transform, opacity, background-color, border-color, box-shadow;
}

/* Loading shimmer effect */
@keyframes shimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

.loading-shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: shimmer 1.5s infinite;
}
</style>