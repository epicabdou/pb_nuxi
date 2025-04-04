<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useToast } from '~/composables/useToast'

// Stores and composables
const authStore = useAuthStore()
const toast = useToast()

// State
const isLoading = ref(true)
const orders = ref([])
const selectedOrder = ref(null)
const showOrderDetails = ref(false)

// Calculate total amount for an order
const calculateOrderTotal = (order) => {
  // Use stored total price if available
  if (order.totalPrice) {
    return formatCurrency(order.totalPrice)
  }

  // Otherwise calculate from items
  if (order.expand?.orderItems) {
    const total = order.expand.orderItems.reduce((sum, item) => {
      return sum + (item.quantity * item.price)
    }, 0)
    return formatCurrency(total)
  }

  return formatCurrency(0)
}

// Format currency with euro symbol
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount)
}

// Format date to local format
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

// Get color class based on order status
const getStatusColor = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'paid':
      return 'bg-blue-100 text-blue-800'
    case 'shipped':
      return 'bg-purple-100 text-purple-800'
    case 'delivered':
      return 'bg-green-100 text-green-800'
    case 'cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Get human-readable status labels
const getStatusLabel = (status) => {
  const statusMap = {
    'pending': 'En attente',
    'paid': 'Payée',
    'shipped': 'Expédiée',
    'delivered': 'Livrée',
    'cancelled': 'Annulée'
  }
  return statusMap[status] || status
}

