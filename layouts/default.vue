<template>
  <div class="flex flex-col min-h-screen bg-background-100 dark:bg-background-900 text-background-900 dark:text-background-100">
    <header class="sticky top-0 z-50 w-full backdrop-blur-md bg-white/90 dark:bg-background-900/90 border-b border-background-200 dark:border-background-800 transition-all duration-200">
      <div class="responsive-container py-4 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center space-x-2">
          <span class="text-primary-500 text-2xl font-bold">Shop</span>
          <span class="text-secondary-500 font-bold">Vibes</span>
        </NuxtLink>

        <nav class="hidden md:flex items-center space-x-1">
          <NuxtLink to="/" class="nav-link" active-class="nav-link-active">Accueil</NuxtLink>
          <NuxtLink to="/products" class="nav-link" active-class="nav-link-active">Produits</NuxtLink>
          <NuxtLink to="/categories" class="nav-link" active-class="nav-link-active">Catégories</NuxtLink>
          <NuxtLink v-if="authStore.isAdmin" to="/dashboard" class="nav-link" active-class="nav-link-active">Tableau de Bord</NuxtLink>
        </nav>

        <div class="flex items-center space-x-2">
          <button @click="isSearchOpen = !isSearchOpen" class="btn-icon p-2 rounded-full bg-background-200 dark:bg-background-800 text-background-700 dark:text-background-300 hover:bg-background-300 dark:hover:bg-background-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <button @click="cartStore.toggleCart" class="btn-icon p-2 rounded-full bg-background-200 dark:bg-background-800 text-background-700 dark:text-background-300 hover:bg-background-300 dark:hover:bg-background-700 transition-colors relative">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span v-if="cartStore.cartCount > 0" class="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 rounded-full bg-primary-500 text-white text-xs font-bold">{{ cartStore.cartCount }}</span>
          </button>

          <button @click="toggleTheme" class="btn-icon p-2 rounded-full bg-background-200 dark:bg-background-800 text-background-700 dark:text-background-300 hover:bg-background-300 dark:hover:bg-background-700 transition-colors">
            <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>

          <div v-if="authStore.isAuthenticated" class="relative user-menu">
            <button @click="isUserMenuOpen = !isUserMenuOpen" class="flex items-center focus:outline-none">
              <div class="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-500 dark:text-primary-400 flex items-center justify-center">
                <span v-if="!authStore.currentUser?.avatar" class="font-bold text-sm">{{ userInitials }}</span>
                <img v-else :src="userAvatarUrl" :alt="`Avatar de ${authStore.currentUser?.name}`" class="w-full h-full rounded-full object-cover" />
              </div>
            </button>

            <div v-if="isUserMenuOpen" class="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-background-800 rounded-lg shadow-lg ring-1 ring-background-200 dark:ring-background-700 transition-all duration-200">
              <div class="px-4 py-2 border-b border-background-200 dark:border-background-700">
                <p class="text-sm font-medium">{{ authStore.currentUser?.name || "Utilisateur" }}</p>
                <p class="text-xs text-background-500">{{ authStore.currentUser?.email }}</p>
              </div>
              <NuxtLink to="/account" class="block px-4 py-2 text-sm hover:bg-background-100 dark:hover:bg-background-700">Compte</NuxtLink>
              <NuxtLink to="/account/orders" class="block px-4 py-2 text-sm hover:bg-background-100 dark:hover:bg-background-700">Commandes</NuxtLink>
              <NuxtLink to="/account/wishlist" class="block px-4 py-2 text-sm hover:bg-background-100 dark:hover:bg-background-700">Liste de Souhaits</NuxtLink>
              <button @click="logout" class="w-full text-left px-4 py-2 text-sm text-error-600 hover:bg-background-100 dark:hover:bg-background-700">Déconnexion</button>
            </div>
          </div>

          <NuxtLink v-if="!authStore.isAuthenticated" to="/login" class="hidden md:flex btn-primary btn-sm">
            Connexion </NuxtLink>

          <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="md:hidden btn-icon p-2 rounded-full bg-background-200 dark:bg-background-800 text-background-700 dark:text-background-300 hover:bg-background-300 dark:hover:bg-background-700 transition-colors">
            <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div v-if="isMobileMenuOpen" class="md:hidden">
        <div class="responsive-container py-4 space-y-2 border-t border-background-200 dark:border-background-800">
          <NuxtLink to="/" class="block px-4 py-2 rounded-lg hover:bg-background-200 dark:hover:bg-background-800" active-class="bg-background-200 dark:bg-background-800 font-medium" @click="isMobileMenuOpen = false">Accueil</NuxtLink>
          <NuxtLink to="/products" class="block px-4 py-2 rounded-lg hover:bg-background-200 dark:hover:bg-background-800" active-class="bg-background-200 dark:bg-background-800 font-medium" @click="isMobileMenuOpen = false">Produits</NuxtLink>
          <NuxtLink to="/categories" class="block px-4 py-2 rounded-lg hover:bg-background-200 dark:hover:bg-background-800" active-class="bg-background-200 dark:bg-background-800 font-medium" @click="isMobileMenuOpen = false">Catégories</NuxtLink>
          <NuxtLink v-if="authStore.isAuthenticated" to="/account" class="block px-4 py-2 rounded-lg hover:bg-background-200 dark:hover:bg-background-800" active-class="bg-background-200 dark:bg-background-800 font-medium" @click="isMobileMenuOpen = false">Compte</NuxtLink>
          <NuxtLink v-if="authStore.isAdmin" to="/dashboard" class="block px-4 py-2 rounded-lg hover:bg-background-200 dark:hover:bg-background-800" active-class="bg-background-200 dark:bg-background-800 font-medium" @click="isMobileMenuOpen = false">Tableau de Bord</NuxtLink>
          <NuxtLink v-if="!authStore.isAuthenticated" to="/login" class="block px-4 py-2 rounded-lg hover:bg-background-200 dark:hover:bg-background-800" active-class="bg-background-200 dark:bg-background-800 font-medium" @click="isMobileMenuOpen = false">Connexion</NuxtLink>
        </div>
      </div>

      <div v-if="isSearchOpen" class="absolute inset-x-0 top-full p-4 bg-white dark:bg-background-800 shadow-md border-t border-background-200 dark:border-background-700">
        <div class="responsive-container">
          <div class="relative">
            <input type="text" placeholder="Rechercher des produits..." class="input-primary pr-10" v-model="searchQuery" @keyup.enter="performSearch">
            <button @click="performSearch" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-background-500 hover:text-primary-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          <div class="flex flex-wrap gap-2 mt-2">
            <span class="text-sm text-background-500">Populaires :</span>
            <button v-for="term in popularSearches" :key="term" @click="searchQuery = term; performSearch()" class="text-sm px-2 py-1 rounded-full bg-background-200 dark:bg-background-700 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors">{{ term }}</button>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-grow">
      <slot />
    </main>

    <footer class="bg-background-200 dark:bg-background-800 border-t border-background-300 dark:border-background-700">
      <div class="responsive-container py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 class="text-lg font-bold mb-4">Shop Vibes</h3>
            <p class="text-background-600 dark:text-background-400 mb-4">Votre boutique unique pour les dernières tendances et essentiels.</p>
            <div class="flex space-x-3">
              <a href="#" class="text-background-600 dark:text-background-400 hover:text-primary-500 dark:hover:text-primary-400">
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
              </a>
              <a href="#" class="text-background-600 dark:text-background-400 hover:text-primary-500 dark:hover:text-primary-400">
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="#" class="text-background-600 dark:text-background-400 hover:text-primary-500 dark:hover:text-primary-400">
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-bold mb-4">Boutique</h3>
            <ul class="space-y-2">
              <li><NuxtLink to="/products" class="text-background-600 dark:text-background-400 hover:text-primary-500 dark:hover:text-primary-400">Tous les Produits</NuxtLink></li>
              <li><NuxtLink to="/categories" class="text-background-600 dark:text-background-400 hover:text-primary-500 dark:hover:text-primary-400">Catégories</NuxtLink></li>
              <li><NuxtLink to="/deals" class="text-background-600 dark:text-background-400 hover:text-primary-500 dark:hover:text-primary-400">Promotions</NuxtLink></li>
              <li><NuxtLink to="/new-arrivals" class="text-background-600 dark:text-background-400 hover:text-primary-500 dark:hover:text-primary-400">Nouveautés</NuxtLink></li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-bold mb-4">Compte</h3>
            <ul class="space-y-2">
              <li><NuxtLink to="/login" class="text-background-600 dark:text-background-400 hover:text-primary-500 dark:hover:text-primary-400">Connexion</NuxtLink></li>
              <li><NuxtLink to="/register" class="text-background-600 dark:text-background-400 hover:text-primary-500 dark:hover:text-primary-400">S'inscrire</NuxtLink></li>
              <li><NuxtLink to="/account/orders" class="text-background-600 dark:text-background-400 hover:text-primary-500 dark:hover:text-primary-400">Commandes</NuxtLink></li>
              <li><NuxtLink to="/account/wishlist" class="text-background-600 dark:text-background-400 hover:text-primary-500 dark:hover:text-primary-400">Liste de Souhaits</NuxtLink></li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-bold mb-4">Info</h3>
            <ul class="space-y-2">
              <li><NuxtLink to="/about" class="text-background-600 dark:text-background-400 hover:text-primary-500 dark:hover:text-primary-400">À Propos</NuxtLink></li>
              <li><NuxtLink to="/contact" class="text-background-600 dark:text-background-400 hover:text-primary-500 dark:hover:text-primary-400">Contact</NuxtLink></li>
              <li><NuxtLink to="/faq" class="text-background-600 dark:text-background-400 hover:text-primary-500 dark:hover:text-primary-400">FAQ</NuxtLink></li>
              <li><NuxtLink to="/privacy-policy" class="text-background-600 dark:text-background-400 hover:text-primary-500 dark:hover:text-primary-400">Politique de Confidentialité</NuxtLink></li>
            </ul>
          </div>
        </div>

        <div class="mt-12 pt-8 border-t border-background-300 dark:border-background-700 flex flex-col md:flex-row justify-between items-center">
          <p class="text-sm text-background-600 dark:text-background-400">&copy; {{ new Date().getFullYear() }} Shop Vibes. Tous droits réservés.</p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <NuxtLink to="/terms" class="text-sm text-background-600 dark:text-background-400 hover:text-primary-500 dark:hover:text-primary-400">Conditions</NuxtLink>
            <NuxtLink to="/privacy" class="text-sm text-background-600 dark:text-background-400 hover:text-primary-500 dark:hover:text-primary-400">Confidentialité</NuxtLink>
            <NuxtLink to="/cookies" class="text-sm text-background-600 dark:text-background-400 hover:text-primary-500 dark:hover:text-primary-400">Cookies</NuxtLink>
          </div>
        </div>
      </div>
    </footer>

    <div v-if="cartStore.isCartOpen" class="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute inset-0 bg-background-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="cartStore.isCartOpen = false"></div>
        <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div class="w-screen max-w-md transform transition ease-in-out duration-300">
            <div class="h-full flex flex-col bg-white dark:bg-background-900 shadow-xl">
              <div class="flex-1 h-0 overflow-y-auto">
                <div class="flex items-center justify-between px-4 py-6 sm:px-6 border-b border-background-200 dark:border-background-800">
                  <h2 class="text-lg font-medium text-background-900 dark:text-white" id="slide-over-title">Panier d'Achat</h2>
                  <button @click="cartStore.isCartOpen = false" class="text-background-500 hover:text-background-800 dark:hover:text-background-200">
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div v-if="cartStore.hasItems" class="divide-y divide-background-200 dark:divide-background-800">
                  <div v-for="item in cartStore.items" :key="item.id" class="py-6 px-4 sm:px-6 flex">
                    <div class="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                      <img v-if="item.image" :src="getCartImageUrl(item)" :alt="item.name" class="w-full h-full object-center object-cover">
                      <div v-else class="flex items-center justify-center w-full h-full bg-background-100 dark:bg-background-800 text-background-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div class="ml-4 flex-1 flex flex-col">
                      <div class="flex justify-between">
                        <h3>
                          <a href="#" class="font-medium text-background-900 dark:text-white hover:text-primary-500">{{ item.name }}</a>
                        </h3>
                        <p class="ml-4 text-background-900 dark:text-white">{{ (item.price * item.quantity).toFixed(2) }} €</p>
                      </div>
                      <p class="mt-1 text-sm text-background-500 dark:text-background-400">{{ item.price.toFixed(2) }} € l'unité</p>
                      <div class="flex-1 flex items-end justify-between">
                        <div class="flex items-center border border-background-300 dark:border-background-700 rounded-md">
                          <button @click="cartStore.decrementItem(item.id)" class="py-1 px-2 text-background-600 dark:text-background-400 hover:text-primary-500 dark:hover:text-primary-400">-</button>
                          <span class="py-1 px-2 text-background-900 dark:text-white">{{ item.quantity }}</span>
                          <button @click="cartStore.incrementItem(item.id)" class="py-1 px-2 text-background-600 dark:text-background-400 hover:text-primary-500 dark:hover:text-primary-400">+</button>
                        </div>
                        <button @click="cartStore.removeItem(item.id)" class="text-error-500 hover:text-error-600 text-sm font-medium">Retirer</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-else class="flex flex-col items-center justify-center h-64 px-4 sm:px-6">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-background-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p class="text-background-500 dark:text-background-400 text-center">Votre panier est vide</p>
                  <button @click="navigateToProducts" class="mt-4 btn-primary">Acheter Maintenant</button> </div>
              </div>

              <div v-if="cartStore.hasItems" class="border-t border-background-200 dark:border-background-800 py-6 px-4 sm:px-6">
                <div class="flex justify-between text-base font-medium text-background-900 dark:text-white">
                  <p>Sous-total</p>
                  <p>{{ cartStore.formattedCartTotal }}</p>
                </div>
                <p class="mt-0.5 text-sm text-background-500 dark:text-background-400">Livraison et taxes calculées à la validation.</p>
                <div class="mt-6">
                  <button @click="checkout" class="w-full btn-primary py-3">
                    Valider </button>
                </div>
                <div class="mt-4 flex justify-center">
                  <button @click="cartStore.isCartOpen = false" class="text-sm text-primary-500 hover:text-primary-600">
                    Continuer les Achats </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useAuthStore } from "~/stores/auth";
