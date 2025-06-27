<template>
  <div class="flex flex-col min-h-screen bg-background-50 dark:bg-background-950 text-background-900 dark:text-background-100 transition-colors duration-300">
    <!-- Enhanced Header with Logo -->
    <header class="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/95 dark:bg-background-900/95 border-b border-background-200/50 dark:border-background-800/50 shadow-sm">
      <div class="responsive-container py-3 md:py-4">
        <div class="flex items-center justify-between">
          <!-- Logo Section -->
          <NuxtLink to="/" class="flex items-center space-x-3 group transition-transform duration-200 hover:scale-105">
            <div class="relative">
              <img 
                src="/logo.png" 
                alt="Morggana Logo" 
                class="h-auto w-10 md:h-auto md:w-32 object-contain transition-transform duration-200 group-hover:rotate-3"
                loading="eager"
              />
              <div class="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-sm"></div>
            </div>
          </NuxtLink>

          <!-- Desktop Navigation -->
          <nav class="hidden lg:flex items-center space-x-1">
            <NuxtLink 
              to="/" 
              class="nav-link group relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              :class="$route.path === '/' ? 'nav-link-active' : ''"
            >
              <span class="relative z-10">Accueil</span>
              <div class="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </NuxtLink>
            <NuxtLink 
              to="/products" 
              class="nav-link group relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              :class="$route.path.startsWith('/products') ? 'nav-link-active' : ''"
            >
              <span class="relative z-10">Gommages</span>
              <div class="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </NuxtLink>
            <NuxtLink 
              to="/categories" 
              class="nav-link group relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              :class="$route.path.startsWith('/categories') ? 'nav-link-active' : ''"
            >
              <span class="relative z-10">Collections</span>
              <div class="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </NuxtLink>
            <NuxtLink 
              to="/about" 
              class="nav-link group relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              :class="$route.path.startsWith('/about') ? 'nav-link-active' : ''"
            >
              <span class="relative z-10">Notre Histoire</span>
              <div class="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </NuxtLink>
          </nav>

          <!-- Action Buttons -->
          <div class="flex items-center space-x-2">
            <!-- Search Button -->
            <button 
              @click="isSearchOpen = !isSearchOpen" 
              class="btn-icon group relative p-2.5 rounded-xl bg-background-100 dark:bg-background-800 text-background-700 dark:text-background-300 hover:bg-background-200 dark:hover:bg-background-700 transition-all duration-200 hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-200 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <div class="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>

            <!-- Cart Button -->
            <button 
              @click="cartStore.toggleCart" 
              class="btn-icon group relative p-2.5 rounded-xl bg-background-100 dark:bg-background-800 text-background-700 dark:text-background-300 hover:bg-background-200 dark:hover:bg-background-700 transition-all duration-200 hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-200 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span 
                v-if="cartStore.cartCount > 0" 
                class="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs font-bold animate-pulse"
              >
                {{ cartStore.cartCount }}
              </span>
              <div class="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>

            <!-- Theme Toggle -->
            <button 
              @click="toggleTheme" 
              class="btn-icon group relative p-2.5 rounded-xl bg-background-100 dark:bg-background-800 text-background-700 dark:text-background-300 hover:bg-background-200 dark:hover:bg-background-700 transition-all duration-200 hover:scale-105"
            >
              <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-200 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-200 group-hover:-rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <div class="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>

            <!-- User Menu -->
            <div v-if="authStore.isAuthenticated" class="relative user-menu">
              <button 
                @click="isUserMenuOpen = !isUserMenuOpen" 
                class="flex items-center focus:outline-none group transition-transform duration-200 hover:scale-105"
              >
                <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 text-primary-600 dark:text-primary-400 flex items-center justify-center ring-2 ring-transparent group-hover:ring-primary-200 dark:group-hover:ring-primary-800 transition-all duration-200">
                  <span v-if="!authStore.currentUser?.avatar" class="font-bold text-sm">{{ userInitials }}</span>
                  <img v-else :src="userAvatarUrl" :alt="`Avatar de ${authStore.currentUser?.name}`" class="w-full h-full rounded-xl object-cover" />
                </div>
              </button>

              <!-- User Dropdown -->
              <Transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div v-if="isUserMenuOpen" class="absolute right-0 mt-3 w-56 py-2 bg-white/95 dark:bg-background-800/95 backdrop-blur-lg rounded-2xl shadow-xl ring-1 ring-background-200/50 dark:ring-background-700/50 border border-white/20 dark:border-background-700/20">
                  <div class="px-4 py-3 border-b border-background-200/50 dark:border-background-700/50">
                    <p class="text-sm font-medium text-background-900 dark:text-background-100">{{ authStore.currentUser?.name || "Utilisateur" }}</p>
                    <p class="text-xs text-background-500 dark:text-background-400">{{ authStore.currentUser?.email }}</p>
                  </div>
                  <div class="py-1">
                    <NuxtLink to="/account" class="flex items-center px-4 py-2 text-sm text-background-700 dark:text-background-300 hover:bg-background-100/50 dark:hover:bg-background-700/50 transition-colors duration-150">
                      <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      Compte
                    </NuxtLink>
                    <NuxtLink to="/account/orders" class="flex items-center px-4 py-2 text-sm text-background-700 dark:text-background-300 hover:bg-background-100/50 dark:hover:bg-background-700/50 transition-colors duration-150">
                      <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                      </svg>
                      Commandes
                    </NuxtLink>
                    <NuxtLink to="/account/wishlist" class="flex items-center px-4 py-2 text-sm text-background-700 dark:text-background-300 hover:bg-background-100/50 dark:hover:bg-background-700/50 transition-colors duration-150">
                      <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                      </svg>
                      Liste de Souhaits
                    </NuxtLink>
                  </div>
                  <div class="border-t border-background-200/50 dark:border-background-700/50 pt-1">
                    <button @click="logout" class="flex items-center w-full px-4 py-2 text-sm text-error-600 hover:bg-error-50 dark:hover:bg-error-900/10 transition-colors duration-150">
                      <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                      </svg>
                      Déconnexion
                    </button>
                  </div>
                </div>
              </Transition>
            </div>

            <!-- Login Button for Non-authenticated Users -->
            <NuxtLink v-if="!authStore.isAuthenticated" to="/login" class="hidden md:inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
              </svg>
              Connexion
            </NuxtLink>

            <!-- Mobile Menu Button -->
            <button 
              @click="isMobileMenuOpen = !isMobileMenuOpen" 
              class="lg:hidden btn-icon group relative p-2.5 rounded-xl bg-background-100 dark:bg-background-800 text-background-700 dark:text-background-300 hover:bg-background-200 dark:hover:bg-background-700 transition-all duration-200 hover:scale-105"
            >
              <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-200 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-200 group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <div class="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>
          </div>
        </div>

        <!-- Enhanced Mobile Menu -->
        <Transition
          enter-active-class="transition ease-out duration-300"
          enter-from-class="transform opacity-0 -translate-y-2"
          enter-to-class="transform opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-200"
          leave-from-class="transform opacity-100 translate-y-0"
          leave-to-class="transform opacity-0 -translate-y-2"
        >
          <div v-if="isMobileMenuOpen" class="lg:hidden mt-4 p-4 bg-white/50 dark:bg-background-800/50 backdrop-blur-lg rounded-2xl border border-background-200/50 dark:border-background-700/50">
            <nav class="space-y-2">
              <NuxtLink 
                to="/" 
                class="flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-background-100/50 dark:hover:bg-background-700/50"
                :class="$route.path === '/' ? 'bg-gradient-to-r from-primary-500/10 to-secondary-500/10 text-primary-600 dark:text-primary-400' : 'text-background-700 dark:text-background-300'"
                @click="isMobileMenuOpen = false"
              >
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                Accueil
              </NuxtLink>
              <NuxtLink 
                to="/products" 
                class="flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-background-100/50 dark:hover:bg-background-700/50"
                :class="$route.path.startsWith('/products') ? 'bg-gradient-to-r from-primary-500/10 to-secondary-500/10 text-primary-600 dark:text-primary-400' : 'text-background-700 dark:text-background-300'"
                @click="isMobileMenuOpen = false"
              >
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2zM7 3v4l2-1 2 1V3"></path>
                </svg>
                Gommages
              </NuxtLink>
              <NuxtLink 
                to="/categories" 
                class="flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-background-100/50 dark:hover:bg-background-700/50"
                :class="$route.path.startsWith('/categories') ? 'bg-gradient-to-r from-primary-500/10 to-secondary-500/10 text-primary-600 dark:text-primary-400' : 'text-background-700 dark:text-background-300'"
                @click="isMobileMenuOpen = false"
              >
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                Collections
              </NuxtLink>
              <NuxtLink 
                to="/about" 
                class="flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-background-100/50 dark:hover:bg-background-700/50"
                :class="$route.path.startsWith('/about') ? 'bg-gradient-to-r from-primary-500/10 to-secondary-500/10 text-primary-600 dark:text-primary-400' : 'text-background-700 dark:text-background-300'"
                @click="isMobileMenuOpen = false"
              >
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Notre Histoire
              </NuxtLink>
            </nav>
            
            <!-- Mobile Auth Section -->
            <div v-if="!authStore.isAuthenticated" class="mt-4 pt-4 border-t border-background-200/50 dark:border-background-700/50">
              <NuxtLink 
                to="/login" 
                class="flex items-center justify-center w-full px-4 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-primary-500 to-secondary-500 text-white transition-all duration-200 hover:from-primary-600 hover:to-secondary-600"
                @click="isMobileMenuOpen = false"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                </svg>
                Connexion
              </NuxtLink>
            </div>
          </div>
        </Transition>
      </div>
    </header>

    <!-- Enhanced Search Overlay -->
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isSearchOpen" class="fixed inset-0 z-50 bg-background-900/80 dark:bg-background-950/90 backdrop-blur-lg" @click="isSearchOpen = false">
        <div class="flex items-start justify-center min-h-screen px-4 pt-16 pb-20 text-center">
          <Transition
            enter-active-class="transition ease-out duration-300"
            enter-from-class="opacity-0 scale-95 translate-y-4"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition ease-in duration-200"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-95 translate-y-4"
          >
            <div v-if="isSearchOpen" @click.stop class="w-full max-w-2xl">
              <div class="bg-white/95 dark:bg-background-800/95 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20 dark:border-background-700/20">
                <div class="relative">
                  <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-background-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  <input 
                    v-model="searchQuery"
                    type="text" 
                    placeholder="Rechercher gommages, soins du corps..." 
                    class="w-full pl-12 pr-4 py-4 text-lg bg-transparent border-0 border-b-2 border-background-200 dark:border-background-700 focus:border-primary-500 focus:outline-none transition-colors duration-200"
                    @keyup.enter="performSearch"
                    ref="searchInput"
                  >
                </div>
                <div class="mt-6 flex justify-center">
                  <button 
                    @click="performSearch"
                    class="px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-medium hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 hover:scale-105 shadow-lg"
                  >
                    Rechercher
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>

    <!-- Main Content with Enhanced Animations -->
    <main class="flex-1 transition-all duration-300">
      <slot />
    </main>

    <!-- Enhanced Footer -->
    <footer class="bg-gradient-to-br from-background-900 via-background-800 to-background-900 dark:from-background-950 dark:via-background-900 dark:to-background-950 text-white relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 25% 25%, #ffffff 2px, transparent 2px); background-size: 24px 24px;"></div>
      </div>
      
      <div class="relative">
        <!-- Main Footer Content -->
        <div class="responsive-container py-16">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <!-- Brand Section -->
            <div class="lg:col-span-2">
              <div class="flex items-center space-x-3 mb-6">
                <img 
                  src="/logo.png" 
                  alt="Logo" 
                  class="h-auto w-32 object-contain"
                  loading="lazy"
                />
              </div>
              <p class="text-background-300 mb-6 max-w-md leading-relaxed">
                Découvrez notre collection soigneusement sélectionnée de produits premium. 
                Nous nous engageons à offrir une expérience d'achat exceptionnelle avec 
                un service client de qualité.
              </p>
              <div class="flex space-x-4">                
                <a 
                  href="#" 
                  class="group p-3 rounded-xl bg-background-800/50 hover:bg-background-700/50 transition-all duration-200 hover:scale-110"
                >
                  <svg class="h-5 w-5 text-background-400 group-hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.219-5.175 1.219-5.175s-.311-.63-.311-1.562c0-1.463.849-2.554 1.905-2.554.899 0 1.332.675 1.332 1.483 0 .903-.576 2.255-.872 3.508-.248 1.05.526 1.906 1.562 1.906 1.875 0 3.317-1.977 3.317-4.832 0-2.526-1.817-4.287-4.415-4.287-3.009 0-4.775 2.256-4.775 4.58 0 .908.349 1.881.786 2.409.086.105.099.197.073.304-.08.331-.256 1.073-.292 1.224-.047.196-.153.238-.354.144-1.332-.620-2.165-2.567-2.165-4.128 0-3.349 2.431-6.424 7.009-6.424 3.678 0 6.536 2.62 6.536 6.121 0 3.651-2.302 6.588-5.503 6.588-1.074 0-2.088-.559-2.432-1.226 0 0-.533 2.031-.662 2.531-.239.928-.888 2.093-1.321 2.803.994.307 2.058.471 3.176.471 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  class="group p-3 rounded-xl bg-background-800/50 hover:bg-background-700/50 transition-all duration-200 hover:scale-110"
                >
                  <Instagram class="h-5 w-5 text-background-400 group-hover:text-white transition-colors duration-200" />
                </a>
              </div>
            </div>

            <!-- Quick Links -->
            <div>
              <h4 class="text-lg font-semibold mb-6 text-white">Boutique</h4>
              <ul class="space-y-3">
                <li><NuxtLink to="/products" class="text-background-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block">Tous les Produits</NuxtLink></li>
                <li><NuxtLink to="/categories" class="text-background-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block">Catégories</NuxtLink></li>
                <!--li><NuxtLink to="/deals" class="text-background-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block">Promotions</NuxtLink></li>
                <li><NuxtLink to="/new-arrivals" class="text-background-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block">Nouveautés</NuxtLink></li>
                <li><NuxtLink to="/bestsellers" class="text-background-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block">Meilleures Ventes</NuxtLink></li-->
              </ul>
            </div>

            <!-- Support -->
            <div>
              <h4 class="text-lg font-semibold mb-6 text-white">Support</h4>
              <ul class="space-y-3">
                <li><NuxtLink to="/contact" class="text-background-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block">Contact</NuxtLink></li>
                <!--li><NuxtLink to="/help" class="text-background-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block">Centre d'Aide</NuxtLink></li>
                <li><NuxtLink to="/shipping" class="text-background-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block">Livraison</NuxtLink></li>
                <li><NuxtLink to="/returns" class="text-background-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block">Retours</NuxtLink></li-->
              </ul>
            </div>
          </div>
        </div>

        <!-- Newsletter Section -->
        <div class="border-t border-background-700/50">
          <div class="responsive-container py-12">
            <div class="max-w-4xl mx-auto text-center">
              <h3 class="text-2xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                Restez Connecté
              </h3>
              <p class="text-background-300 mb-8 max-w-2xl mx-auto">
                Abonnez-vous à notre newsletter pour recevoir les dernières nouveautés, 
                offres exclusives et conseils styling directement dans votre boîte mail.
              </p>
              <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Votre adresse email"
                  class="flex-1 px-4 py-3 rounded-xl bg-background-800/50 border border-background-700/50 text-white placeholder-background-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                />
                <button class="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-medium hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 hover:scale-105 shadow-lg">
                  S'abonner
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Footer -->
        <div class="border-t border-background-700/50">
          <div class="responsive-container py-8">
            <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div class="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
                <p class="text-background-400 text-sm">
                  © 2025 Morrgana. Tous droits réservés.
                </p>
                <div class="flex space-x-6">
                  <NuxtLink to="/privacy" class="text-background-400 hover:text-white text-sm transition-colors duration-200">
                    Confidentialité
                  </NuxtLink>
                  <NuxtLink to="/terms" class="text-background-400 hover:text-white text-sm transition-colors duration-200">
                    Conditions
                  </NuxtLink>
                  <NuxtLink to="/cookies" class="text-background-400 hover:text-white text-sm transition-colors duration-200">
                    Cookies
                  </NuxtLink>
                </div>
              </div>
              
              <!-- Payment Methods -->
              <div class="flex items-center space-x-4">
                <span class="text-background-400 text-sm">Paiements sécurisés:</span>
                <div class="flex space-x-2">
                  <div class="w-8 h-5 bg-background-700 rounded flex items-center justify-center">
                    <span class="text-xs font-bold text-white">V</span>
                  </div>
                  <div class="w-8 h-5 bg-background-700 rounded flex items-center justify-center">
                    <span class="text-xs font-bold text-white">M</span>
                  </div>
                  <div class="w-8 h-5 bg-background-700 rounded flex items-center justify-center">
                    <span class="text-xs font-bold text-white">P</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <!-- Cart Sidebar (keep existing implementation) -->
    <CartSidebar v-if="cartStore" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { useCartStore } from '~/stores/cart'
