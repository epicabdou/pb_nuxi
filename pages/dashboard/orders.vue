<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useToast } from '~/composables/useToast'

definePageMeta({
  layout: 'dashboard'
});


// Composables
const toast = useToast()
const { $pb } = useNuxtApp()

// State
const isLoading = ref(true)
const orders = ref([])
const selectedOrder = ref(null)
const showOrderDetails = ref(false)
const totalOrders = ref(0)
const currentPage = ref(1)
const perPage = ref(10)
const searchQuery = ref('')
const filterStatus = ref('all')
const isUpdatingStatus = ref(false)

// Table sort state
const sortField = ref('created')
const sortDirection = ref('desc')

// Status options for filter and updating
const statusOptions = [
  { value: 'pending', label: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'paid', label: 'Payée', color: 'bg-blue-100 text-blue-800' },
  { value: 'shipped', label: 'Expédiée', color: 'bg-purple-100 text-purple-800' },
  { value: 'delivered', label: 'Livrée', color: 'bg-green-100 text-green-800' },
  { value: 'cancelled', label: 'Annulée', color: 'bg-red-100 text-red-800' }
]

// Available sort options
const sortOptions = [
  { field: 'created', label: 'Date de création' },
  { field: 'totalPrice', label: 'Montant' },
  { field: 'status', label: 'Statut' }
]

// Computed number of pages
const totalPages = computed(() => Math.ceil(totalOrders.value / perPage.value))

// Format currency with euro symbol
const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return '—'
  
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount)
}

// Format date to local format
const formatDate = (dateString) => {
  if (!dateString) return '—'
  
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// Find status option by value
const getStatusOption = (status) => {
  return statusOptions.find(option => option.value === status) || 
         { value: status, label: status, color: 'bg-gray-100 text-gray-800' }
}

// Toggle sort direction or change sort field
const toggleSort = (field) => {
  if (sortField.value === field) {
    // Toggle direction if same field
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    // Set new field and default to desc order
    sortField.value = field
    sortDirection.value = 'desc'
  }
  
  // Refetch with new sort
  fetchOrders()
}

// View order details
const viewOrderDetails = async (order) => {
  try {
    // Get the full order with expanded relations
    const fullOrder = await $pb.collection('orders').getOne(order.id, {
      expand: 'user,orderItems(order).product,payments(order),shippingAddresses(order)'
    })
    
    selectedOrder.value = fullOrder
    showOrderDetails.value = true
  } catch (error) {
    console.error('Error fetching order details:', error)
    toast.error('Erreur lors de la récupération des détails de la commande')
  }
}

// Close order details modal
const closeOrderDetails = () => {
  showOrderDetails.value = false
  // Reset after animation
  setTimeout(() => {
    selectedOrder.value = null
  }, 300)
}

// Update order status
const updateOrderStatus = async (newStatus) => {
  if (!selectedOrder.value || isUpdatingStatus.value) return
  
  isUpdatingStatus.value = true
  
  try {
    // Update the order
    const updatedOrder = await $pb.collection('orders').update(selectedOrder.value.id, {
      status: newStatus
    })
    
    // Update the selected order and the orders list
    selectedOrder.value = {
      ...selectedOrder.value,
      status: updatedOrder.status
    }
    
    // Update in the list
    const index = orders.value.findIndex(o => o.id === selectedOrder.value.id)
    if (index !== -1) {
      orders.value[index].status = updatedOrder.status
    }
    
    toast.success(`Statut mis à jour: ${getStatusOption(newStatus).label}`)
  } catch (error) {
    console.error('Error updating order status:', error)
    toast.error('Erreur lors de la mise à jour du statut de commande')
  } finally {
    isUpdatingStatus.value = false
  }
}

// Fetch orders with filters, sorting and pagination
const fetchOrders = async () => {
  isLoading.value = true
  
  try {
    // Build filter
    let filter = ''
    
    // Add status filter if not 'all'
    if (filterStatus.value !== 'all') {
      filter += `status = "${filterStatus.value}"`
    }
    
    // Add search filter
    if (searchQuery.value.trim()) {
      // Search in ID or user IDs - expand search as needed
      if (filter) filter += ' && '
      filter += `id ~ "${searchQuery.value}" || user.email ~ "${searchQuery.value}" || user.name ~ "${searchQuery.value}"`
    }
    
    // Calculate pagination
    const pageOffset = (currentPage.value - 1) * perPage.value
    
    // Build sort string
    const sort = sortDirection.value === 'desc' ? `-${sortField.value}` : sortField.value
    
    // Get orders with pagination
    const result = await $pb.collection('orders').getList(currentPage.value, perPage.value, {
      sort,
      filter,
      expand: 'user',
      skipTotal: false
    })
    
    orders.value = result.items
    totalOrders.value = result.totalItems
    
    if (orders.value.length === 0 && currentPage.value > 1) {
      // If no orders on current page but there are previous pages, go back
      currentPage.value = 1
      fetchOrders()
    }
  } catch (error) {
    console.error('Error fetching orders:', error)
    toast.error('Erreur lors de la récupération des commandes')
    orders.value = []
    totalOrders.value = 0
  } finally {
    isLoading.value = false
  }
}

// Change page
const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
}

