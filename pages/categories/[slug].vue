<template>
  <div>
    <!-- Loading state -->
    <div v-if="isLoading" class="section-padding">
      <div class="responsive-container flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="section-padding">
      <div class="responsive-container">
        <div class="card p-8 bg-error-50 border border-error-200 text-error-700">
          <p class="font-medium">{{ error }}</p>
          <NuxtLink to="/categories" class="btn-outline mt-4">
            Back to Categories
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Category content -->
    <template v-else-if="category">
      <!-- Hero banner section -->
      <section class="relative bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-background-900 dark:to-background-800 py-12">
        <div class="responsive-container">
          <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
            <!-- Category image with enhanced styling -->
            <div v-if="category.image" class="relative flex-shrink-0">
              <div class="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white dark:border-background-700 shadow-md transition-transform hover:scale-105 duration-300">
                <img
                    :src="`${pocketbaseUrl}/api/files/categories/${category.id}/${category.image}`"
                    :alt="category.name"
                    class="w-full h-full object-cover"
                />
              </div>
              <div class="absolute -bottom-2 -right-2 bg-primary-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                <span class="text-xs font-bold">{{ categoryProducts.length }}</span>
              </div>
            </div>

            <div class="flex-grow text-center md:text-left">
              <h1 class="heading-2 text-background-900 dark:text-background-100 mb-2">{{ category.name }}</h1>
              <p v-if="category.description" class="text-background-600 dark:text-background-400 max-w-2xl">
                {{ category.description }}
              </p>

              <!-- Subcategories pills if this category has child categories -->
              <div v-if="childCategories.length" class="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                <NuxtLink
                    v-for="child in childCategories"
                    :key="child.id"
                    :to="`/categories/${child.slug}`"
                    class="badge-outline-primary transition-all hover:bg-primary-100 dark:hover:bg-primary-900"
                >
                  {{ child.name }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Breadcrumb navigation -->
      <section class="py-4 bg-background-100 dark:bg-background-900 border-b border-background-200 dark:border-background-800">
        <div class="responsive-container">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <!-- Breadcrumb -->
            <nav class="flex text-sm" aria-label="Breadcrumb">
              <ol class="inline-flex items-center space-x-1 md:space-x-3">
                <li class="inline-flex items-center">
                  <NuxtLink to="/" class="text-background-600 hover:text-primary-600 transition-colors">
                    Home
                  </NuxtLink>
                </li>
                <li>
                  <div class="flex items-center">
                    <span class="mx-2 text-background-500">/</span>
                    <NuxtLink to="/categories" class="text-background-600 hover:text-primary-600 transition-colors">Categories</NuxtLink>
                  </div>
                </li>
                <li v-if="category.expand?.parent">
                  <div class="flex items-center">
                    <span class="mx-2 text-background-500">/</span>
                    <NuxtLink
                        :to="`/categories/${category.expand.parent.slug}`"
                        class="text-background-600 hover:text-primary-600 transition-colors"
                    >
                      {{ category.expand.parent.name }}
                    </NuxtLink>
                  </div>
                </li>
                <li>
                  <div class="flex items-center">
                    <span class="mx-2 text-background-500">/</span>
                    <span class="text-primary-600 font-medium">{{ category.name }}</span>
                  </div>
                </li>
              </ol>
            </nav>

            <!-- Filters and sorting -->
            <div class="flex items-center gap-2">
              <!-- Sort dropdown -->
              <div class="relative">
                <select
                    v-model="sortOption"
                    class="input-primary py-2 pl-3 pr-8 text-sm rounded-lg appearance-none cursor-pointer"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="-name">Name (Z-A)</option>
                  <option value="price">Price (Low to High)</option>
                  <option value="-price">Price (High to Low)</option>
                  <option value="-created">Newest</option>
                </select>
                <div class="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-background-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <!-- Grid/List view toggle -->
              <div class="flex bg-white dark:bg-background-800 rounded-lg border border-background-300 dark:border-background-700 p-1">
                <button
                    @click="viewMode = 'grid'"
                    :class="[
                    'p-1.5 rounded',
                    viewMode === 'grid' ? 'bg-primary-100 text-primary-600 dark:bg-primary-900' : 'text-background-600'
                  ]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                    @click="viewMode = 'list'"
                    :class="[
                    'p-1.5 rounded',
                    viewMode === 'list' ? 'bg-primary-100 text-primary-600 dark:bg-primary-900' : 'text-background-600'
                  ]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Products section -->
      <section class="py-8 md:py-12">
        <div class="responsive-container">
          <!-- Products count and active filters -->
          <div class="flex flex-wrap items-center justify-between mb-6 gap-4">
            <p class="text-sm text-background-700 dark:text-background-300 font-medium">
              {{ categoryProducts.length }} products found
            </p>

            <!-- Tags/Filters that could be applied -->
            <div class="flex flex-wrap gap-2" v-if="filterTags.length">
              <div
                  v-for="tag in filterTags"
                  :key="tag.id"
                  class="flex items-center bg-background-100 dark:bg-background-800 px-3 py-1 rounded-full text-xs"
              >
                <span>{{ tag.name }}</span>
                <button class="ml-2 text-error-500" @click="removeFilter(tag.id)">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <button
                  v-if="filterTags.length > 0"
                  @click="clearFilters"
                  class="text-xs text-primary-600 hover:text-primary-700 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          </div>

          <!-- Loading products -->
          <div v-if="isProductsLoading" class="flex justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>

          <!-- Products grid view -->
          <div
              v-else-if="categoryProducts.length && viewMode === 'grid'"
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            <ProductCard
                v-for="product in sortedProducts"
                :key="product.id"
                :product="product"
                @add-to-cart="addToCart"
                @add-to-wishlist="toggleWishlist"
                :is-in-wishlist="isInWishlist(product.id)"
            />
          </div>

          <!-- Products list view -->
          <div
              v-else-if="categoryProducts.length && viewMode === 'list'"
              class="space-y-4"
          >
            <ProductListItem
                v-for="product in sortedProducts"
                :key="product.id"
                :product="product"
                @add-to-cart="addToCart"
                @add-to-wishlist="toggleWishlist"
                :is-in-wishlist="isInWishlist(product.id)"
            />
          </div>

          <!-- No products -->
          <div v-else class="card-fancy p-8 text-center max-w-2xl mx-auto">
            <div class="mb-6 text-primary-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="heading-4 mb-4">No products found</h3>
            <p class="text-background-600 dark:text-background-400 mb-6">There are currently no products in this category.</p>
            <div class="flex flex-wrap gap-4 justify-center">
              <NuxtLink to="/categories" class="btn-primary">
                Browse other categories
              </NuxtLink>
              <NuxtLink to="/" class="btn-outline">
                Return to homepage
              </NuxtLink>
            </div>
          </div>

          <!-- Pagination if needed -->
          <div v-if="categoryProducts.length > itemsPerPage" class="mt-12 flex justify-center">
            <div class="flex space-x-1">
              <button
                  @click="prevPage"
                  :disabled="currentPage === 1"
                  :class="[
                  'px-3 py-1 rounded-md',
                  currentPage === 1
                    ? 'bg-background-200 text-background-500 cursor-not-allowed'
                    : 'bg-background-200 hover:bg-background-300 text-background-800'
                ]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                  v-for="page in totalPages"
                  :key="page"
                  @click="goToPage(page)"
                  :class="[
                  'px-3 py-1 rounded-md',
                  currentPage === page
                    ? 'bg-primary-500 text-white'
                    : 'bg-background-200 hover:bg-background-300 text-background-800'
                ]"
              >
                {{ page }}
              </button>

              <button
                  @click="nextPage"
                  :disabled="currentPage === totalPages"
                  :class="[
                  'px-3 py-1 rounded-md',
                  currentPage === totalPages
                    ? 'bg-background-200 text-background-500 cursor-not-allowed'
                    : 'bg-background-200 hover:bg-background-300 text-background-800'
                ]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Related categories section -->
      <section v-if="relatedCategories.length" class="py-8 bg-background-100 dark:bg-background-900 border-t border-background-200 dark:border-background-800">
        <div class="responsive-container">
          <h2 class="heading-3 mb-6">Related Categories</h2>

          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <NuxtLink
                v-for="relatedCategory in relatedCategories"
                :key="relatedCategory.id"
                :to="`/categories/${relatedCategory.slug}`"
                class="bg-white dark:bg-background-800 rounded-lg shadow-sm hover:shadow-md transition-all p-4 text-center"
            >
              <div v-if="relatedCategory.image" class="w-16 h-16 mx-auto rounded-full overflow-hidden mb-3">
                <img
                    :src="`${pocketbaseUrl}/api/files/categories/${relatedCategory.id}/${relatedCategory.image}`"
                    :alt="relatedCategory.name"
                    class="w-full h-full object-cover"
                />
              </div>
              <h3 class="font-medium text-sm">{{ relatedCategory.name }}</h3>
            </NuxtLink>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '~/stores/cart'
