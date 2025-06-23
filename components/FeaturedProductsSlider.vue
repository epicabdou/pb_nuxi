<!-- components/FeaturedProductsSlider.vue -->
<template>
  <section id="featured-products" class="relative overflow-hidden bg-gradient-cream-clay bg-natural-texture">
    <!-- Organic Background Elements -->
    <div class="absolute inset-0">
      <!-- Floating shapes with natural movement -->
      <div class="absolute top-16 right-1/4 w-72 h-72 bg-gradient-to-br from-eucalyptus-200/20 to-primary-200/20 rounded-organic animate-float opacity-40"></div>
      <div class="absolute bottom-20 left-1/3 w-96 h-96 bg-gradient-to-br from-cream-200/30 to-secondary-200/30 rounded-organic animate-gentle-bounce opacity-30"></div>
      <div class="absolute top-1/3 left-12 w-48 h-48 bg-gradient-to-br from-primary-200/25 to-eucalyptus-300/25 rounded-organic animate-float opacity-50 animation-delay-2000"></div>
      
      <!-- Subtle texture overlay -->
      <div class="absolute inset-0 bg-organic-texture opacity-15"></div>
      
      <!-- Gradient overlay for depth -->
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background-50/20 dark:to-background-900/20"></div>
    </div>

    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 20px, #7d8b5e 20px, #7d8b5e 21px);"></div>
    </div>
    
    <div class="section-natural relative z-10">
      <div class="responsive-container">
        <!-- Enhanced Header Section -->
        <div class="text-center mb-20 animate-fade-in-up">
          <!-- Premium Badge -->
          <div class="inline-block mb-6">
            <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-sage-eucalyptus text-white text-sm font-medium shadow-natural">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              Nos Produits les Plus Aimés
            </span>
          </div>
          
          <h2 class="font-display text-5xl md:text-6xl lg:text-7xl text-primary-700 dark:text-primary-300 mb-8 leading-tight">
            Collection
            <span class="block text-gradient-natural">Signature</span>
          </h2>
          
          <div class="max-w-4xl mx-auto space-y-6">
            <p class="text-primary-600 dark:text-primary-400 text-xl md:text-2xl leading-relaxed font-light">
              Chaque gommage est un chef-d'œuvre artisanal, soigneusement formulé pour offrir l'expérience 
              de détente ultime qui transforme votre peau et élève votre esprit.
            </p>
            
            <!-- Trust Indicators -->
            <div class="flex flex-wrap justify-center gap-8 pt-4">
              <div class="flex items-center gap-2 text-background-600 dark:text-background-400">
                <svg class="w-5 h-5 text-eucalyptus-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span class="font-medium text-sm">Ingrédients Bio Certifiés</span>
              </div>
              
              <div class="flex items-center gap-2 text-background-600 dark:text-background-400">
                <svg class="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <span class="font-medium text-sm">Note Moyenne 4.8/5</span>
              </div>
              
              <div class="flex items-center gap-2 text-background-600 dark:text-background-400">
                <svg class="w-5 h-5 text-secondary-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a2 2 0 00-2 2v1h2V6h2v1h2V6h2v1h2V6h2v1h2V6a2 2 0 00-2-2H3zM3 10v6a2 2 0 002 2h10a2 2 0 002-2v-6H3z" />
                </svg>
                <span class="font-medium text-sm">Livraison 24h Offerte</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading State with Premium Design -->
        <div v-if="isLoading" class="flex justify-center items-center py-20">
          <div class="relative">
            <div class="animate-spin rounded-organic h-20 w-20 border-4 border-primary-200 border-t-primary-500 shadow-natural"></div>
            <div class="absolute inset-0 rounded-organic bg-primary-100/20"></div>
            <div class="absolute inset-4 rounded-organic bg-gradient-to-br from-eucalyptus-100 to-primary-100 opacity-50 animate-pulse"></div>
          </div>
        </div>

        <!-- No Products State -->
        <div v-else-if="products.length === 0" class="text-center py-20">
          <div class="card-natural max-w-md mx-auto p-12">
            <div class="w-20 h-20 mx-auto mb-6 rounded-organic bg-gradient-to-br from-primary-100 to-eucalyptus-100 dark:from-primary-900/20 dark:to-eucalyptus-900/20 flex items-center justify-center">
              <svg class="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
            <h3 class="font-display text-2xl font-bold text-primary-700 dark:text-primary-300 mb-4">
              Collection en Préparation
            </h3>
            <p class="body-large text-background-600 dark:text-background-400">
              Nos artisans préparent soigneusement de nouveaux gommages exceptionnels pour vous.
            </p>
          </div>
        </div>

        <!-- Products Slider -->
        <div v-else class="relative">
          <!-- Enhanced Custom Navigation Buttons -->
          <button
            @click="swiperInstance?.slidePrev()"
            class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 z-20 w-16 h-16 rounded-organic bg-background-50/95 dark:bg-background-800/95 backdrop-blur-sm shadow-natural hover:shadow-warm transition-all duration-300 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-primary-400"
            aria-label="Produit précédent"
          >
            <svg class="w-7 h-7 text-primary-600 transition-transform duration-300 group-hover:-translate-x-1 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
            </svg>
            <div class="absolute inset-0 rounded-organic bg-gradient-to-r from-primary-500/0 to-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <button
            @click="swiperInstance?.slideNext()"
            class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 z-20 w-16 h-16 rounded-organic bg-background-50/95 dark:bg-background-800/95 backdrop-blur-sm shadow-natural hover:shadow-warm transition-all duration-300 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-primary-400"
            aria-label="Produit suivant"
          >
            <svg class="w-7 h-7 text-primary-600 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
            </svg>
            <div class="absolute inset-0 rounded-organic bg-gradient-to-l from-primary-500/0 to-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <!-- Enhanced Swiper Container -->
          <Swiper
            :modules="[SwiperNavigation, SwiperPagination, SwiperAutoplay]"
            :slides-per-view="1"
            :space-between="32"
            :breakpoints="{
              '640': {
                slidesPerView: 2,
                spaceBetween: 32,
              },
              '768': {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              '1024': {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              '1280': {
                slidesPerView: 3,
                spaceBetween: 48,
              },
            }"
            :pagination="{
              clickable: true,
              dynamicBullets: true
            }"
            :autoplay="{
              delay: 6000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }"
            :loop="products.length > 3"
            :grab-cursor="true"
            :keyboard="{
              enabled: true,
            }"
            @swiper="setSwiperInstance"
            class="!pb-20 !overflow-visible"
          >
            <SwiperSlide v-for="(product, index) in products" :key="product.id">
              <!-- Enhanced Product Card with Reviews -->
              <div class="group h-full animate-fade-in-up"
                   :style="{ animationDelay: `${index * 150}ms` }">
                
                <ProductCard 
                  :product="product" 
                  :enhanced="true"
                  :is-in-wishlist="isInWishlist(product.id)"
                  @add-to-cart="handleAddToCart"
                  @add-to-wishlist="handleWishlistToggle"
                  @quick-view="handleQuickView"
                  class="transform transition-all duration-500 group-hover:-translate-y-2 h-full shadow-natural hover:shadow-warm"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <!-- Enhanced View All Products Section -->
        <div class="text-center mt-20 animate-fade-in-up">
          <div class="space-y-8">
            <!-- Collection Stats with Real Data -->
            <div class="flex flex-wrap justify-center gap-8 mb-8">
              <div class="text-center">
                <div class="text-3xl font-bold text-secondary-600 dark:text-secondary-400">
                  {{ products.length }}+
                </div>
                <div class="text-sm text-background-600 dark:text-background-400 font-medium">
                  Gommages Uniques
                </div>
              </div>
              
              <div class="text-center">
                <div class="text-3xl font-bold text-eucalyptus-600 dark:text-eucalyptus-400">
                  100%
                </div>
                <div class="text-sm text-background-600 dark:text-background-400 font-medium">
                  Ingrédients Naturels
                </div>
              </div>
              
              <div class="text-center">
                <div class="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  {{ averageRating }}★
                </div>
                <div class="text-sm text-background-600 dark:text-background-400 font-medium">
                  Note Moyenne
                </div>
              </div>
              
              <div class="text-center">
                <div class="text-3xl font-bold text-cream-600 dark:text-cream-400">
                  {{ totalCustomers }}+
                </div>
                <div class="text-sm text-background-600 dark:text-background-400 font-medium">
                  Clientes Satisfaites
                </div>
              </div>
            </div>
            
            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                @click="navigateToShop"
                class="btn-primary btn-lg group shadow-natural hover:shadow-warm"
              >
                <span>Découvrir Toute la Collection</span>
                <svg class="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              
              <button 
                @click="navigateToCustomize"
                class="btn-outline border-eucalyptus-500 text-eucalyptus-700 hover:bg-eucalyptus-500 hover:text-white group"
              >
                <span>Créer Votre Gommage</span>
                <svg class="w-5 h-5 ml-2 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </button>
            </div>
            
            <!-- Enhanced Special Offer Banner -->
            <div class="card-organic p-8 bg-gradient-to-r from-secondary-100 to-cream-100 dark:from-secondary-900/20 dark:to-cream-900/20 max-w-3xl mx-auto mt-8">
              <div class="flex flex-col md:flex-row items-center justify-between gap-6">
                <div class="flex items-center gap-4">
                  <div class="w-16 h-16 rounded-organic bg-secondary-200 dark:bg-secondary-800 flex items-center justify-center">
                    <svg class="w-8 h-8 text-secondary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-display text-xl font-bold text-secondary-700 dark:text-secondary-300 mb-1">
                      Offre Spéciale Découverte
                    </h3>
                    <p class="text-background-600 dark:text-background-400">
                      Livraison gratuite dès 50€ + Échantillon offert avec chaque commande
                    </p>
                  </div>
                </div>
                
                <div class="flex flex-col items-center gap-2">
                  <div class="bg-secondary-600 text-white px-4 py-2 rounded-full font-bold text-lg">
                    -20%
                  </div>
                  <span class="text-xs text-background-600 dark:text-background-400">
                    Premier achat
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation as SwiperNavigation, Pagination as SwiperPagination, Autoplay as SwiperAutoplay } from 'swiper/modules';
import { useRouter } from 'vue-router';
import { useCartStore } from '~/stores/cart';
import { useWishlistStore } from '~/stores/wishlist';
import { useToast } from '~/composables/useToast';
import ProductCard from '~/components/ProductCard.vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Composables
const router = useRouter();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const toast = useToast();