import CartSidebar from '~/components/CartSidebar.vue'
import { Instagram } from 'lucide-vue-next'

// State
const isSearchOpen = ref(false)
const isMobileMenuOpen = ref(false)
const isUserMenuOpen = ref(false)
const isDarkMode = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)

// Stores
const authStore = useAuthStore()
const cartStore = useCartStore()
const route = useRoute()

// Computed
const userInitials = computed(() => {
  if (!authStore.currentUser?.name) return '?'
  return authStore.currentUser.name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const userAvatarUrl = computed(() => {
  if (authStore.currentUser?.avatar) {
    const { $pb } = useNuxtApp()
    return $pb.files.getUrl(authStore.currentUser, authStore.currentUser.avatar)
  }
  return null
})

// Methods
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  if (process.client) {
    document.documentElement.classList.toggle('dark', isDarkMode.value)
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
  }
}

const performSearch = () => {
  if (searchQuery.value.trim()) {
    navigateTo(`/products?search=${encodeURIComponent(searchQuery.value.trim())}`)
    isSearchOpen.value = false
    searchQuery.value = ''
  }
}

const logout = async () => {
  try {
    await authStore.logout()
    isUserMenuOpen.value = false
    await navigateTo('/')
  } catch (error) {
    console.error('Logout error:', error)
  }
}

// Lifecycle
onMounted(() => {
  // Initialize theme
  if (process.client) {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    isDarkMode.value = savedTheme === 'dark' || (!savedTheme && prefersDark)
    document.documentElement.classList.toggle('dark', isDarkMode.value)
  }

  // Focus search input when opened
  watch(isSearchOpen, (newValue) => {
    if (newValue) {
      nextTick(() => {
        searchInput.value?.focus()
      })
    }
  })

  // Close dropdowns when clicking outside
  if (process.client) {
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.user-menu')) {
        isUserMenuOpen.value = false
      }
    })
  }
})

// Close mobile menu on route change
watch(() => route.path, () => {
  isMobileMenuOpen.value = false
})
</script>

<style scoped>
.nav-link {
  @apply text-background-700 dark:text-background-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200;
}

.nav-link-active {
  @apply text-primary-600 dark:text-primary-400 font-medium bg-gradient-to-r from-primary-500/10 to-secondary-500/10 backdrop-blur-sm;
}

.responsive-container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

/* Enhanced animations */
.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Smooth transitions for all interactive elements */
button, a, .nav-link {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Enhanced hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:rotate-3 {
  transform: rotate(3deg);
}

.group:hover .group-hover\:rotate-12 {
  transform: rotate(12deg);
}

.group:hover .group-hover\:-rotate-12 {
  transform: rotate(-12deg);
}

.group:hover .group-hover\:rotate-90 {
  transform: rotate(90deg);
}
</style>