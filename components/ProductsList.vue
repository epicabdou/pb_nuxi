<template>
  <main class="py-8 md:py-12">
    <div class="responsive-container">
      <!-- Banner and filter section -->
      <section class="mb-8">
        <div class="rounded-xl overflow-hidden relative">
          <!-- Banner image -->
          <div class="h-64 md:h-80 lg:h-96 w-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
            <div class="text-center text-white px-4 relative z-10">
              <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Discover Our Products</h1>
              <p class="text-lg md:text-xl max-w-2xl mx-auto">Browse our collection of high-quality products designed for your needs.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Filter and sort section -->
      <section class="mb-8">
        <div class="bg-white dark:bg-background-800 rounded-lg shadow-sm p-4">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <!-- Categories filter with dropdown -->
            <div class="relative flex-grow max-w-xs">
              <label for="category-filter" class="sr-only">Filter by Category</label>
              <select
                  id="category-filter"
                  v-model="selectedCategory"
                  class="input-primary py-2 pr-8 text-sm rounded-lg w-full appearance-none cursor-pointer"
                  @change="filterProducts"
              >
                <option value="">All Categories</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
              <div class="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-background-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <!-- Filters and sorting -->
            <div class="flex items-center gap-2 self-stretch md:self-auto">
              <!-- Sort dropdown -->
              <div class="relative flex-grow md:flex-grow-0">
                <select
                    v-model="sortOption"
                    class="input-primary py-2 pl-3 pr-8 text-sm rounded-lg appearance-none cursor-pointer"
                    @change="sortProducts"
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

          <!-- Active filters -->
          <div v-if="activeFilters.length > 0" class="mt-4 flex flex-wrap items-center gap-2">
            <span class="text-sm text-background-700 dark:text-background-300">Active Filters:</span>
            <div
                v-for="filter in activeFilters"
                :key="filter.id"
                class="inline-flex items-center bg-background-100 dark:bg-background-800 text-xs rounded-full px-3 py-1"
            >
              <span>{{ filter.name }}</span>
              <button @click="removeFilter(filter.id)" class="ml-2 text-background-500 hover:text-error-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <button
                v-if="activeFilters.length > 0"
                @click="clearFilters"
                class="text-xs text-primary-600 hover:underline"
            >
              Clear All
            </button>
          </div>
        </div>
      </section>

      <!-- Products count -->
      <div class="flex justify-between items-center mb-6">
        <p class="text-sm text-background-700 dark:text-background-300">
          {{ filteredProducts.length }} products found
        </p>
        <div class="text-sm text-background-500">
          <span v-if="isLoading">Loading products...</span>
        </div>
      </div>

      <!-- Loading state -->
      <div v-if="isLoading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>

      <!-- Empty state if no products -->
      <div v-else-if="filteredProducts.length === 0" class="card-fancy text-center py-16">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-background-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="text-xl font-bold mb-2">No Products Found</h3>
        <p class="text-background-600 dark:text-background-400 mb-6">
          We couldn't find any products that match your criteria. Please try different filters or check back later.
        </p>
        <button @click="clearFilters" class="btn-primary">
          Clear Filters
        </button>
      </div>

      <!-- Grid view -->
      <div
          v-else-if="viewMode === 'grid'"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <ProductCard
            v-for="product in paginatedProducts"
            :key="product.id"
            :product="product"
            :is-in-wishlist="isInWishlist(product.id)"
            @add-to-cart="addToCart"
            @add-to-wishlist="toggleWishlist"
        />
      </div>

      <!-- List view -->
      <div
          v-else-if="viewMode === 'list'"
          class="space-y-4"
      >
        <ProductListItem
            v-for="product in paginatedProducts"
            :key="product.id"
            :product="product"
            :is-in-wishlist="isInWishlist(product.id)"
            @add-to-cart="addToCart"
            @add-to-wishlist="toggleWishlist"
        />
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-12 flex justify-center">
        <nav class="inline-flex rounded-md shadow-sm" aria-label="Pagination">
          <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-background-300 dark:border-background-700 bg-white dark:bg-background-800 text-sm font-medium"
              :class="currentPage === 1 ? 'text-background-400 cursor-not-allowed' : 'text-background-700 dark:text-background-300 hover:bg-background-100 dark:hover:bg-background-700'"
          >
            <span class="sr-only">Previous</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <!-- Page numbers -->
          <template v-for="page in paginationRange" :key="page">
            <button
                v-if="page !== '...'"
                @click="goToPage(page)"
                :class="[
                'relative inline-flex items-center px-4 py-2 border border-background-300 dark:border-background-700 text-sm font-medium',
                currentPage === page
                  ? 'z-10 bg-primary-500 border-primary-500 text-white'
                  : 'bg-white dark:bg-background-800 text-background-700 dark:text-background-300 hover:bg-background-100 dark:hover:bg-background-700'
              ]"
            >
              {{ page }}
            </button>
            <span
                v-else
                class="relative inline-flex items-center px-4 py-2 border border-background-300 dark:border-background-700 bg-white dark:bg-background-800 text-sm font-medium text-background-700 dark:text-background-300"
            >
              ...
            </span>
          </template>

          <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-background-300 dark:border-background-700 bg-white dark:bg-background-800 text-sm font-medium"
              :class="currentPage === totalPages ? 'text-background-400 cursor-not-allowed' : 'text-background-700 dark:text-background-300 hover:bg-background-100 dark:hover:bg-background-700'"
          >
            <span class="sr-only">Next</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '~/stores/cart'