// Reactive data
const products = ref([]);
const isLoading = ref(true);
const swiperInstance = ref(null);
const productReviews = ref([]);

// Store swiper instance for external navigation
const setSwiperInstance = (swiper) => {
  swiperInstance.value = swiper;
};

// Computed properties for stats
const averageRating = computed(() => {
  if (productReviews.value.length === 0) return '4.8';
  
  const totalRating = productReviews.value.reduce((sum, review) => sum + (review.rating || 0), 0);
  const average = totalRating / productReviews.value.length;
  return average.toFixed(1);
});

const totalCustomers = computed(() => {
  // This could be fetched from a separate API or calculated from orders
  return Math.max(1250, productReviews.value.length * 15); // Estimated based on reviews
});

// Fetch featured products from PocketBase
const fetchFeaturedProducts = async () => {
  isLoading.value = true;

  try {
    const { $pb } = useNuxtApp();

    const records = await $pb.collection('products').getList(1, 12, {
      filter: 'isFeatured = true',
      sort: '-created',
      expand: 'category,tags'
    });

    products.value = records.items;
    
    // Fetch reviews for all featured products
    await fetchAllProductReviews();
    
    if (products.value.length === 0) {
      console.warn('No featured products found');
    }
  } catch (error) {
    console.error('Error fetching featured products:', error);
    toast.error('Échec du chargement des produits en vedette');
  } finally {
    isLoading.value = false;
  }
};