import { useWishlistStore } from '~/stores/wishlist'
import { useAuthStore } from '~/stores/auth'
import { useToast } from '~/composables/useToast'
import ProductCard from '~/components/ProductCard.vue'
import ProductListItem from '~/components/ProductListItem.vue'

// Route and stores
const route = useRoute()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const authStore = useAuthStore()
const toast = useToast()

// State
const category = ref(null)
const allCategories = ref([])
const categoryProducts = ref([])
const filterTags = ref([])
const isLoading = ref(true)
const isProductsLoading = ref(true)
const error = ref(null)
const sortOption = ref('name')
const viewMode = ref(localStorage.getItem('productViewMode') || 'grid')
const currentPage = ref(1)
const itemsPerPage = ref(12)

// Get config
const config = useRuntimeConfig()
const pocketbaseUrl = config.public.pocketbaseUrl

// Pagination
const totalPages = computed(() => {
  return Math.ceil(categoryProducts.value.length / itemsPerPage.value)
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return sortedProducts.value.slice(start, end)
})

const goToPage = (page) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Computed properties
const childCategories = computed(() => {
  if (!category.value) return []
  return allCategories.value.filter(cat => cat.parent === category.value.id)
})

const relatedCategories = computed(() => {
  if (!category.value) return []
  // If it has a parent, show siblings
  if (category.value.parent) {
    return allCategories.value.filter(cat =>
        cat.parent === category.value.parent && cat.id !== category.value.id
    )
  }
  // Otherwise, show some other categories
  return allCategories.value.filter(cat =>
      cat.id !== category.value.id
  ).slice(0, 6)
})