import { useWishlistStore } from '~/stores/wishlist'
import { useAuthStore } from '~/stores/auth'
import { useToast } from '~/composables/useToast'
import ProductCard from '~/components/ProductCard.vue'
import ProductListItem from '~/components/ProductListItem.vue'

// Route and router
const route = useRoute()
const router = useRouter()

// Stores
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const authStore = useAuthStore()
const toast = useToast()

// State
const products = ref([])
const categories = ref([])
const isLoading = ref(true)
const error = ref(null)

// View options
const viewMode = ref(localStorage.getItem('productViewMode') || 'grid')
const itemsPerPage = ref(12)
const currentPage = ref(parseInt(route.query.page) || 1)
const sortOption = ref(route.query.sort || 'name')
const selectedCategory = ref(route.query.category || '')
const activeFilters = ref([])

// Get config
const config = useRuntimeConfig()
const pocketbaseUrl = config.public.pocketbaseUrl

// Computed properties
const filteredProducts = computed(() => {
  if (!products.value.length) return []

  let result = [...products.value]

  // Apply category filter
  if (selectedCategory.value) {
    result = result.filter(product => {
      // Handle array of categories or single category
      if (product.expand?.category) {
        if (Array.isArray(product.expand.category)) {
          return product.expand.category.some(cat => cat.id === selectedCategory.value)
        } else {
          return product.expand.category.id === selectedCategory.value
        }
      }
      return false
    })
  }

  // Apply more filters here if needed

  return result
})