// Fetch reviews for all featured products
const fetchAllProductReviews = async () => {
  if (products.value.length === 0) return;
  
  try {
    const { $pb } = useNuxtApp();
    
    // Get all product IDs
    const productIds = products.value.map(p => p.id);
    const filterConditions = productIds.map(id => `product = "${id}"`).join(' || ');
    
    const reviews = await $pb.collection('reviews').getList(1, 200, {
      filter: filterConditions,
      sort: '-created',
      expand: 'user,product'
    });
    
    productReviews.value = reviews.items;
    
  } catch (error) {
    console.error('Error fetching product reviews:', error);
    productReviews.value = [];
  }
};

// Check if product is in wishlist
const isInWishlist = (productId) => {
  return wishlistStore.isInWishlist(productId);
};

// Handle add to cart from product cards
const handleAddToCart = (product) => {
  try {
    cartStore.addItem({
      id: product.id,
      name: product.name,
      price: product.promoPrice || product.price,
      image: product.imageUrl || product.image,
      quantity: 1
    });
    
    toast.success(`${product.name} ajouté au panier`);
  } catch (error) {
    console.error('Error adding to cart:', error);
    toast.error('Erreur lors de l\'ajout au panier');
  }
};

// Handle wishlist toggle
const handleWishlistToggle = async (product) => {
  try {
    if (isInWishlist(product.id)) {
      await wishlistStore.removeItem(product.id);
      toast.success(`${product.name} retiré de votre liste de souhaits`);
    } else {
      await wishlistStore.addItem(product);
      toast.success(`${product.name} ajouté à votre liste de souhaits`);
    }
  } catch (error) {
    console.error('Error toggling wishlist:', error);
    toast.error('Erreur lors de la modification de la liste de souhaits');
  }
};

