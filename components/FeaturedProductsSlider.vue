<template>
  <section class="featured-products section-padding">
    <div class="responsive-container">
      <h2 class="heading-2 mb-8">Featured Products</h2>

      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>

      <template v-else>
        <div v-if="products.length === 0" class="text-center py-8">
          <p class="body-large text-background-600 dark:text-background-400">No featured products available.</p>
        </div>

        <div v-else class="relative">
          <!-- Navigation Buttons -->
          <button
              @click="swiperInstance?.slidePrev()"
              class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white dark:bg-background-800 rounded-full shadow-md p-2 focus:outline-none hover:bg-background-100 dark:hover:bg-background-700 transition-colors"
              aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-background-700 dark:text-background-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
              @click="swiperInstance?.slideNext()"
              class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white dark:bg-background-800 rounded-full shadow-md p-2 focus:outline-none hover:bg-background-100 dark:hover:bg-background-700 transition-colors"
              aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-background-700 dark:text-background-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Swiper Slider -->
          <Swiper
              :modules="[SwiperNavigation, SwiperPagination, SwiperAutoplay]"
              :slides-per-view="1"
              :space-between="20"
              :breakpoints="{
              '640': {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              '768': {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              '1024': {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }"
              :pagination="{
              clickable: true,
              dynamicBullets: true
            }"
              :autoplay="{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }"
              @swiper="setSwiperInstance"
          >
            <SwiperSlide v-for="product in products" :key="product.id">
              <ProductCard :product="product" />
            </SwiperSlide>
          </Swiper>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation as SwiperNavigation, Pagination as SwiperPagination, Autoplay as SwiperAutoplay } from 'swiper/modules';
import { useToast } from '~/composables/useToast';
import ProductCard from '~/components/ProductCard.vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const products = ref([]);
const isLoading = ref(true);
const swiperInstance = ref(null);
const toast = useToast();

// Store swiper instance for external navigation
const setSwiperInstance = (swiper) => {
  swiperInstance.value = swiper;
};

// Fetch featured products from PocketBase
const fetchFeaturedProducts = async () => {
  isLoading.value = true;

  try {
    const { $pb } = useNuxtApp();

    const records = await $pb.collection('products').getList(1, 10, {
      filter: 'isFeatured = true',
      sort: '-created',
      expand: 'category,tags'
    });

    products.value = records.items;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    toast.error('Failed to load featured products');
  } finally {
    isLoading.value = false;
  }
};

// Fetch products on component mount
onMounted(() => {
  fetchFeaturedProducts();
});
</script>

<style scoped>
:deep(.swiper) {
  padding-bottom: 40px;
}

:deep(.swiper-pagination) {
  bottom: 0;
}

:deep(.swiper-pagination-bullet) {
  background-color: theme('colors.primary.500');
  opacity: 0.5;
}

:deep(.swiper-pagination-bullet-active) {
  opacity: 1;
}
</style>