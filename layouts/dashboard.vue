<!-- layouts/DashboardLayout.vue -->
<template>
  <div :class="{ 'dark': darkMode }" class="h-screen flex flex-col">
    <div class="flex h-full overflow-hidden bg-background-100 dark:bg-background-900 text-background-900 dark:text-background-100">
      <!-- Sidebar for desktop -->
      <aside
          :class="[
          'hidden md:flex flex-col',
          sidebarCollapsed ? 'w-20' : 'w-64',
          'bg-white dark:bg-background-800 border-r border-background-300 dark:border-background-700 transition-all duration-300 shadow-sm z-20'
        ]"
      >
        <!-- Logo -->
        <div class="p-4 flex items-center justify-between border-b border-background-300 dark:border-background-700">
          <h1 v-if="!sidebarCollapsed" class="text-xl font-bold text-primary-600 dark:text-primary-500">E-Shop Admin</h1>
          <button
              @click="toggleSidebar"
              class="p-2 rounded-lg text-background-700 dark:text-background-300 hover:bg-background-200 dark:hover:bg-background-700"
          >
            <ChevronRight v-if="sidebarCollapsed" size="20" />
            <ChevronDown v-else size="20" />
          </button>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 overflow-y-auto py-4">
          <ul class="space-y-1 px-2">
            <li v-for="item in menuItems" :key="item.id">
              <NuxtLink
                  :to="item.path"
                  :class="[
                  'flex items-center p-3 rounded-lg',
                  sidebarCollapsed ? 'justify-center' : 'justify-start',
                  $route.path.startsWith(item.path) ? 'bg-primary-500 text-white' : 'text-background-700 dark:text-background-300 hover:bg-background-200 dark:hover:bg-background-700'
                ]"
              >
                <span class="flex-shrink-0">
                  <component :is="item.icon" size="20" />
                </span>
                <span v-if="!sidebarCollapsed" class="ml-3">{{ item.label }}</span>
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- User profile -->
        <div class="border-t border-background-300 dark:border-background-700 p-4">
          <div :class="[sidebarCollapsed ? 'justify-center' : 'items-center', 'flex']">
            <div v-if="!sidebarCollapsed" class="flex-1">
              <h3 class="font-medium">{{ authStore.currentUser?.name || 'User' }}</h3>
              <p class="text-sm text-background-600 dark:text-background-400">{{ authStore.currentUser?.email }}</p>
            </div>
            <div :class="sidebarCollapsed ? 'w-full flex justify-center' : ''">
              <div v-if="userAvatarUrl" class="h-10 w-10 rounded-full bg-background-200 overflow-hidden">
                <img :src="userAvatarUrl" alt="User avatar" class="w-full h-full object-cover" />
              </div>
              <div v-else class="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center text-white">
                <User size="20" />
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main content -->
      <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
        <!-- Header -->
        <header class="bg-white dark:bg-background-800 border-b border-background-300 dark:border-background-700 py-2 px-4 flex items-center shadow-sm">
          <button
              @click="toggleMobileMenu"
              class="md:hidden p-2 rounded-lg text-background-700 dark:text-background-300 hover:bg-background-200 dark:hover:bg-background-700 mr-2"
          >
            <Menu size="20" />
          </button>
          <span class="md:hidden text-xl font-bold text-primary-600 dark:text-primary-500 flex-1">E-Shop Admin</span>

          <div class="flex items-center ml-auto space-x-3">
            <button class="relative p-2 rounded-lg text-background-700 dark:text-background-300 hover:bg-background-200 dark:hover:bg-background-700">
              <Bell size="20" />
              <span class="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary-500"></span>
            </button>

            <button
                @click="toggleDarkMode"
                class="p-2 rounded-lg text-background-700 dark:text-background-300 hover:bg-background-200 dark:hover:bg-background-700"
            >
              <Sun v-if="darkMode" size="20" />
              <Moon v-else size="20" />
            </button>

            <button class="p-2 rounded-lg text-background-700 dark:text-background-300 hover:bg-background-200 dark:hover:bg-background-700">
              <Settings size="20" />
            </button>

            <button
                @click="logout"
                class="p-2 rounded-lg text-background-700 dark:text-background-300 hover:bg-background-200 dark:hover:bg-background-700"
            >
              <LogOut size="20" />
            </button>
          </div>
        </header>

        <!-- Mobile menu -->
        <div
            v-if="mobileMenuOpen"
            class="md:hidden fixed inset-0 z-50 bg-background-900 bg-opacity-75"
        >
          <div class="fixed inset-y-0 left-0 w-64 bg-white dark:bg-background-800 shadow-xl">
            <div class="p-4 flex items-center justify-between border-b border-background-300 dark:border-background-700">
              <h1 class="text-xl font-bold text-primary-600 dark:text-primary-500">E-Shop Admin</h1>
              <button
                  @click="toggleMobileMenu"
                  class="p-2 rounded-lg text-background-700 dark:text-background-300 hover:bg-background-200 dark:hover:bg-background-700"
              >
                <X size="20" />
              </button>
            </div>

            <nav class="mt-4">
              <ul class="space-y-1 px-2">
                <li v-for="item in menuItems" :key="item.id">
                  <NuxtLink
                      :to="item.path"
                      :class="[
                      'flex items-center justify-start p-3 rounded-lg w-full',
                      $route.path.startsWith(item.path) ? 'bg-primary-500 text-white' : 'text-background-700 dark:text-background-300 hover:bg-background-200 dark:hover:bg-background-700'
                    ]"
                      @click="mobileMenuOpen = false"
                  >
                    <span class="flex-shrink-0">
                      <component :is="item.icon" size="20" />
                    </span>
                    <span class="ml-3">{{ item.label }}</span>
                  </NuxtLink>
                </li>
              </ul>
            </nav>

            <div class="absolute bottom-0 left-0 right-0 border-t border-background-300 dark:border-background-700 p-4">
              <div class="flex items-center">
                <div v-if="userAvatarUrl" class="h-10 w-10 rounded-full bg-background-200 overflow-hidden">
                  <img :src="userAvatarUrl" alt="User avatar" class="w-full h-full object-cover" />
                </div>
                <div v-else class="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center text-white">
                  <User size="20" />
                </div>
                <div class="ml-3">
                  <h3 class="font-medium">{{ authStore.currentUser?.name || 'User' }}</h3>
                  <p class="text-sm text-background-600 dark:text-background-400">{{ authStore.currentUser?.email }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Page content -->
        <main class="flex-1 overflow-auto p-6">
          <!-- Page content (slot) -->
          <slot></slot>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import {
  LayoutDashboard,
  Package,
  Tag,
  ShoppingCart,
  Users,
  ChevronDown,
  ChevronRight,
  Bell,
  Settings,
  User,
  LogOut,
  Moon,
  Sun,
  Menu,
  X
} from 'lucide-vue-next';
import { useRoute } from 'vue-router';
import { useAuthStore } from '~/stores/auth';
import { useNuxtApp } from 'nuxt/app';

const darkMode = ref(false);
const sidebarCollapsed = ref(false);
const mobileMenuOpen = ref(false);
const route = useRoute();
const authStore = useAuthStore();
const { $pb } = useNuxtApp();

// Get user avatar URL if available
const userAvatarUrl = computed(() => {
  if (authStore.currentUser?.avatar && $pb) {
    const avatarFile = authStore.currentUser.avatar;
    return $pb.files.getUrl(authStore.currentUser, avatarFile);
  }
  return null;
});

// Toggle dark mode and save preference
const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
  if (process.client) {
    localStorage.setItem('darkMode', darkMode.value ? 'true' : 'false');
  }
};