// Handle quick view
const handleQuickView = (product) => {
  // Could open a modal or navigate to product page
  router.push(`/products/${product.slug || product.id}`);
};

// Navigation methods
const navigateToShop = () => {
  router.push('/shop');
};

const navigateToCustomize = () => {
  router.push('/customize');
};

// Fetch products on component mount
onMounted(() => {
  fetchFeaturedProducts();
});
</script>

<style scoped>
/* Animation delays for staggered effects */
.animation-delay-2000 { animation-delay: 2000ms; }

/* Enhanced Swiper Styling */
:deep(.swiper) {
  padding-bottom: 80px;
  overflow: visible;
}

:deep(.swiper-pagination) {
  bottom: 0;
  display: flex;
  justify-content: center;
  gap: 12px;
}

:deep(.swiper-pagination-bullet) {
  width: 16px;
  height: 16px;
  background: linear-gradient(135deg, theme('colors.primary.400'), theme('colors.eucalyptus.400'));
  opacity: 0.3;
  transition: all 0.3s ease;
  border-radius: theme('borderRadius.organic');
  border: 2px solid theme('colors.background.50');
  margin: 0;
}

:deep(.swiper-pagination-bullet-active) {
  opacity: 1;
  transform: scale(1.3);
  box-shadow: 0 4px 12px rgba(125, 139, 94, 0.3);
}

:deep(.swiper-pagination-bullet:hover) {
  opacity: 0.7;
  transform: scale(1.1);
}

/* Enhanced card hover effects */
.group:hover .transform {
  transform: translateY(-8px) scale(1.02);
}

/* Smooth slide transitions */
:deep(.swiper-slide) {
  transition: transform 0.3s ease;
}

:deep(.swiper-slide-active) {
  z-index: 1;
}

/* Custom focus states */
button:focus-visible {
  outline: 2px solid theme('colors.primary.400');
  outline-offset: 2px;
}

/* Loading animation enhancement */
@keyframes spin-smooth {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin-smooth 1.5s linear infinite;
}

/* Enhanced background animations */
@keyframes float-gentle {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(1deg); }
}

@keyframes bounce-soft {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-15px) scale(1.05); }
}

/* Natural gradient animations */
.animate-float {
  animation: float-gentle 8s ease-in-out infinite;
}

.animate-gentle-bounce {
  animation: bounce-soft 6s ease-in-out infinite;
}

/* Stats counter animation */
@keyframes countUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.text-3xl {
  animation: countUp 0.8s ease-out;
}

/* Enhanced offer banner */
.card-organic {
  position: relative;
  overflow: hidden;
}

.card-organic::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.card-organic:hover::before {
  left: 100%;
}
</style>