const sortedProducts = computed(() => {
  if (!filteredProducts.value.length) return []

  const result = [...filteredProducts.value]
  const sortKey = sortOption.value.replace('-', '')
  const isDescending = sortOption.value.startsWith('-')

  return result.sort((a, b) => {
    let valueA = a[sortKey]
    let valueB = b[sortKey]

    // Use promo price if available for price sorting
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

const totalPages = computed(() => {
  return Math.ceil(sortedProducts.value.length / itemsPerPage.value)
})

const paginatedProducts = computed(() => {
  if (!sortedProducts.value.length) return []

  const startIndex = (currentPage.value - 1) * itemsPerPage.value
  return sortedProducts.value.slice(startIndex, startIndex + itemsPerPage.value)
})

// Create pagination range with ... for large number of pages
const paginationRange = computed(() => {
  if (totalPages.value <= 7) {
    return Array.from({ length: totalPages.value }, (_, i) => i + 1)
  }

  // Always show first and last page
  // Show ellipsis when needed
  const range = []

  if (currentPage.value <= 3) {
    // First pages
    for (let i = 1; i <= 5; i++) {
      range.push(i)
    }
    range.push('...')
    range.push(totalPages.value)
  } else if (currentPage.value >= totalPages.value - 2) {
    // Last pages
    range.push(1)
    range.push('...')
    for (let i = totalPages.value - 4; i <= totalPages.value; i++) {
      range.push(i)
    }
  } else {
    // Middle pages
    range.push(1)
    range.push('...')
    for (let i = currentPage.value - 1; i <= currentPage.value + 1; i++) {
      range.push(i)
    }
    range.push('...')
    range.push(totalPages.value)
  }

  return range
})

// Methods
async function fetchProducts() {
  isLoading.value = true
  error.value = null

  try {
    const { $pb } = useNuxtApp()

    // Fetch all products with expand for categories and tags
    const productsData = await $pb.collection('products').getList(1, 100, {
      expand: 'category,tags',
      sort: sortOption.value
    })

    products.value = productsData.items
  } catch (err) {
    console.error('Error fetching products:', err)
    error.value = 'Failed to load products. Please try again later.'
    toast.error('Failed to load products')
  } finally {
    isLoading.value = false
  }
}

async function fetchCategories() {
  try {
    const { $pb } = useNuxtApp()

    // Fetch all categories
    const categoriesData = await $pb.collection('categories').getList(1, 100)
    categories.value = categoriesData.items

    // Update active filters if category is selected
    updateActiveFilters()
  } catch (err) {
    console.error('Error fetching categories:', err)
  }
}

// Pagination methods
function goToPage(page) {
  currentPage.value = page
  updateQueryParams()
  scrollToTop()
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    updateQueryParams()
    scrollToTop()
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
    updateQueryParams()
    scrollToTop()
  }
}

// Filter and sort methods
function filterProducts() {
  currentPage.value = 1
  updateActiveFilters()
  updateQueryParams()
}

function sortProducts() {
  updateQueryParams()
}

function removeFilter(filterId) {
  if (selectedCategory.value === filterId) {
    selectedCategory.value = ''
  }

  // Handle other filter types here

  updateActiveFilters()
  updateQueryParams()
}

function clearFilters() {
  selectedCategory.value = ''
  activeFilters.value = []
  updateQueryParams()
}

function updateActiveFilters() {
  const filters = []

  // Add category filter if selected
  if (selectedCategory.value) {
    const category = categories.value.find(cat => cat.id === selectedCategory.value)
    if (category) {
      filters.push({
        id: category.id,
        name: `Category: ${category.name}`
      })
    }
  }

  // Add more filter types here

  activeFilters.value = filters
}

function updateQueryParams() {
  const query = {
    ...route.query,
    page: currentPage.value,
    sort: sortOption.value
  }

  if (selectedCategory.value) {
    query.category = selectedCategory.value
  } else {
    delete query.category
  }

  // Remove page parameter if it's 1 (default)
  if (query.page === 1) {
    delete query.page
  }

  router.replace({ query })
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Wishlist functions
function isInWishlist(productId) {
  return wishlistStore.isInWishlist(productId)
}

async function toggleWishlist(product) {
  if (!authStore.isAuthenticated) {
    // Redirect to login
    navigateTo(`/login?redirect=${encodeURIComponent(route.fullPath)}`)
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
    toast.error('Failed to update wishlist')
  }
}

// Cart functions
function addToCart(product) {
  const quantity = product.quantity || 1

  cartStore.addItem({
    id: product.id,
    name: product.name,
    price: product.promoPrice || product.price,
    image: product.image,
    quantity: quantity
  })

  toast.success(`${product.name} added to cart`)

  // Optionally open cart drawer
  cartStore.toggleCart()
}

// Watch for view mode changes to save in localStorage
watch(viewMode, (newMode) => {
  localStorage.setItem('productViewMode', newMode)
})

// Watch for query param changes to update state
watch(() => route.query, (newQuery) => {
  if (newQuery.page) {
    currentPage.value = parseInt(newQuery.page)
  } else {
    currentPage.value = 1
  }

  if (newQuery.sort) {
    sortOption.value = newQuery.sort
  }

  if (newQuery.category !== undefined) {
    selectedCategory.value = newQuery.category
    updateActiveFilters()
  }
}, { deep: true })

// Lifecycle hooks
onMounted(async () => {
  await Promise.all([
    fetchCategories(),
    fetchProducts()
  ])
})

// Page meta
useHead({
  title: 'Products - Discover Our Collection',
  meta: [
    { name: 'description', content: 'Browse our collection of high-quality products designed for your needs.' }
  ]
})
</script>