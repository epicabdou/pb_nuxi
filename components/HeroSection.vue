<!-- components/HeroSection.vue -->
<template>
  <section class="relative min-h-screen overflow-hidden bg-natural-texture bg-gradient-to-br from-background-50 via-cream-50 to-eucalyptus-50 dark:from-background-900 dark:via-background-800 dark:to-eucalyptus-900/20">
    <!-- Organic Background Elements -->
    <div class="absolute inset-0">
      <!-- Floating organic shapes -->
      <div class="absolute top-20 right-1/4 w-72 h-72 bg-gradient-to-br from-eucalyptus-200/30 to-primary-200/30 rounded-organic animate-float opacity-60"></div>
      <div class="absolute bottom-32 left-1/3 w-96 h-96 bg-gradient-to-br from-cream-200/40 to-secondary-200/40 rounded-organic animate-gentle-bounce opacity-50 animation-delay-1000"></div>
      <div class="absolute top-1/3 left-12 w-48 h-48 bg-gradient-to-br from-primary-200/25 to-eucalyptus-300/25 rounded-organic animate-float opacity-70 animation-delay-2000"></div>
      
      <!-- Subtle texture overlay -->
      <div class="absolute inset-0 bg-organic-texture opacity-20"></div>
    </div>

    <div class="responsive-container relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen py-16">
        <!-- Content Side -->
        <div class="space-y-8 animate-fade-in-up">
          <!-- Premium Badge -->
          <div class="inline-block animate-scale-in">
            <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-sage-eucalyptus text-white text-sm font-medium shadow-natural">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              100% Ingrédients Naturels
            </span>
          </div>

          <!-- Main Headline -->
          <div class="space-y-4">
            <h1 class="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-balance">
              <span class="text-gradient-natural">Révélez</span><br>
              <span class="text-background-900 dark:text-background-100">Votre Peau</span><br>
              <span class="accent-text text-secondary-500">Naturellement</span>
            </h1>
            
            <p class="body-large text-background-700 dark:text-background-300 max-w-xl leading-relaxed">
              Découvrez notre collection de gommages corporels artisanaux, formulés avec des ingrédients purs de la nature pour révéler la beauté naturelle de votre peau.
            </p>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 pt-4">
            <button @click="navigateToShop" class="btn-organic group">
              <span>Découvrir la Collection</span>
              <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button @click="scrollToIngredients" class="btn-outline border-eucalyptus-500 text-eucalyptus-700 hover:bg-eucalyptus-500 hover:text-white">
              Nos Ingrédients
            </button>
          </div>

          <!-- Trust Indicators -->
          <div class="pt-8 space-y-6">
            <div class="flex flex-wrap gap-6 items-center">
              <div class="flex items-center gap-3 text-background-600 dark:text-background-400">
                <div class="w-10 h-10 rounded-full bg-eucalyptus-100 dark:bg-eucalyptus-900/20 flex items-center justify-center">
                  <svg class="w-5 h-5 text-eucalyptus-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <span class="font-medium">Livraison Éco-Responsable</span>
              </div>
              
              <div class="flex items-center gap-3 text-background-600 dark:text-background-400">
                <div class="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
                  <svg class="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <span class="font-medium">Paiement Sécurisé</span>
              </div>
              
              <div class="flex items-center gap-3 text-background-600 dark:text-background-400">
                <div class="w-10 h-10 rounded-full bg-cream-100 dark:bg-cream-900/20 flex items-center justify-center">
                  <svg class="w-5 h-5 text-cream-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <span class="font-medium">+1000 Avis 5★</span>
              </div>
            </div>

            <!-- Social Proof -->
            <div class="flex items-center gap-4 pt-4">
              <div class="flex -space-x-2">
                <div v-for="i in 5" :key="i" class="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-eucalyptus-400 to-primary-500 flex items-center justify-center text-white font-bold text-sm">
                  {{ String.fromCharCode(65 + i - 1) }}
                </div>
              </div>
              <div class="text-background-600 dark:text-background-400">
                <p class="font-medium">Rejoint par 5000+ femmes</p>
                <p class="text-sm">qui ont transformé leur routine beauté</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Visual Side -->
        <div class="relative animate-fade-in-up animation-delay-500">
          <!-- Main Product Showcase -->
          <div class="relative z-10">
            <!-- Featured Product Card -->
            <div v-if="isLoadingProduct" class="card-organic p-8 text-center shadow-warm max-w-md mx-auto">
              <!-- Loading State -->
              <div class="animate-pulse">
                <div class="w-64 h-64 mx-auto rounded-organic bg-primary-200 dark:bg-primary-800 mb-6"></div>
                <div class="space-y-4">
                  <div class="h-6 bg-primary-200 dark:bg-primary-800 rounded-soft mx-auto w-3/4"></div>
                  <div class="h-4 bg-primary-100 dark:bg-primary-900 rounded-soft mx-auto w-1/2"></div>
                  <div class="h-8 bg-primary-200 dark:bg-primary-800 rounded-soft mx-auto w-1/3"></div>
                  <div class="h-10 bg-primary-300 dark:bg-primary-700 rounded-soft"></div>
                </div>
              </div>
            </div>
            
            <div v-else-if="featuredProduct" class="card-organic p-8 text-center shadow-warm hover:shadow-elevated transition-all duration-500 max-w-md mx-auto">
              <div class="relative mb-6">
                <!-- Product Image Container -->
                <div class="relative w-64 h-64 mx-auto rounded-organic overflow-hidden shadow-natural">
                  <div class="absolute inset-0 bg-gradient-to-br from-eucalyptus-100 to-cream-100 dark:from-eucalyptus-900/20 dark:to-cream-900/20"></div>
                  
                  <!-- Real Product Image -->
                  <div v-if="getProductImageUrl(featuredProduct)" class="absolute inset-0">
                    <img 
                      :src="getProductImageUrl(featuredProduct)" 
                      :alt="featuredProduct.name"
                      class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      @error="$event.target.style.display = 'none'"
                    />
                  </div>
                  
                  <!-- Fallback placeholder -->
                  <div v-else class="absolute inset-0 flex items-center justify-center">
                    <div class="w-48 h-48 rounded-organic bg-gradient-to-br from-primary-300 to-eucalyptus-300 flex items-center justify-center">
                      <svg class="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                      </svg>
                    </div>
                  </div>
                  
                  <!-- Discount Badge -->
                  <div v-if="featuredProduct.promoPrice" class="absolute -top-3 -right-3 badge-organic px-3 py-1 text-white font-bold shadow-warm">
                    -{{ Math.round((1 - featuredProduct.promoPrice / featuredProduct.price) * 100) }}%
                  </div>
                </div>
              </div>

              <div class="space-y-4">
                <div>
                  <h3 class="font-display text-xl font-bold text-background-900 dark:text-background-100">
                    {{ featuredProduct.name }}
                  </h3>
                  <p class="text-background-600 dark:text-background-400 text-sm mt-1">
                    {{ featuredProduct.description || 'Exfoliation douce • Hydratation intense' }}
                  </p>
                </div>

                <div class="flex items-center justify-center gap-2">
                  <span class="text-2xl font-bold text-secondary-600">
                    {{ featuredProduct.promoPrice || featuredProduct.price }}DH
                  </span>
                  <span v-if="featuredProduct.promoPrice" class="text-lg text-background-500 line-through">
                    {{ featuredProduct.price }}DH
                  </span>
                </div>

                <div class="flex justify-center">
                  <div class="flex items-center gap-1">
                    <div class="flex">
                      <svg v-for="i in 5" :key="i" 
                           :class="[
                             'w-4 h-4',
                             i <= Math.floor(averageRating) ? 'text-cream-500' : 'text-background-300'
                           ]" 
                           fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                    <span class="text-sm text-background-600 dark:text-background-400">
                      {{ averageRating }}/5 ({{ totalReviews }} avis)
                    </span>
                  </div>
                </div>

                <button 
                  @click="addToCart" 
                  :disabled="featuredProduct.stock === 0"
                  class="btn-eucalyptus w-full group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span v-if="featuredProduct.stock === 0">Épuisé</span>
                  <span v-else>Ajouter au Panier</span>
                  <svg v-if="featuredProduct.stock > 0" class="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </button>
                
                <!-- Stock Warning -->
                <div v-if="featuredProduct.stock <= 5 && featuredProduct.stock > 0" class="text-center">
                  <span class="text-secondary-600 text-sm font-medium">
                    ⚠️ Plus que {{ featuredProduct.stock }} en stock !
                  </span>
                </div>
                
                <!-- View Product Link -->
                <button 
                  @click="navigateToProduct" 
                  class="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200"
                >
                  Voir les détails →
                </button>
              </div>
            </div>
          </div>

          <!-- Floating Elements -->
          <div class="absolute -top-8 -left-8 w-24 h-24 rounded-organic bg-gradient-to-br from-eucalyptus-200 to-eucalyptus-300 animate-gentle-bounce opacity-60"></div>
          <div class="absolute -bottom-12 -right-12 w-32 h-32 rounded-organic bg-gradient-to-br from-cream-200 to-secondary-200 animate-float opacity-50"></div>
          
          <!-- Decorative natural elements -->
          <div class="absolute top-1/2 -right-4 transform -translate-y-1/2">
            <div class="w-16 h-32 rounded-organic bg-gradient-to-b from-primary-300 to-eucalyptus-300 opacity-30 animate-gentle-bounce"></div>
          </div>
        </div>
      </div>

      <!-- Bottom Section - Ingredient Highlights -->
      <div id="ingredients" class="pt-24 pb-16">
        <div class="text-center mb-16">
          <h2 class="font-display text-3xl md:text-4xl font-bold text-background-900 dark:text-background-100 mb-4">
            Nos Ingrédients <span class="text-gradient-natural">Précieux</span>
          </h2>
          <p class="body-large text-background-600 dark:text-background-400 max-w-2xl mx-auto">
            Chaque gommage est formulé avec des ingrédients soigneusement sélectionnés pour leurs bienfaits exceptionnels
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(ingredient, index) in ingredients" :key="index" 
               class="card-natural text-center group hover:shadow-natural transition-all duration-300"
               :class="{ 'animate-fade-in-up': true, [`animation-delay-${(index + 1) * 200}`]: true }">
            <div class="w-16 h-16 mx-auto mb-4 rounded-organic bg-gradient-to-br from-eucalyptus-100 to-primary-100 dark:from-eucalyptus-900/20 dark:to-primary-900/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span class="text-2xl">{{ ingredient.icon }}</span>
            </div>
            <h3 class="font-display text-xl font-bold text-background-900 dark:text-background-100 mb-2">
              {{ ingredient.name }}
            </h3>
            <p class="text-background-600 dark:text-background-400 text-sm">
              {{ ingredient.benefit }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCartStore } from '~/stores/cart'
