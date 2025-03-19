<!-- components/HeroSection.vue -->
<template>
  <section class="relative overflow-hidden bg-gradient-to-b from-background-50 to-background-200 dark:from-background-900 dark:to-background-800">
    <!-- Background decoration element -->
    <div class="absolute -top-24 -right-24 w-96 h-96 bg-primary-200 dark:bg-primary-900/20 rounded-full blur-3xl opacity-50"></div>
    <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary-200 dark:bg-secondary-900/20 rounded-full blur-3xl opacity-50"></div>

    <div class="responsive-container section-padding relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Text content -->
        <div class="space-y-6 animate-slide-up">
          <div class="inline-block">
            <span class="badge-primary">NEW COLLECTION</span>
          </div>
          <h1 class="heading-1 text-gradient">Discover Our Latest Products</h1>
          <p class="body-large text-background-700 dark:text-background-300">
            Find the perfect items to elevate your style, home, and lifestyle. Enjoy exclusive deals on our newest arrivals.
          </p>
          <div class="flex flex-wrap gap-4 pt-4">
            <button @click="navigateToShop" class="btn-primary">Shop Now</button>
            <button @click="navigateTo('/categories')" class="btn-outline">View Categories</button>
          </div>

          <!-- Trust badges -->
          <div class="pt-6 flex flex-wrap gap-8 items-center text-background-600 dark:text-background-400">
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Free Shipping</span>
            </div>
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Secure Payment</span>
            </div>
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>30-Day Returns</span>
            </div>
          </div>
        </div>

        <!-- Featured products carousel -->
        <div class="card-fancy animate-slide-up bg-white/80 dark:bg-background-800/80 backdrop-blur-md">
          <swiper-container
              :slides-per-view="1"
              :space-between="0"
              :loop="true"
              :autoplay="{delay: 5000, disableOnInteraction: false}"
              :pagination="{clickable: true}"
              :navigation="true"
              class="rounded-xl overflow-hidden"
          >
            <swiper-slide v-for="product in featuredProducts" :key="product.id" class="pb-10">
              <div class="relative overflow-hidden group">
                <img :src="product.imageUrl" :alt="product.name" class="w-full h-80 object-cover object-center transition-all duration-500 group-hover:scale-105">

                <!-- Product info overlay -->
                <div class="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-background-800/90 p-4 shadow-md transition-transform duration-300">
                  <div class="flex justify-between items-start">
                    <div>
                      <h3 class="font-bold text-lg">{{ product.name }}</h3>
                      <div class="flex gap-2 mt-1">
                        <span v-if="product.promoPrice" class="text-error-600 font-bold">${{ product.promoPrice.toFixed(2) }}</span>
                        <span :class="{'line-through text-background-500': product.promoPrice}">${{ product.price.toFixed(2) }}</span>
                      </div>
                    </div>
                    <button @click="addToCart(product)" class="btn-primary btn-sm flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Add
                    </button>
                  </div>
                  <div class="flex items-center gap-2 mt-2">
                    <div class="flex">
                      <span v-for="i in 5" :key="i" class="text-primary-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" :fill="i <= product.rating ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </span>
                    </div>
                    <span class="text-xs text-background-600 dark:text-background-400">({{ product.reviewCount }})</span>
                    <span v-if="product.stock <= 5 && product.stock > 0" class="text-xs text-error-600">Only {{ product.stock }} left!</span>
                    <span v-if="product.stock === 0" class="text-xs text-error-600">Out of stock</span>
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper-container>
        </div>
      </div>

      <!-- Category highlights -->
      <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
        <div
            v-for="category in categories"
            :key="category.id"
            @click="navigateToCategory(category)"
            class="card-fancy group p-4 md:p-6 text-center transition-all duration-300 hover:shadow-modern cursor-pointer"
        >
          <!-- Image container with fixed aspect ratio -->
          <div class="relative w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 overflow-hidden rounded-full bg-background-200 dark:bg-background-700 group-hover:scale-110 transition-transform duration-300">
            <!-- Show actual image if available -->
            <img
                v-if="category.imageUrl"
                :src="category.imageUrl"
                :alt="category.name"
                class="w-full h-full object-cover"
            />
            <!-- Fallback if no image is available -->
            <div v-else class="w-full h-full flex items-center justify-center bg-primary-100 dark:bg-primary-900/20">
              <span class="text-2xl md:text-3xl text-primary-600 dark:text-primary-400">{{ category.emoji }}</span>
            </div>
          </div>
          <h3 class="font-bold text-base md:text-lg mb-1">{{ category.name }}</h3>
          <p class="text-xs md:text-sm text-background-600 dark:text-background-400">{{ category.productCount }} products</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { register } from 'swiper/element/bundle';
import { useNuxtApp } from 'nuxt/app';
import { useCartStore } from '~/stores/cart';

// Register Swiper custom elements
onMounted(async () => {
  register();
  await fetchFeaturedProducts();
  await fetchCategories();
});

const { $pb } = useNuxtApp();
const cartStore = useCartStore();
const featuredProducts = ref([]);
const categories = ref([]);
const isLoading = ref(true);