// Sorted products
const sortedProducts = computed(() => {
  if (!categoryProducts.value.length) return []

  const products = [...categoryProducts.value]
  const sortKey = sortOption.value.replace('-', '')
  const isDescending = sortOption.value.startsWith('-')

  return products.sort((a, b) => {
    let valueA = a[sortKey]
    let valueB = b[sortKey]

    // Use promo price if available
    if (sortKey === 'price') {
      valueA = a.promoPrice || a.price
      valueB = b.promoPrice || b.price
    }

    // For numeric values
    if (typeof valueA === 'number') {
      return isDescending ? valueB - valueA : valueA - valueB
    }

    // For string values
    if (typeof valueA === 'string') {
      return isDescending
          ? valueB.localeCompare(valueA)
          : valueA.localeCompare(valueB)
    }

    return 0
  })
})

// Check if product is in wishlist
const isInWishlist = (productId) => {
  return wishlistStore.isInWishlist(productId)
}

// Fetch category by slug
const fetchCategory = async () => {
  isLoading.value = true
  error.value = null

  try {
    const { $pb } = useNuxtApp()

    // Get category by slug
    const categoryData = await $pb.collection('categories').getFirstListItem(`slug="${route.params.slug}"`, {
      expand: 'parent'
    })

    category.value = categoryData

    // Get all categories for potential child categories
    const categoriesData = await $pb.collection('categories').getList(1, 100)
    allCategories.value = categoriesData.items

    // Now fetch products in this category
    fetchCategoryProducts()

  } catch (err) {
    console.error('Error fetching category:', err)
    error.value = 'Category not found or unavailable.'
  } finally {
    isLoading.value = false
  }
}

// Fetch products for this category
const fetchCategoryProducts = async () => {
  if (!category.value) return

  isProductsLoading.value = true
  currentPage.value = 1 // Reset to first page when fetching new products

  try {
    const { $pb } = useNuxtApp()

    // Get products with this category
    const productsData = await $pb.collection('products').getList(1, 100, {
      filter: `category~"${category.value.id}"`,
      sort: sortOption.value,
      expand: 'category,tags'
    })

    categoryProducts.value = productsData.items

  } catch (err) {
    console.error('Error fetching products:', err)
  } finally {
    isProductsLoading.value = false
  }
}

// Add to cart
const addToCart = (product) => {
  const quantity = product.quantity || 1

  cartStore.addItem({
    id: product.id,
    name: product.name,
    price: product.promoPrice || product.price,
    image: product.image,
    quantity: quantity
  })

  toast.success(`${product.name} added to cart`)

  // Show cart drawer
  cartStore.toggleCart()
}

// Toggle wishlist
const toggleWishlist = async (product) => {
  if (!authStore.isAuthenticated) {
    // Redirect to login
    navigateTo('/login?redirect=' + encodeURIComponent(route.fullPath))
    return
  }

  try {
    const result = await wishlistStore.toggleWishlist(product.id)

    if (result.added) {
      toast.success(`${product.name} added to wishlist`)
    } else if (result.removed) {
      toast.info(`${product.name} removed from wishlist`)
    }
  } catch (err) {
    console.error('Error toggling wishlist:', err)
    toast.error('An error occurred')
  }
}

// Filter functions
const removeFilter = (tagId) => {
  filterTags.value = filterTags.value.filter(tag => tag.id !== tagId)
  applyFilters()
}

const clearFilters = () => {
  filterTags.value = []
  applyFilters()
}

const applyFilters = () => {
  // Apply filters logic here
  fetchCategoryProducts()
}

// Save view mode to localStorage
watch(viewMode, (newMode) => {
  localStorage.setItem('productViewMode', newMode)
})

// Watch for route changes to reload data
watch(() => route.params.slug, (newSlug, oldSlug) => {
  if (newSlug !== oldSlug) {
    fetchCategory()
  }
})

// Watch sort option changes
watch(sortOption, () => {
  fetchCategoryProducts()
})

// Lifecycle
onMounted(() => {
  fetchCategory()
})

// Meta
useHead(() => ({
  title: category.value ? `${category.value.name} | Categories` : 'Category',
  meta: [
    {
      name: 'description',
      content: category.value?.description || 'Browse products in this category'
    }
  ]
}))
</script>

<style scoped>
.badge-outline-primary {
  @apply px-3 py-1 text-xs rounded-full border border-primary-500 text-primary-600 font-medium;
}
</style>