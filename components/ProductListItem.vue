<template>
  <div
      class="card group relative overflow-hidden transition-all duration-300 hover:shadow-modern"
      :class="{ 'opacity-75': product.stock <= 0 }"
  >
    <div class="flex flex-col sm:flex-row">
      <div class="relative sm:w-1/4 h-48 sm:h-auto overflow-hidden bg-background-100 dark:bg-background-900">
        <div class="absolute top-2 left-2 z-10 flex flex-col gap-2">
          <span
              v-if="product.isFeatured"
              class="badge-primary text-xs font-medium px-2 py-1"
          >
            En Vedette </span>
          <span
              v-if="isNewProduct"
              class="badge bg-secondary-500 text-white text-xs font-medium px-2 py-1"
          >
            Nouveau </span>
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
            Épuisé </span>
        </div>

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
      </div>

      <div class="sm:w-3/4 p-4 flex flex-col">
        <div class="flex justify-between items-start mb-2">
          <div v-if="showCategory && product.expand?.category" class="flex flex-wrap">
            <NuxtLink
                v-for="cat in getCategoryArray(product)"
                :key="cat.id"
                :to="`/categories/${cat.slug}`"
                class="text-xs text-background-500 hover:text-primary-600 mr-2"
            >
              {{ cat.name }}
            </NuxtLink>
          </div>

          <button
              @click.prevent="$emit('add-to-wishlist', product)"
              class="p-2 hover:bg-background-100 dark:hover:bg-background-800 rounded-full transition-colors"
              :class="{ 'text-error-500': isInWishlist, 'text-background-500': !isInWishlist }"
              aria-label="Ajouter à la liste de souhaits" >
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
        </div>

        <h3 class="text-xl font-medium mb-2">
          <NuxtLink :to="`/products/${product.slug}`" class="hover:text-primary-600 transition-colors">
            {{ product.name }}
          </NuxtLink>
        </h3>

        <p v-if="product.shortDescription && showDescription" class="text-sm text-background-600 dark:text-background-400 mb-3">
          {{ truncateDescription(product.shortDescription, 150) }}
        </p>

        <div v-if="showTags && product.expand?.tags && product.expand.tags.length" class="mb-3 flex flex-wrap gap-1">
          <NuxtLink
              v-for="tag in product.expand.tags"
              :key="tag.id"
              :to="`/tags/${tag.slug}`"
              class="text-xs bg-background-100 dark:bg-background-800 px-2 py-0.5 rounded-full text-background-600 dark:text-background-400 hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
          >
            {{ tag.name }}
          </NuxtLink>
        </div>

        <div class="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-baseline">
            <span
                v-if="hasDiscount"
                class="text-xl font-bold text-error-600 dark:text-error-500"
            >
              {{ formatPrice(product.promoPrice) }}
            </span>
            <span
                :class="{
                'text-xl font-bold': !hasDiscount,
                'text-base text-background-500 line-through ml-2': hasDiscount
              }"
            >
              {{ formatPrice(product.price) }}
            </span>
            <span
                v-if="product.stock > 0"
                class="ml-3 text-sm text-success-600 font-medium"
            >
              En Stock </span>
            <span
                v-else
                class="ml-3 text-sm text-error-600 font-medium"
            >
              Épuisé </span>
          </div>

          <div class="flex gap-2">
            <button
                @click.prevent="$emit('add-to-cart', product)"
                class="btn-primary py-2 px-4 text-sm"
                :disabled="product.stock <= 0"
                :class="{ 'opacity-50 cursor-not-allowed': product.stock <= 0 }"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Ajouter au Panier </button>
            <button
                @click="openQuickView"
                class="btn-outline py-2 px-4 text-sm"
            >
              Aperçu Rapide </button>
          </div>
        </div>
      </div>
    </div>

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
  // Configurations optionnelles // MODIFIED
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

// URL PocketBase depuis la config Nuxt // MODIFIED
const config = useRuntimeConfig()
const pocketbaseUrl = config.public?.pocketbaseUrl || ''

// État de l'aperçu rapide // MODIFIED
const showQuickView = ref(false)

// Propriétés calculées // MODIFIED
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
  // Considérer les produits de moins de 14 jours comme "nouveaux" // MODIFIED
  return diffDays <= 14
})

// Méthodes // MODIFIED
function getImageUrl(image, productId) {
  if (!image) return ''

  // Gérer différentes structures d'objet image depuis PocketBase // MODIFIED
  if (typeof image === 'string') {
    return `${pocketbaseUrl}/api/files/products/${productId}/${image}`
  } else if (image.url) {
    return image.url
  } else if (typeof image === 'object' && image.name) {
    // S'il s'agit d'un objet avec une propriété name (enregistrement étendu PocketBase) // MODIFIED
    return `${pocketbaseUrl}/api/files/products/${productId}/${image.name}`
  } else {
    // Repli - log pour le débogage // MODIFIED
    console.error('Format d\'image non géré :', image) // MODIFIED
    return ''
  }
}

function formatPrice(price) {
  if (!price && price !== 0) return ''
  // Assuming USD $, adjust if needed for French locale (e.g., 'DH', placement)
  return `${parseFloat(price).toFixed(2)} DH` // Kept $ for now, could be DH or moved
}

function getCategoryArray(product) {
  // Gérer à la fois une catégorie unique et un tableau de catégories // MODIFIED
  if (!product.expand?.category) return []

  if (Array.isArray(product.expand.category)) {
    return product.expand.category
  } else {
    return [product.expand.category]
  }
}

function truncateDescription(text, maxLength = 150) {
  if (!text) return '';
  if (text.length <= maxLength) return text;

  return text.substring(0, maxLength) + '...';
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