import { useCartStore } from "~/stores/cart";

// Stores // MODIFIED
const authStore = useAuthStore();
const cartStore = useCartStore();

// État // MODIFIED
const isMobileMenuOpen = ref(false);
const isUserMenuOpen = ref(false);
const isSearchOpen = ref(false);
const isDarkMode = ref(false);
const searchQuery = ref('');
// MODIFIED: Localized popular searches
const popularSearches = ref(['Électronique', 'Soldes d\'Été', 'Casques', 'Nouveautés']);

// Fermer les menus déroulants en cliquant à l'extérieur // MODIFIED
const closeDropdowns = (event: MouseEvent) => {
  if (isUserMenuOpen.value && !(event.target as HTMLElement).closest('.user-menu')) {
    isUserMenuOpen.value = false;
  }
};

// Ajouter un écouteur d'événements pour les clics // MODIFIED
onMounted(() => {
  document.addEventListener('click', closeDropdowns);

  // Charger le panier depuis le stockage local // MODIFIED
  cartStore.loadCart();

  // Vérifier la préférence du mode sombre // MODIFIED
  if (process.client) {
    // Vérifier si l'utilisateur a une préférence enregistrée // MODIFIED
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      isDarkMode.value = true;
    }
  }
});

// Supprimer l'écouteur d'événements // MODIFIED
onBeforeUnmount(() => {
  document.removeEventListener('click', closeDropdowns);
});