// Fetch featured products from PocketBase
const fetchFeaturedProducts = async () => {
  try {
    const records = await $pb.collection('products').getList(1, 5, {
      filter: 'isFeatured = true',
      sort: '-created',
      expand: 'category,tags'
    });

    featuredProducts.value = records.items.map(product => {
      // Get the image URL
      const imageUrl = product.image ? $pb.getFileUrl(product, product.image) : '';

      // Get average rating from reviews
      const avgRating = product.expand?.reviews?.reduce((sum, review) => sum + review.rating, 0) /
          (product.expand?.reviews?.length || 1);

      return {
        id: product.id,
        name: product.name,
        price: product.price,
        promoPrice: product.promoPrice,
        rating: Math.round(avgRating || 0),
        reviewCount: product.expand?.reviews?.length || 0,
        stock: product.stock || 0,
        imageUrl: imageUrl,
        slug: product.slug,
        category: product.expand?.category
      };
    });
  } catch (error) {
    console.error('Error fetching featured products:', error);
    // Fallback to demo data if API fails
    featuredProducts.value = [
      {
        id: '1',
        name: 'Premium Wireless Headphones',
        price: 199.99,
        promoPrice: 149.99,
        rating: 4,
        reviewCount: 124,
        stock: 15,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000'
      },
      {
        id: '2',
        name: 'Smart Watch Series X',
        price: 299.99,
        promoPrice: null,
        rating: 5,
        reviewCount: 86,
        stock: 3,
        imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000'
      },
      {
        id: '3',
        name: 'Designer Backpack',
        price: 89.99,
        promoPrice: 69.99,
        rating: 4,
        reviewCount: 47,
        stock: 0,
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000'
      }
    ];
  } finally {
    isLoading.value = false;
  }
};

// Fetch categories from PocketBase
const fetchCategories = async () => {
  try {
    // Get 4 categories to display
    const records = await $pb.collection('categories').getList(1, 4, {
      sort: 'name'
    });

    // Fetch all products in one request to optimize
    const allProducts = await $pb.collection('products').getFullList({
      fields: 'id,category',
      expand: 'category'
    });

    // For each category, count the number of products
    const categoriesWithCounts = records.items.map(category => {
      // Count products that have this category
      // Since category is a relation field that can have multiple values,
      // we need to check if the category ID is in the category array
      const productCount = allProducts.filter(product => {
        // Check if product.category contains the category.id
        // It could be either a direct string (if only one category) or an array of strings
        if (Array.isArray(product.category)) {
          return product.category.includes(category.id);
        } else {
          return product.category === category.id;
        }
      }).length;

      // Get the image URL
      const imageUrl = category.image ? $pb.getFileUrl(category, category.image) : '';

      // Emoji mapping as fallback if no image is available
      const emojiMap = {
        'electronics': '📱',
        'fashion': '👕',
        'home': '🏠',
        'beauty': '💄',
        'sports': '🏀',
        'books': '📚',
        'toys': '🧸',
        'food': '🍕'
      };

      // Derive emoji from category name or slug (used as fallback)
      const emoji = emojiMap[category.slug.toLowerCase()] || '🛍️';

      return {
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        imageUrl: imageUrl,
        emoji: emoji,
        productCount: productCount
      };
    });

    categories.value = categoriesWithCounts;
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Fallback to demo data if API fails
    categories.value = [
      {
        id: '1',
        name: 'Electronics',
        emoji: '📱',
        productCount: 42,
        imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=500&auto=format&fit=crop'
      },
      {
        id: '2',
        name: 'Fashion',
        emoji: '👕',
        productCount: 86,
        imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=500&auto=format&fit=crop'
      },
      {
        id: '3',
        name: 'Home',
        emoji: '🏠',
        productCount: 35,
        imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=500&auto=format&fit=crop'
      },
      {
        id: '4',
        name: 'Beauty',
        emoji: '💄',
        productCount: 29,
        imageUrl: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=500&auto=format&fit=crop'
      }
    ];
  }
};

// Method to handle shop now button
const navigateToShop = () => {
  navigateTo('/products');
};

// Method to handle category click
const navigateToCategory = (category) => {
  navigateTo(`/category/${category.slug}`);
};

// Method to add product to cart
const addToCart = (product) => {
  try {
    cartStore.addItem({
      id: product.id,
      name: product.name,
      price: product.promoPrice || product.price,
      image: product.imageUrl,
      quantity: 1
    });

    // Optional: Show success notification or open cart
    // cartStore.toggleCart();
  } catch (error) {
    console.error('Error adding product to cart:', error);
  }
};
</script>

<style scoped>
/* Custom styles for Swiper */
:deep(.swiper-pagination-bullet) {
  @apply w-2 h-2 bg-background-400 opacity-50 transition-all duration-300;
}

:deep(.swiper-pagination-bullet-active) {
  @apply w-6 rounded-full bg-primary-500 opacity-100;
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  @apply text-primary-500 w-10 h-10 grid place-items-center rounded-full bg-white/80 shadow-md transition-all duration-300;
}

:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  @apply bg-primary-500 text-white;
}

:deep(.swiper-button-next::after),
:deep(.swiper-button-prev::after) {
  @apply text-sm;
}
</style>