import { useToast } from '~/composables/useToast'

const router = useRouter()
const cartStore = useCartStore()
const toast = useToast()

// Reactive data
const featuredProduct = ref(null)
const isLoadingProduct = ref(true)
const productReviews = ref([])
const averageRating = ref(0)
const totalReviews = ref(0)

// Ingredient data for the highlights section
const ingredients = ref([
  {
    icon: '🌿',
    name: 'Eucalyptus Bio',
    benefit: 'Purifie et rafraîchit la peau en profondeur'
  },
  {
    icon: '🧂',
    name: 'Sel de Mer Mort',
    benefit: 'Exfolie délicatement et reminéralise'
  },
  {
    icon: '🥥',
    name: 'Huile de Coco Vierge',
    benefit: 'Nourrit et protège intensément'
  }
])

// Fetch featured product from PocketBase
const fetchFeaturedProduct = async () => {
  isLoadingProduct.value = true
  
  try {
    const { $pb } = useNuxtApp()
    
    // Try to get a product marked as hero/featured first
    let product = null
    
    try {
      const heroProducts = await $pb.collection('products').getList(1, 1, {
        filter: 'isHero = true',
        sort: '-created'
      })
      
      if (heroProducts.items.length > 0) {
        product = heroProducts.items[0]
      }
    } catch (error) {
      console.log('No isHero field, trying isFeatured')
    }
    
    // Fallback to featured products
    if (!product) {
      try {
        const featuredProducts = await $pb.collection('products').getList(1, 1, {
          filter: 'isFeatured = true',
          sort: '-created'
        })
        
        if (featuredProducts.items.length > 0) {
          product = featuredProducts.items[0]
        }
      } catch (error) {
        console.log('No isFeatured field, getting latest product')
      }
    }
    
    // Final fallback to any product
    if (!product) {
      const anyProducts = await $pb.collection('products').getList(1, 1, {
        sort: '-created'
      })
      
      if (anyProducts.items.length > 0) {
        product = anyProducts.items[0]
      }
    }
    
    // Process the product data to handle image field correctly
    if (product) {
      featuredProduct.value = {
        ...product,
        // Ensure imageUrl field is properly mapped
        imageUrl: product.image || product.imageUrl || null
      }
      
      // Fetch reviews for this product
      await fetchProductReviews(product.id)
    } else {
      featuredProduct.value = null
    }
    
  } catch (error) {
    console.error('Error fetching featured product:', error)
    // Set fallback product data
    featuredProduct.value = {
      id: 'fallback',
      name: 'Gommage Eucalyptus & Sel de Mer',
      description: 'Exfoliation douce • Hydratation intense',
      price: 3399, // in cents
      promoPrice: 2499, // in cents
      imageUrl: null,
      reviewCount: 248,
      stock: 10
    }
  } finally {
    isLoadingProduct.value = false
  }
}