// Calculé // MODIFIED
const userInitials = computed(() => {
  if (!authStore.currentUser?.name) return '?';
  return authStore.currentUser.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
});

const userAvatarUrl = computed(() => {
  if (!authStore.currentUser?.avatar) return '';

  // En supposant qu'on doit construire une URL complète pour les images PocketBase // MODIFIED
  const { $pb } = useNuxtApp();
  return $pb.files.getURL(authStore.currentUser, authStore.currentUser.avatar);
});

// Méthodes // MODIFIED
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;

  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

// Generate image URL for cart items
const getCartImageUrl = (item) => {
  // If image is already a full URL, use it
  if (item.image && (item.image.startsWith('http://') || item.image.startsWith('https://'))) {
    return item.image;
  }
  
  // Otherwise construct PocketBase URL
  const { $pb } = useNuxtApp();
  const baseUrl = $pb.baseUrl || config.public.pocketbaseUrl;
  
  if (item.image) {
    return `${baseUrl}/api/files/products/${item.id}/${item.image}`;
  }
  
  return '';
};

const logout = async () => {
  await authStore.logout();
  isUserMenuOpen.value = false;
  // La redirection vers la page d'accueil est gérée dans le store d'authentification // MODIFIED
};

const performSearch = () => {
  if (!searchQuery.value.trim()) return;

  // Fermer le panneau de recherche // MODIFIED
  isSearchOpen.value = false;

  // Naviguer vers la page de résultats de recherche // MODIFIED
  navigateTo(`/search?q=${encodeURIComponent(searchQuery.value.trim())}`);
};

const navigateToProducts = () => {
  cartStore.isCartOpen = false;
  navigateTo('/products');
};

const checkout = () => {
  cartStore.isCartOpen = false;
  navigateTo('/checkout');
};
</script>

<style scoped>
/* Optionnel : Ajouter des transitions pour une UI plus fluide */
.nav-link {
  @apply transition-all duration-200;
}

/* Transition coulissante pour la barre latérale du panier */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>