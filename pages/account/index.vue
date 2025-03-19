<template>
  <main class="responsive-container section-padding">
    <div v-if="isLoading" class="flex justify-center items-center py-16">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>

    <div v-else>
      <h1 class="heading-2 mb-8">My Profile</h1>

      <!-- Profile Navigation -->
      <div class="mb-8 border-b border-background-300 dark:border-background-700">
        <div class="flex flex-wrap">
          <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
              'px-4 py-3 font-medium transition-colors duration-200 border-b-2 -mb-px',
              activeTab === tab.id
                ? 'text-primary-600 border-primary-500'
                : 'text-background-600 dark:text-background-400 border-transparent hover:text-background-900 dark:hover:text-white'
            ]"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- Profile Information -->
      <div v-if="activeTab === 'profile'" class="grid md:grid-cols-[300px_1fr] gap-8">
        <!-- Avatar Section -->
        <div class="card flex flex-col items-center">
          <div class="relative w-48 h-48 mb-4">
            <img
                v-if="avatarUrl"
                :src="avatarUrl"
                alt="Profile avatar"
                class="w-full h-full object-cover rounded-full"
            />
            <div v-else class="w-full h-full bg-background-300 dark:bg-background-700 rounded-full flex items-center justify-center">
              <span class="text-5xl font-bold text-background-500">{{ userInitials }}</span>
            </div>

            <!-- Avatar Upload Overlay -->
            <div
                @click="$refs.avatarInput.click()"
                class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer"
            >
              <span class="text-white opacity-0 hover:opacity-100 font-medium">Change Photo</span>
            </div>
            <input ref="avatarInput" type="file" class="hidden" accept="image/*" @change="handleAvatarUpload" />
          </div>

          <h2 class="text-xl font-bold">{{ user.name || 'No name set' }}</h2>
          <p class="text-background-600 dark:text-background-400">{{ user.email }}</p>

          <button
              v-if="isEditing"
              @click="handleLogout"
              class="btn-ghost mt-6 text-error-500"
          >
            Logout
          </button>
        </div>

        <!-- Profile Form -->
        <div class="card">
          <h2 class="text-xl font-bold mb-6">Personal Information</h2>

          <form @submit.prevent="updateProfile">
            <div class="mb-4">
              <label class="input-label">Name</label>
              <input
                  v-model="formData.name"
                  type="text"
                  class="input-primary"
                  :disabled="!isEditing"
                  placeholder="Enter your name"
              />
            </div>

            <div class="mb-4">
              <label class="input-label">Email</label>
              <input
                  v-model="user.email"
                  type="email"
                  class="input-primary"
                  disabled
                  placeholder="Email address"
              />
              <p class="input-help">Email cannot be changed</p>
            </div>

            <div class="flex justify-end mt-6">
              <button
                  v-if="!isEditing"
                  @click.prevent="isEditing = true"
                  type="button"
                  class="btn-primary"
              >
                Edit Profile
              </button>

              <div v-else class="flex space-x-3">
                <button
                    @click.prevent="cancelEdit"
                    type="button"
                    class="btn-secondary"
                >
                  Cancel
                </button>
                <button
                    type="submit"
                    class="btn-primary"
                    :disabled="isSubmitting"
                >
                  {{ isSubmitting ? 'Saving...' : 'Save Changes' }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <!-- Password Change -->
      <div v-if="activeTab === 'password'" class="max-w-xl mx-auto">
        <div class="card">
          <h2 class="text-xl font-bold mb-6">Change Password</h2>

          <form @submit.prevent="updatePassword">
            <div class="mb-4">
              <label class="input-label">Current Password</label>
              <input
                  v-model="passwordData.currentPassword"
                  type="password"
                  class="input-primary"
                  placeholder="Enter your current password"
                  required
              />
            </div>

            <div class="mb-4">
              <label class="input-label">New Password</label>
              <input
                  v-model="passwordData.newPassword"
                  type="password"
                  class="input-primary"
                  placeholder="Enter new password"
                  required
                  minlength="8"
              />
              <p class="input-help">Password must be at least 8 characters</p>
            </div>

            <div class="mb-4">
              <label class="input-label">Confirm New Password</label>
              <input
                  v-model="passwordData.confirmPassword"
                  type="password"
                  class="input-primary"
                  placeholder="Confirm new password"
                  required
              />
              <p v-if="passwordMismatch" class="input-error-text">Passwords do not match</p>
            </div>

            <div class="flex justify-end mt-6">
              <button
                  type="submit"
                  class="btn-primary"
                  :disabled="isSubmitting || passwordMismatch || !passwordData.newPassword"
              >
                {{ isSubmitting ? 'Updating...' : 'Update Password' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Order History -->
      <div v-if="activeTab === 'orders'" class="space-y-6">
        <div v-if="orders.length === 0" class="card text-center py-12">
          <h3 class="text-xl font-medium mb-2">No Orders Yet</h3>
          <p class="text-background-600 dark:text-background-400">You haven't placed any orders yet.</p>
          <nuxt-link to="/products" class="btn-primary mt-6 inline-flex">Start Shopping</nuxt-link>
        </div>

        <div v-else>
          <div v-for="order in orders" :key="order.id" class="card mb-6">
            <div class="flex justify-between items-center border-b border-background-300 dark:border-background-700 pb-4 mb-4">
              <div>
                <h3 class="font-bold">Order #{{ order.id.substring(0, 8) }}</h3>
                <p class="text-sm text-background-600 dark:text-background-400">
                  {{ new Date(order.created).toLocaleDateString() }}
                </p>
              </div>
              <div>
                <span class="badge" :class="{
                  'badge-primary': order.status === 'delivered',
                  'badge-success': order.status === 'shipped',
                  'badge-error': order.status === 'cancelled',
                  'badge-secondary': order.status === 'pending' || order.status === 'paid'
                }">
                  {{ order.status.charAt(0).toUpperCase() + order.status.slice(1) }}
                </span>
              </div>
            </div>

            <div v-if="order.items && order.items.length" class="space-y-4">
              <div v-for="item in order.items" :key="item.id" class="flex items-center py-2">
                <div class="w-16 h-16 bg-background-200 dark:bg-background-800 rounded overflow-hidden mr-4">
                  <img
                      v-if="item.product && item.product.image"
                      :src="getImageUrl(item.product.image)"
                      alt="Product"
                      class="w-full h-full object-cover"
                  />
                </div>

                <div class="flex-1">
                  <h4 class="font-medium">{{ item.product?.name || 'Product' }}</h4>
                  <p class="text-sm text-background-600 dark:text-background-400">
                    Qty: {{ item.quantity }} × ${{ item.price.toFixed(2) }}
                  </p>
                </div>

                <div class="text-right">
                  <p class="font-medium">${{ (item.quantity * item.price).toFixed(2) }}</p>
                </div>
              </div>
            </div>

            <div class="border-t border-background-300 dark:border-background-700 mt-4 pt-4">
              <div class="flex justify-between font-bold">
                <span>Total</span>
                <span>${{ order.totalPrice.toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast notifications -->
    <div class="fixed bottom-4 right-4 z-50">
      <div
          v-if="toast.show"
          class="p-4 rounded-lg shadow-lg max-w-sm transform transition-all"
          :class="{
          'bg-success-500 text-white': toast.type === 'success',
          'bg-error-500 text-white': toast.type === 'error'
        }"
      >
        <div class="flex items-center">
          <span class="font-medium">{{ toast.message }}</span>
          <button @click="toast.show = false" class="ml-auto">
            <span class="text-xl">&times;</span>
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, reactive, onMounted, watch } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'

// Route middleware to ensure authentication
definePageMeta({
  middleware: 'auth'
})

const { $pb } = useNuxtApp()
const authStore = useAuthStore()
const router = useRouter()

// State
const isLoading = ref(true)
const isSubmitting = ref(false)
const isEditing = ref(false)
const user = ref({})
const formData = reactive({
  name: ''
})
const passwordData = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const orders = ref([])
const toast = reactive({
  show: false,
  message: '',
  type: 'success',
  timeout: null
})

// Tabs
const activeTab = ref('profile')
const tabs = [
  { id: 'profile', label: 'Profile' },
  { id: 'password', label: 'Password' },
  { id: 'orders', label: 'Orders' }
]

// Computed properties
const avatarUrl = computed(() => {
  if (user.value && user.value.avatar) {
    return `${$pb.baseUrl}/api/files/${user.value.collectionId}/${user.value.id}/${user.value.avatar}`
  }
  return null
})

const userInitials = computed(() => {
  if (!user.value.name) return '?'
  return user.value.name.split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2)
})

const passwordMismatch = computed(() => {
  return passwordData.newPassword &&
      passwordData.confirmPassword &&
      passwordData.newPassword !== passwordData.confirmPassword
})

// Lifecycle
onMounted(async () => {
  try {
    // Redirect if not authenticated
    if (!authStore.isAuthenticated) {
      return router.push('/login')
    }

    // Fetch user data
    await fetchUserData()

    // Fetch orders
    await fetchOrders()

    isLoading.value = false
  } catch (error) {
    showToast('Error loading profile data', 'error')
    console.error('Error loading profile:', error)
    isLoading.value = false
  }
})

// Watch for auth state changes
watch(() => authStore.isAuthenticated, (isAuth) => {
  if (!isAuth) {
    router.push('/login')
  }
})

// Methods
async function fetchUserData() {
  try {
    // Check if we need to refresh user data
    if (!$pb.authStore.isValid) {
      return router.push('/login')
    }

    user.value = $pb.authStore.model

    // Set form data
    formData.name = user.value.name || ''
  } catch (error) {
    console.error('Error fetching user data:', error)
    throw error
  }
}

async function fetchOrders() {
  try {
    // Fetch user orders with items
    const ordersList = await $pb.collection('orders').getList(1, 50, {
      filter: `user="${user.value.id}"`,
      sort: '-created',
      expand: 'user'
    })

    // We need to fetch order items for each order
    const ordersWithItems = await Promise.all(
        ordersList.items.map(async (order) => {
          const items = await $pb.collection('orderItems').getList(1, 100, {
            filter: `order="${order.id}"`,
            expand: 'product'
          })

          return {
            ...order,
            items: items.items
          }
        })
    )

    orders.value = ordersWithItems
  } catch (error) {
    console.error('Error fetching orders:', error)
    showToast('Failed to load order history', 'error')
  }
}

async function updateProfile() {
  if (!isEditing.value) return

  isSubmitting.value = true

  try {
    const data = {
      name: formData.name
    }

    const updatedUser = await $pb.collection('users').update(user.value.id, data)

    // Update local state
    user.value = updatedUser

    // Update auth store
    authStore.setUser(updatedUser)

    isEditing.value = false
    showToast('Profile updated successfully', 'success')
  } catch (error) {
    console.error('Error updating profile:', error)
    showToast('Failed to update profile', 'error')
  } finally {
    isSubmitting.value = false
  }
}

async function updatePassword() {
  if (passwordMismatch.value) return

  isSubmitting.value = true

  try {
    // Verify current password by trying to authenticate
    await $pb.collection('users').authWithPassword(
        user.value.email,
        passwordData.currentPassword
    )

    // Update password
    await $pb.collection('users').update(user.value.id, {
      password: passwordData.newPassword,
      passwordConfirm: passwordData.confirmPassword
    })

    // Reset form
    passwordData.currentPassword = ''
    passwordData.newPassword = ''
    passwordData.confirmPassword = ''

    showToast('Password updated successfully', 'success')
  } catch (error) {
    console.error('Error updating password:', error)

    if (error.status === 400) {
      showToast('Current password is incorrect', 'error')
    } else {
      showToast('Failed to update password', 'error')
    }
  } finally {
    isSubmitting.value = false
  }
}

async function handleAvatarUpload(event) {
  const file = event.target.files[0]
  if (!file) return

  // Validate file
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  if (!validTypes.includes(file.type)) {
    showToast('Please upload a valid image (JPEG, PNG, GIF, or WebP)', 'error')
    return
  }

  isSubmitting.value = true

  try {
    const formData = new FormData()
    formData.append('avatar', file)

    const updatedUser = await $pb.collection('users').update(user.value.id, formData)

    // Update local state
    user.value = updatedUser

    // Update auth store
    authStore.setUser(updatedUser)

    showToast('Profile picture updated', 'success')
  } catch (error) {
    console.error('Error uploading avatar:', error)
    showToast('Failed to upload profile picture', 'error')
  } finally {
    isSubmitting.value = false
    // Reset file input
    event.target.value = null
  }
}

function cancelEdit() {
  isEditing.value = false
  // Reset form data to current user data
  formData.name = user.value.name || ''
}

async function handleLogout() {
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('Error during logout:', error)
  }
}

function getImageUrl(image) {
  if (!image) return ''
  return `${$pb.baseUrl}/api/files/products/${image.recordId}/${image.name}`
}

function showToast(message, type = 'success') {
  // Clear any existing timeout
  if (toast.timeout) {
    clearTimeout(toast.timeout)
  }

  // Show new toast
  toast.message = message
  toast.type = type
  toast.show = true

  // Auto-hide after 5 seconds
  toast.timeout = setTimeout(() => {
    toast.show = false
  }, 5000)
}
</script>