// Reset filters
const resetFilters = () => {
  searchQuery.value = ''
  filterStatus.value = 'all'
  sortField.value = 'created'
  sortDirection.value = 'desc'
  currentPage.value = 1
  fetchOrders()
}

// Watch for filter/search changes
watch([searchQuery, filterStatus], () => {
  currentPage.value = 1 // Reset to first page on filter change
  fetchOrders()
}, { debounce: 300 })

// Lifecycle
onMounted(() => {
  fetchOrders()
})
</script>

<template>
  <div class="p-6">
    <!-- Header and filters -->
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-6">
      <h1 class="heading-2 mb-4 md:mb-0">Gestion des Commandes</h1>
      
      <div class="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 sm:items-center">
        <!-- Search input -->
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher une commande..."
            class="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-full"
          />
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <!-- Status filter -->
        <select
          v-model="filterStatus"
          class="py-2 px-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="all">Tous les statuts</option>
          <option v-for="option in statusOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
        
        <!-- Reset filters -->
        <button
          @click="resetFilters"
          class="py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm"
        >
          Réinitialiser
        </button>
      </div>
    </div>
    
    <!-- Loading state -->
    <div v-if="isLoading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>
    
    <!-- Empty state -->
    <div v-else-if="orders.length === 0" class="bg-white rounded-lg shadow-sm p-8 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
      <h2 class="heading-3 mb-2">Aucune commande trouvée</h2>
      <p class="text-gray-500 mb-4">Aucune commande ne correspond à vos critères de recherche.</p>
      <button @click="resetFilters" class="btn-primary">Réinitialiser les filtres</button>
    </div>
    
    <!-- Orders table -->
    <div v-else class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th 
                scope="col" 
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                @click="toggleSort('created')"
              >
                <div class="flex items-center">
                  Date
                  <svg v-if="sortField === 'created'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path v-if="sortDirection === 'asc'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </th>
              <th 
                scope="col" 
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                @click="toggleSort('totalPrice')"
              >
                <div class="flex items-center">
                  Montant
                  <svg v-if="sortField === 'totalPrice'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path v-if="sortDirection === 'asc'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </th>
              <th 
                scope="col" 
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                @click="toggleSort('status')"
              >
                <div class="flex items-center">
                  Statut
                  <svg v-if="sortField === 'status'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path v-if="sortDirection === 'asc'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ order.id.substring(0, 8) }}...</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div v-if="order.expand?.user?.avatar" class="flex-shrink-0 h-8 w-8">
                    <img class="h-8 w-8 rounded-full" :src="`${$pb.baseUrl}/api/files/users/${order.expand.user.id}/${order.expand.user.avatar}`" alt="" />
                  </div>
                  <div v-else class="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <div class="text-sm font-medium text-gray-900">
                      {{ order.expand?.user?.name || 'Client' }}
                    </div>
                    <div class="text-xs text-gray-500">
                      {{ order.expand?.user?.email || 'N/A' }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(order.created) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ formatCurrency(order.totalPrice) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full" :class="getStatusOption(order.status).color">
                  {{ getStatusOption(order.status).label }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button @click="viewOrderDetails(order)" class="text-primary-600 hover:text-primary-900 mr-3">
                  Détails
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button 
            @click="goToPage(currentPage - 1)" 
            :disabled="currentPage === 1"
            :class="[
              'relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md',
              currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
            ]"
          >
            Précédent
          </button>
          <button 
            @click="goToPage(currentPage + 1)" 
            :disabled="currentPage === totalPages"
            :class="[
              'ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md',
              currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
            ]"
          >
            Suivant
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Affichage de 
              <span class="font-medium">{{ orders.length === 0 ? 0 : (currentPage - 1) * perPage + 1 }}</span>
              à
              <span class="font-medium">{{ Math.min(currentPage * perPage, totalOrders) }}</span>
              sur
              <span class="font-medium">{{ totalOrders }}</span>
              résultats
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                @click="goToPage(1)"
                :disabled="currentPage === 1"
                :class="[
                  'relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium',
                  currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                ]"
              >
                <span class="sr-only">Premier</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                  <path fill-rule="evenodd" d="M7.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L3.414 10l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                </svg>
              </button>
              <button
                @click="goToPage(currentPage - 1)"
                :disabled="currentPage === 1"
                :class="[
                  'relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium',
                  currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                ]"
              >
                <span class="sr-only">Précédent</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              
              <!-- Page numbers -->
              <template v-for="page in totalPages" :key="page">
                <!-- Show current page, 2 pages before and after, first and last pages, and ellipsis -->
                <template v-if="
                  page === 1 || 
                  page === totalPages || 
                  (page >= currentPage - 1 && page <= currentPage + 1) ||
                  (currentPage <= 3 && page <= 5) ||
                  (currentPage >= totalPages - 2 && page >= totalPages - 4)
                ">
                  <button
                    @click="goToPage(page)"
                    :class="[
                      'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                      currentPage === page 
                        ? 'z-10 bg-primary-50 border-primary-500 text-primary-600' 
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    ]"
                  >
                    {{ page }}
                  </button>
                </template>
                
                <!-- Ellipsis -->
                <template v-else-if="
                  (page === 2 && currentPage > 4) ||
                  (page === totalPages - 1 && currentPage < totalPages - 3)
                ">
                  <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    ...
                  </span>
                </template>
              </template>

              <button
                @click="goToPage(currentPage + 1)"
                :disabled="currentPage === totalPages"
                :class="[
                  'relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium',
                  currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                ]"
              >
                <span class="sr-only">Suivant</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              <button
                @click="goToPage(totalPages)"
                :disabled="currentPage === totalPages"
                :class="[
                  'relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium',
                  currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                ]"
              >
                <span class="sr-only">Dernier</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 15.707a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L8.586 10 4.293 14.293a1 1 0 000 1.414z" clip-rule="evenodd" />
                  <path fill-rule="evenodd" d="M12.293 15.707a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L16.586 10l-4.293 4.293a1 1 0 000 1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Order details modal -->
    <div v-if="showOrderDetails" class="fixed inset-0 z-50 overflow-y-auto" @click.self="closeOrderDetails">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay -->
        <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
        
        <!-- Modal panel -->
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="flex justify-between items-start">
              <h3 class="heading-3 mb-4">Détails de la commande</h3>
              <button @click="closeOrderDetails" class="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div v-if="selectedOrder" class="mt-4">
              <!-- Order information -->
              <div class="bg-gray-50 p-4 rounded-lg mb-6">
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <div class="text-sm text-gray-500">Commande #</div>
                    <div class="font-medium">{{ selectedOrder.id.substring(0, 8) }}...</div>
                  </div>
                  <div>
                    <div class="text-sm text-gray-500">Date</div>
                    <div class="font-medium">{{ formatDate(selectedOrder.created) }}</div>
                  </div>
                  <div>
                    <div class="text-sm text-gray-500">Montant</div>
                    <div class="font-medium">{{ formatCurrency(selectedOrder.totalPrice) }}</div>
                  </div>
                  <div>
                    <div class="text-sm text-gray-500">Statut</div>
                    <div class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getStatusOption(selectedOrder.status).color">
                      {{ getStatusOption(selectedOrder.status).label }}
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Customer information -->
              <div class="mb-6">
                <h4 class="font-medium mb-2">Informations Client</h4>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <div class="flex items-center">
                    <div v-if="selectedOrder.expand?.user?.avatar" class="flex-shrink-0 h-10 w-10">
                      <img class="h-10 w-10 rounded-full" :src="`${$pb.baseUrl}/api/files/users/${selectedOrder.expand.user.id}/${selectedOrder.expand.user.avatar}`" alt="" />
                    </div>
                    <div v-else class="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ selectedOrder.expand?.user?.name || 'N/A' }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ selectedOrder.expand?.user?.email || 'N/A' }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Order items -->
              <div class="mb-6">
                <h4 class="font-medium mb-2">Articles</h4>
                <div class="border rounded-lg overflow-hidden">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produit</th>
                        <th scope="col" class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Quantité</th>
                        <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Prix unitaire</th>
                        <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr v-for="(item, index) in selectedOrder.expand?.orderItems" :key="index">
                        <td class="px-4 py-3 whitespace-nowrap">
                          <div class="flex items-center">
                            <div v-if="item.expand?.product?.image" class="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md overflow-hidden">
                              <img 
                                :src="`${$pb.baseUrl}/api/files/products/${item.expand.product.id}/${item.expand.product.image}`" 
                                :alt="item.expand.product.name"
                                class="h-full w-full object-cover"
                              />
                            </div>
                            <div v-else class="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div class="ml-4">
                              <div class="text-sm font-medium text-gray-900">
                                {{ item.expand?.product?.name || 'Produit' }}
                              </div>
                              <div v-if="item.expand?.product?.id" class="text-xs text-gray-500">
                                ID: {{ item.expand.product.id.substring(0, 8) }}...
                              </div>
                            </div>
                          </div>
                        </td>
                        <td class="px-4 py-3 whitespace-nowrap text-center">
                          <span class="px-2 py-1 text-xs bg-gray-100 rounded-full">{{ item.quantity }}</span>
                        </td>
                        <td class="px-4 py-3 whitespace-nowrap text-right">
                          {{ formatCurrency(item.price) }}
                        </td>
                        <td class="px-4 py-3 whitespace-nowrap text-right font-medium">
                          {{ formatCurrency(item.price * item.quantity) }}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot class="bg-gray-50">
                      <tr>
                        <td colspan="3" class="px-4 py-3 text-right text-sm font-medium">Total</td>
                        <td class="px-4 py-3 text-right font-bold">{{ formatCurrency(selectedOrder.totalPrice) }}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              
              <!-- Shipping Address -->
              <div v-if="selectedOrder.expand?.shippingAddresses && selectedOrder.expand.shippingAddresses.length > 0" class="mb-6">
                <h4 class="font-medium mb-2">Adresse de livraison</h4>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <div class="text-sm">
                    <p class="font-medium">{{ selectedOrder.expand.shippingAddresses[0].fullName }}</p>
                    <p>{{ selectedOrder.expand.shippingAddresses[0].address }}</p>
                    <p>{{ selectedOrder.expand.shippingAddresses[0].postCode }} {{ selectedOrder.expand.shippingAddresses[0].city }}</p>
                    <p>{{ selectedOrder.expand.shippingAddresses[0].country }}</p>
                    <p class="mt-2">{{ selectedOrder.expand.shippingAddresses[0].phone }}</p>
                  </div>
                </div>
              </div>
              
              <!-- Payment Information -->
              <div v-if="selectedOrder.expand?.payments && selectedOrder.expand.payments.length > 0" class="mb-6">
                <h4 class="font-medium mb-2">Paiement</h4>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <div class="text-sm text-gray-500">Méthode</div>
                      <div class="font-medium capitalize">
                        {{ selectedOrder.expand.payments[0].paymentMethod === 'credit_card' ? 'Carte bancaire' : 
                           selectedOrder.expand.payments[0].paymentMethod === 'paypal' ? 'PayPal' : 
                           selectedOrder.expand.payments[0].paymentMethod }}
                      </div>
                    </div>
                    <div>
                      <div class="text-sm text-gray-500">Statut</div>
                      <div class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" 
                           :class="selectedOrder.expand.payments[0].status === 'completed' ? 'bg-green-100 text-green-800' : 
                                  selectedOrder.expand.payments[0].status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                  'bg-red-100 text-red-800'">
                        {{ selectedOrder.expand.payments[0].status === 'completed' ? 'Terminé' : 
                           selectedOrder.expand.payments[0].status === 'pending' ? 'En attente' : 
                           'Échoué' }}
                      </div>
                    </div>
                    <div>
                      <div class="text-sm text-gray-500">Date</div>
                      <div class="font-medium">{{ formatDate(selectedOrder.expand.payments[0].created) }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Modal footer with action buttons -->
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <!-- Status update dropdown -->
            <div class="relative inline-block text-left">
              <div>
                <button 
                  type="button" 
                  class="btn-primary-sm flex items-center" 
                  :disabled="isUpdatingStatus"
                  @click="$refs.statusDropdown.classList.toggle('hidden')"
                >
                  <span v-if="isUpdatingStatus" class="mr-2">
                    <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                  <span>Modifier le statut</span>
                  <svg class="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
              <div 
                ref="statusDropdown"
                class="hidden origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 z-50" 
                role="menu" 
                aria-orientation="vertical"
              >
                <div class="py-1" role="none">
                  <button 
                    v-for="option in statusOptions" 
                    :key="option.value"
                    @click="updateOrderStatus(option.value); $refs.statusDropdown.classList.add('hidden')"
                    :disabled="selectedOrder && selectedOrder.status === option.value"
                    :class="[
                      'block w-full text-left px-4 py-2 text-sm',
                      selectedOrder && selectedOrder.status === option.value 
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                        : 'text-gray-700 hover:bg-gray-100'
                    ]"
                    role="menuitem"
                  >
                    <div class="flex items-center">
                      <span class="h-2 w-2 rounded-full mr-2" :class="option.color.replace('text-', 'bg-').replace('-100', '-500')"></span>
                      {{ option.label }}
                    </div>
                  </button>
                </div>
              </div>
            </div>
            
            <button @click="closeOrderDetails" class="btn-outline-sm ml-3 mt-3 sm:mt-0">
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any custom styles here */
.btn-primary-sm {
  @apply inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:text-sm;
}

.btn-outline-sm {
  @apply inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:text-sm;
}
</style>