// View order details
const viewOrderDetails = async (order) => {
  try {
    const { $pb } = useNuxtApp()
    
    // Get the full order with expanded relations
    const fullOrder = await $pb.collection('orders').getOne(order.id, {
      expand: 'orderItems(order).product,payments(order),shippingAddresses(order)'
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

// Fetch user's orders
const fetchOrders = async () => {
  isLoading.value = true
  
  try {
    const { $pb } = useNuxtApp()
    
    if (!$pb?.authStore?.model?.id) {
      console.error('User not authenticated')
      return
    }
    
    // Get orders for the current user with expanded items
    const result = await $pb.collection('orders').getList(1, 50, {
      filter: `user.id = "${$pb.authStore.model.id}"`,
      sort: '-created',
      expand: 'orderItems(order)'
    })
    
    orders.value = result.items
    console.log('Orders fetched:', orders.value.length)
  } catch (error) {
    console.error('Error fetching orders:', error)
    toast.error('Erreur lors de la récupération de vos commandes')
  } finally {
    isLoading.value = false
  }
}

// Check if orders exist
const hasOrders = computed(() => orders.value.length > 0)

// Lifecycle
onMounted(async () => {
  if (authStore.isAuthenticated) {
    await fetchOrders()
  }
})
</script>

<template>
  <div class="responsive-container section-padding">
    <h1 class="heading-2 mb-6">Mes Commandes</h1>
    
    <!-- Loading state -->
    <div v-if="isLoading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>
    
    <!-- No orders state -->
    <div v-else-if="!hasOrders" class="card text-center py-12">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-background-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
      <h2 class="heading-3 mb-4">Aucune commande</h2>
      <p class="body-regular text-background-600 mb-6">Vous n'avez pas encore passé de commande.</p>
      <NuxtLink to="/products" class="btn-primary">Découvrir nos produits</NuxtLink>
    </div>
    
    <!-- Orders list -->
    <div v-else class="space-y-6">
      <div v-for="order in orders" :key="order.id" class="card hover:shadow-md transition-shadow">
        <div class="flex flex-col md:flex-row md:items-center justify-between p-4 border-b border-background-200">
          <div class="mb-2 md:mb-0">
            <div class="text-sm text-background-600">Commande #</div>
            <div class="font-medium">{{ order.id.substring(0, 8) }}...</div>
          </div>
          <div class="mb-2 md:mb-0">
            <div class="text-sm text-background-600">Date</div>
            <div class="font-medium">{{ formatDate(order.created) }}</div>
          </div>
          <div class="mb-2 md:mb-0">
            <div class="text-sm text-background-600">Montant</div>
            <div class="font-medium">{{ calculateOrderTotal(order) }}</div>
          </div>
          <div class="mb-2 md:mb-0">
            <div class="text-sm text-background-600">Statut</div>
            <div class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getStatusColor(order.status)">
              {{ getStatusLabel(order.status) }}
            </div>
          </div>
          <button @click="viewOrderDetails(order)" class="btn-outline-sm text-sm mt-2 md:mt-0">
            Voir détails
          </button>
        </div>
        
        <!-- Order items summary -->
        <div class="p-4">
          <div v-if="order.expand?.orderItems" class="space-y-2">
            <div v-for="(item, index) in order.expand.orderItems.slice(0, 3)" :key="index" class="flex items-center text-sm">
              <div class="w-6 h-6 bg-background-100 rounded-full flex items-center justify-center mr-2">
                <span class="text-xs">{{ item.quantity }}</span>
              </div>
              <span class="truncate flex-grow">{{ item.expand?.product?.name || 'Produit' }}</span>
              <span class="font-medium ml-2">{{ formatCurrency(item.price * item.quantity) }}</span>
            </div>
            
            <!-- Show count of additional items if more than 3 -->
            <div v-if="order.expand.orderItems.length > 3" class="text-sm text-background-600 italic mt-2">
              + {{ order.expand.orderItems.length - 3 }} article(s) supplémentaire(s)
            </div>
          </div>
          <div v-else class="text-sm text-background-600 italic">
            Chargement des articles...
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
              <button @click="closeOrderDetails" class="text-background-500 hover:text-background-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div v-if="selectedOrder" class="mt-4">
              <!-- Order information -->
              <div class="bg-background-50 p-4 rounded-lg mb-6">
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <div class="text-sm text-background-600">Commande #</div>
                    <div class="font-medium">{{ selectedOrder.id.substring(0, 8) }}...</div>
                  </div>
                  <div>
                    <div class="text-sm text-background-600">Date</div>
                    <div class="font-medium">{{ formatDate(selectedOrder.created) }}</div>
                  </div>
                  <div>
                    <div class="text-sm text-background-600">Montant</div>
                    <div class="font-medium">{{ calculateOrderTotal(selectedOrder) }}</div>
                  </div>
                  <div>
                    <div class="text-sm text-background-600">Statut</div>
                    <div class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getStatusColor(selectedOrder.status)">
                      {{ getStatusLabel(selectedOrder.status) }}
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Order items -->
              <div class="mb-6">
                <h4 class="font-medium mb-2">Articles</h4>
                <div class="border rounded-lg overflow-hidden">
                  <table class="min-w-full divide-y divide-background-200">
                    <thead class="bg-background-50">
                      <tr>
                        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-background-500 uppercase tracking-wider">Produit</th>
                        <th scope="col" class="px-4 py-3 text-center text-xs font-medium text-background-500 uppercase tracking-wider">Quantité</th>
                        <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-background-500 uppercase tracking-wider">Prix unitaire</th>
                        <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-background-500 uppercase tracking-wider">Total</th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-background-200">
                      <tr v-for="(item, index) in selectedOrder.expand?.orderItems" :key="index">
                        <td class="px-4 py-3 whitespace-nowrap">
                          <div class="flex items-center">
                            <div v-if="item.expand?.product?.image" class="flex-shrink-0 h-10 w-10 bg-background-100 rounded-md overflow-hidden">
                              <img 
                                :src="`${$pb?.baseUrl}/api/files/products/${item.expand.product.id}/${item.expand.product.image}`" 
                                :alt="item.expand.product.name"
                                class="h-full w-full object-cover"
                              />
                            </div>
                            <div v-else class="flex-shrink-0 h-10 w-10 bg-background-100 rounded-md flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-background-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div class="ml-4">
                              <div class="text-sm font-medium text-gray-900">
                                {{ item.expand?.product?.name || 'Produit' }}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td class="px-4 py-3 whitespace-nowrap text-center">
                          <span class="px-2 py-1 text-xs bg-background-100 rounded-full">{{ item.quantity }}</span>
                        </td>
                        <td class="px-4 py-3 whitespace-nowrap text-right">
                          {{ formatCurrency(item.price) }}
                        </td>
                        <td class="px-4 py-3 whitespace-nowrap text-right font-medium">
                          {{ formatCurrency(item.price * item.quantity) }}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot class="bg-background-50">
                      <tr>
                        <td colspan="3" class="px-4 py-3 text-right text-sm font-medium">Total</td>
                        <td class="px-4 py-3 text-right font-bold">{{ calculateOrderTotal(selectedOrder) }}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              
              <!-- Shipping Address -->
              <div v-if="selectedOrder.expand?.shippingAddresses && selectedOrder.expand.shippingAddresses.length > 0" class="mb-6">
                <h4 class="font-medium mb-2">Adresse de livraison</h4>
                <div class="bg-background-50 p-4 rounded-lg">
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
                <div class="bg-background-50 p-4 rounded-lg">
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <div class="text-sm text-background-600">Méthode</div>
                      <div class="font-medium capitalize">
                        {{ selectedOrder.expand.payments[0].paymentMethod === 'credit_card' ? 'Carte bancaire' : 
                           selectedOrder.expand.payments[0].paymentMethod === 'paypal' ? 'PayPal' : 
                           selectedOrder.expand.payments[0].paymentMethod }}
                      </div>
                    </div>
                    <div>
                      <div class="text-sm text-background-600">Statut</div>
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
                      <div class="text-sm text-background-600">Date</div>
                      <div class="font-medium">{{ formatDate(selectedOrder.expand.payments[0].created) }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-background-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button @click="closeOrderDetails" class="btn-primary-sm ml-2">Fermer</button>
            <NuxtLink v-if="selectedOrder?.status === 'pending'" to="/checkout" class="btn-outline-sm">
              Finaliser le paiement
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Modal transition animations */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
</style>