// Fetch product reviews from PocketBase
const fetchProductReviews = async (productId) => {
  if (!productId || productId === 'fallback') return
  
  try {
    const { $pb } = useNuxtApp()
    
    // Fetch reviews for this specific product
    const reviews = await $pb.collection('reviews').getList(1, 50, {
      filter: `product = "${productId}"`,
      sort: '-created',
      expand: 'user'
    })
    
    productReviews.value = reviews.items
    totalReviews.value = reviews.totalItems
    
    // Calculate average rating
    if (reviews.items.length > 0) {
      const sum = reviews.items.reduce((acc, review) => acc + (review.rating || 0), 0)
      averageRating.value = Math.round((sum / reviews.items.length) * 10) / 10 // Round to 1 decimal
    } else {
      averageRating.value = 0
    }
    
  } catch (error) {
    console.error('Error fetching product reviews:', error)
    // Set fallback values
    productReviews.value = []
    totalReviews.value = 248 // Fallback count
    averageRating.value = 4.8 // Fallback rating
  }
}

const getProductImageUrl = (product) => {
  if (!product?.imageUrl) return null
  const { $pb } = useNuxtApp()
  
  // Use PocketBase files.getUrl method for proper URL generation
  try {
    return $pb.files.getUrl(product, product.imageUrl)
  } catch (error) {
    console.error('Error generating image URL:', error)
    // Fallback to manual URL construction
    const imageName = Array.isArray(product.imageUrl) ? product.imageUrl[0] : product.imageUrl
    return `${$pb.baseUrl}/api/files/products/${product.id}/${imageName}`
  }
}