// Toggle sidebar collapse and save preference
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
  if (process.client) {
    localStorage.setItem('sidebarCollapsed', sidebarCollapsed.value ? 'true' : 'false');
  }
};

// Toggle mobile menu
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

// Logout function using auth store
const logout = () => {
  authStore.logout();
};

// Navigation menu items with paths
const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'products', label: 'Products', icon: Package, path: '/dashboard/products' },
  { id: 'categories', label: 'Categories', icon: Tag, path: '/dashboard/categories' },
  { id: 'tags', label: 'Tags', icon: Tag, path: '/dashboard/tags' },
  { id: 'orders', label: 'Orders', icon: ShoppingCart, path: '/dashboard/orders' },
  { id: 'users', label: 'Users', icon: Users, path: '/dashboard/users' },
];

// Get current page title and description based on route
const currentPageTitle = computed(() => {
  const currentRoute = route.path;
  const currentMenuItem = menuItems.find(item => currentRoute.startsWith(item.path));
  return currentMenuItem ? currentMenuItem.label : 'Dashboard';
});

const currentPageDescription = computed(() => {
  return `Welcome to your ${currentPageTitle.value.toLowerCase()} management`;
});

// Initialize preferences from localStorage on client side
onMounted(() => {
  if (process.client) {
    // Load dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      darkMode.value = savedDarkMode === 'true';
    }

    // Load sidebar collapsed preference
    const savedSidebarState = localStorage.getItem('sidebarCollapsed');
    if (savedSidebarState) {
      sidebarCollapsed.value = savedSidebarState === 'true';
    }
  }
});
</script>