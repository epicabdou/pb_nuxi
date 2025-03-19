<template>
  <div>
    <!-- Hero Section for Product Listing -->
    <section class="relative bg-gradient-to-b from-background-50 to-background-200 dark:from-background-900 dark:to-background-800 py-10 mb-8">
      <div class="absolute -z-10 top-0 left-0 right-0 h-full overflow-hidden">
        <div class="absolute -top-24 right-10 w-80 h-80 bg-primary-200/50 dark:bg-primary-900/20 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-10 w-80 h-80 bg-secondary-200/50 dark:bg-secondary-900/20 rounded-full blur-3xl"></div>
      </div>
      <div class="responsive-container">
        <h1 class="heading-2 mb-6">Product Categories</h1>
        <p class="body-large text-background-700 dark:text-background-300 max-w-2xl">
          {{ pageDescription }}
        </p>
        <nav class="flex text-sm" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
              <NuxtLink to="/" class="text-background-600 hover:text-primary-600">Accueil</NuxtLink>
            </li>
            <li>
              <div class="flex items-center">
                <span class="mx-2 text-background-500">/</span>
                <span class="text-primary-600">Catégories</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
    </section>

    <section class="py-8">
      <div class="responsive-container">

        <!-- Loading state -->
        <div v-if="isLoading" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="rounded-lg p-8 bg-error-50 border border-error-200 text-error-700">
          <p class="font-medium">{{ error }}</p>
          <button @click="fetchCategories" class="btn-primary mt-4">Réessayer</button>
        </div>

        <!-- Filter sidebar and categories grid -->
        <div v-else class="flex flex-col lg:flex-row gap-8">
          <!-- Categories grid -->
          <div class="lg:w-3/4">
            <div v-if="categories.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <NuxtLink
                  v-for="category in categories"
                  :key="category.id"
                  :to="`/categories/${category.slug}`"
                  class="bg-white dark:bg-background-800 rounded-lg shadow-sm hover:shadow-md transition-all p-4 flex flex-col items-center"
              >
                <!-- Circular category image -->
                <div v-if="category.image" class="mb-4">
                  <div class="w-24 h-24 rounded-full overflow-hidden border-2 border-primary-100 shadow-sm">
                    <img
                        :src="`${pocketbaseUrl}/api/files/categories/${category.id}/${category.image}`"
                        :alt="category.name"
                        class="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <h3 class="font-medium text-center mb-2">{{ category.name }}</h3>

                <p v-if="category.description" class="text-sm text-background-600 dark:text-background-400 mb-3 text-center line-clamp-2">
                  {{ category.description }}
                </p>

                <span class="text-xs px-3 py-1 bg-background-100 dark:bg-background-700 rounded-full text-background-700 dark:text-background-300">
                  {{ getCategoryProductCount(category.id) }} produits
                </span>
              </NuxtLink>
            </div>

            <!-- Empty state -->
            <div v-else class="bg-white dark:bg-background-800 rounded-lg shadow-sm p-8 text-center">
              <h3 class="heading-4 mb-4">Aucune catégorie trouvée</h3>
              <p class="text-background-600 dark:text-background-400">Vérifiez ultérieurement pour de nouvelles catégories.</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRuntimeConfig } from 'nuxt/app'

// State
const categories = ref([])
const isLoading = ref(true)
const error = ref(null)
const products = ref([])
const itemsPerPage = ref(20)
const sortOption = ref('name')

// Get config
const config = useRuntimeConfig()
const pocketbaseUrl = config.public.pocketbaseUrl

// Fetch data
const fetchCategories = async () => {
  isLoading.value = true
  error.value = null

  try {
    const { $pb } = useNuxtApp()

    // Fetch categories with parent info for hierarchical structure
    const categoriesData = await $pb.collection('categories').getList(1, 50, {
      sort: sortOption.value,
      expand: 'parent'
    })

    categories.value = categoriesData.items

    // Also fetch products to get counts per category
    const productsData = await $pb.collection('products').getList(1, 100, {
      expand: 'category'
    })

    products.value = productsData.items

  } catch (err) {
    console.error('Error fetching categories:', err)
    error.value = 'Impossible de charger les catégories. Veuillez réessayer.'
  } finally {
    isLoading.value = false
  }
}

// Get product count for a category
const getCategoryProductCount = (categoryId) => {
  return products.value.filter(product => {
    // Check if this product belongs to this category
    return product.expand?.category?.some(cat => cat.id === categoryId)
  }).length
}

// Computed values
const totalPages = computed(() => {
  return Math.ceil(categories.value.length / itemsPerPage.value)
})

// Lifecycle
onMounted(() => {
  fetchCategories()
})

// Meta
useHead({
  title: 'Catégories de produits',
  meta: [
    { name: 'description', content: 'Parcourez toutes les catégories de produits dans notre boutique' }
  ]
})
</script>