// Add product to cart
const addToCart = () => {
  if (!featuredProduct.value) return
  
  try {
    cartStore.addItem({
      id: featuredProduct.value.id,
      name: featuredProduct.value.name,
      price: featuredProduct.value.promoPrice || featuredProduct.value.price,
      image: featuredProduct.value.imageUrl,
      quantity: 1
    })
    
    toast.success(`${featuredProduct.value.name} ajouté au panier`)
  } catch (error) {
    console.error('Error adding to cart:', error)
    toast.error('Erreur lors de l\'ajout au panier')
  }
}

// Navigation methods
const navigateToShop = () => {
  router.push('/products')
}

const navigateToProduct = () => {
  if (featuredProduct.value?.slug && featuredProduct.value.slug !== 'fallback') {
    router.push(`/products/${featuredProduct.value.slug}`)
  } else {
    router.push('/products')
  }
}

const scrollToIngredients = () => {
  const element = document.getElementById('ingredients')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToProducts = () => {
  // Scroll to the featured products section
  const nextSection = document.querySelector('#products')
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: 'smooth' })
  }
}

// Fetch product on component mount
onMounted(() => {
  fetchFeaturedProduct()
})
</script>

<style scoped>
/* Animation delays */
.animation-delay-200 { animation-delay: 200ms; }
.animation-delay-400 { animation-delay: 400ms; }
.animation-delay-500 { animation-delay: 500ms; }
.animation-delay-600 { animation-delay: 600ms; }
.animation-delay-1000 { animation-delay: 1000ms; }
.animation-delay-2000 { animation-delay: 2000ms; }

/* Custom gradient animations */
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient-shift 8s ease infinite;
}

/* Hover effects for interactive elements */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:translate-x-1 {
  transform: translateX(0.25rem);
}

/* Text selection styling */
::selection {
  background-color: rgba(125, 139, 94, 0.2);
  color: inherit;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Focus styles for accessibility */
button:focus-visible {
  outline: 2px solid theme('colors.primary.500');
  outline-offset: 2px;
}
</style>