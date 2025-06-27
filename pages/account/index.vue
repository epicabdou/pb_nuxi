<!-- pages/account/index.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-eucalyptus-50 to-cream-50 dark:from-eucalyptus-900/10 dark:to-cream-900/10">
    <!-- Hero Section -->
    <section class="relative py-16 bg-gradient-to-r from-primary-100 to-eucalyptus-100 dark:from-primary-900/20 dark:to-eucalyptus-900/20 overflow-hidden">
      <div class="absolute inset-0">
        <div class="absolute top-8 left-1/4 w-32 h-32 bg-gradient-to-br from-eucalyptus-200/30 to-primary-200/30 rounded-organic animate-float"></div>
        <div class="absolute bottom-8 right-1/3 w-24 h-24 bg-gradient-to-br from-cream-200/40 to-secondary-200/40 rounded-organic animate-gentle-bounce"></div>
      </div>
      
      <div class="responsive-container relative z-10">
        <div class="text-center">
          <h1 class="font-display text-4xl md:text-5xl font-bold text-primary-700 dark:text-primary-300 mb-4">
            Mon <span class="text-gradient-natural">Espace</span>
          </h1>
          <p class="body-large text-background-600 dark:text-background-400 max-w-2xl mx-auto">
            Gérez votre profil, suivez vos commandes et découvrez votre parcours bien-être
          </p>
        </div>
      </div>
    </section>

    <!-- Loading State -->
    <div v-if="isLoading" class="responsive-container py-16">
      <div class="flex justify-center items-center">
        <div class="relative">
          <div class="animate-spin rounded-full h-16 w-16 border-4 border-eucalyptus-200 border-t-primary-500"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-2xl">🌿</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="responsive-container py-12">
      <!-- Quick Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div class="card-natural p-6 text-center group hover:shadow-natural transition-all duration-300">
          <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary-100 to-eucalyptus-100 dark:from-primary-900/20 dark:to-eucalyptus-900/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <span class="text-xl">📦</span>
          </div>
          <div class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">{{ orders.length }}</div>
          <div class="text-sm text-background-600 dark:text-background-400">Commandes</div>
        </div>
        
        <div class="card-natural p-6 text-center group hover:shadow-natural transition-all duration-300">
          <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-eucalyptus-100 to-cream-100 dark:from-eucalyptus-900/20 dark:to-cream-900/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <span class="text-xl">💰</span>
          </div>
          <div class="text-2xl font-bold text-eucalyptus-600 dark:text-eucalyptus-400 mb-1">{{ totalSpent.toFixed(0) }}DH</div>
          <div class="text-sm text-background-600 dark:text-background-400">Total dépensé</div>
        </div>
        
        <div class="card-natural p-6 text-center group hover:shadow-natural transition-all duration-300">
          <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-cream-100 to-secondary-100 dark:from-cream-900/20 dark:to-secondary-900/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <span class="text-xl">⭐</span>
          </div>
          <div class="text-2xl font-bold text-secondary-600 dark:text-secondary-400 mb-1">{{ loyaltyPoints }}</div>
          <div class="text-sm text-background-600 dark:text-background-400">Points fidélité</div>
        </div>
        
        <div class="card-natural p-6 text-center group hover:shadow-natural transition-all duration-300">
          <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary-100 to-cream-100 dark:from-primary-900/20 dark:to-cream-900/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <span class="text-xl">📅</span>
          </div>
          <div class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">{{ memberSince }}</div>
          <div class="text-sm text-background-600 dark:text-background-400">Membre depuis</div>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="mb-8">
        <div class="flex flex-wrap border-b border-background-200 dark:border-background-700">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-6 py-4 font-medium transition-all duration-200 border-b-2 -mb-px relative group',
              activeTab === tab.id
                ? 'text-primary-600 dark:text-primary-400 border-primary-500'
                : 'text-background-600 dark:text-background-400 border-transparent hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-300'
            ]"
          >
            <span class="flex items-center gap-2">
              <span class="text-lg">{{ tab.icon }}</span>
              {{ tab.label }}
            </span>
            <div v-if="tab.badge" class="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">
              {{ tab.badge }}
            </div>
          </button>
        </div>
      </div>

      <!-- Tab Content -->
      <div class="space-y-8">
        <!-- Profile Tab -->
        <div v-if="activeTab === 'profile'" class="grid lg:grid-cols-[350px_1fr] gap-8">
          <!-- Avatar Section -->
          <div class="space-y-6">
            <div class="card-natural p-8 text-center">
              <div class="relative w-32 h-32 mx-auto mb-6">
                <img
                  v-if="avatarUrl"
                  :src="avatarUrl"
                  alt="Avatar de profil"
                  class="w-full h-full object-cover rounded-full border-4 border-eucalyptus-100 dark:border-eucalyptus-800"
                />
                <div v-else class="w-full h-full bg-gradient-to-br from-eucalyptus-100 to-primary-100 dark:from-eucalyptus-800 dark:to-primary-800 rounded-full flex items-center justify-center border-4 border-eucalyptus-200 dark:border-eucalyptus-700">
                  <span class="text-4xl font-bold text-primary-600 dark:text-primary-400">{{ userInitials }}</span>
                </div>
                
                <!-- Upload Overlay -->
                <div
                  @click="$refs.avatarInput.click()"
                  class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer group"
                >
                  <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                    <div class="text-white text-sm font-medium">Changer</div>
                    <div class="text-white text-xs">la photo</div>
                  </div>
                </div>
                <input ref="avatarInput" type="file" class="hidden" accept="image/*" @change="handleAvatarUpload" />
              </div>
              
              <h2 class="text-xl font-bold text-primary-700 dark:text-primary-300 mb-2">
                {{ user.name || 'Nom non défini' }}
              </h2>
              <p class="text-background-600 dark:text-background-400 mb-4">{{ user.email }}</p>
              
              <!-- Membership Badge -->
              <div class="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-primary-100 to-eucalyptus-100 dark:from-primary-900/30 dark:to-eucalyptus-900/30 text-sm font-medium text-primary-700 dark:text-primary-300">
                <span class="mr-2">👑</span>
                Membre Premium
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="card-natural p-6">
              <h3 class="font-semibold text-lg text-primary-700 dark:text-primary-300 mb-4">Actions Rapides</h3>
              <div class="space-y-3">
                <button @click="navigateToProducts" class="w-full btn-secondary text-left flex items-center justify-between">
                  <span class="flex items-center gap-3">
                    <span>🛍️</span>
                    <span>Continuer mes achats</span>
                  </span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
                
                <button @click="activeTab = 'addresses'" class="w-full btn-secondary text-left flex items-center justify-between">
                  <span class="flex items-center gap-3">
                    <span>📍</span>
                    <span>Gérer mes adresses</span>
                  </span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
                
                <button @click="downloadOrderHistory" class="w-full btn-secondary text-left flex items-center justify-between">
                  <span class="flex items-center gap-3">
                    <span>📄</span>
                    <span>Télécharger l'historique</span>
                  </span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Profile Form -->
          <div class="card-natural p-8">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-primary-700 dark:text-primary-300">Informations Personnelles</h2>
              <button
                v-if="!isEditing"
                @click="isEditing = true"
                class="btn-primary"
              >
                <span class="mr-2">✏️</span>
                Modifier
              </button>
            </div>

            <form @submit.prevent="updateProfile" class="space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="input-label">Prénom</label>
                  <input
                    v-model="formData.firstName"
                    type="text"
                    class="input-primary"
                    :disabled="!isEditing"
                    placeholder="Votre prénom"
                  />
                </div>
                
                <div>
                  <label class="input-label">Nom</label>
                  <input
                    v-model="formData.lastName"
                    type="text"
                    class="input-primary"
                    :disabled="!isEditing"
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              <div>
                <label class="input-label">Email</label>
                <input
                  v-model="user.email"
                  type="email"
                  class="input-primary"
                  disabled
                  placeholder="Adresse email"
                />
                <p class="input-help">L'email ne peut pas être modifié</p>
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="input-label">Téléphone</label>
                  <input
                    v-model="formData.phone"
                    type="tel"
                    class="input-primary"
                    :disabled="!isEditing"
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>
                
                <div>
                  <label class="input-label">Date de naissance</label>
                  <input
                    v-model="formData.birthdate"
                    type="date"
                    class="input-primary"
                    :disabled="!isEditing"
                  />
                </div>
              </div>

              <!-- Preferences -->
              <div v-if="isEditing" class="border-t border-background-200 dark:border-background-700 pt-6">
                <h3 class="font-semibold text-lg text-primary-700 dark:text-primary-300 mb-4">Préférences</h3>
                <div class="space-y-4">
                  <label class="flex items-center">
                    <input v-model="formData.newsletter" type="checkbox" class="checkbox-primary mr-3" :disabled="!isEditing">
                    <span class="text-background-700 dark:text-background-300">Recevoir la newsletter</span>
                  </label>
                  
                  <label class="flex items-center">
                    <input v-model="formData.orderNotifications" type="checkbox" class="checkbox-primary mr-3" :disabled="!isEditing">
                    <span class="text-background-700 dark:text-background-300">Notifications de commandes</span>
                  </label>
                </div>
              </div>

              <div v-if="isEditing" class="flex justify-end space-x-4 pt-6">
                <button
                  @click.prevent="cancelEdit"
                  type="button"
                  class="btn-secondary"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  class="btn-primary"
                  :disabled="isSubmitting"
                >
                  <span v-if="isSubmitting" class="mr-2">⏳</span>
                  {{ isSubmitting ? 'Enregistrement...' : 'Enregistrer' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Orders Tab -->
        <div v-else-if="activeTab === 'orders'" class="space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-primary-700 dark:text-primary-300">Mes Commandes</h2>
            <div class="flex items-center space-x-4">
              <select v-model="orderFilter" class="input-primary text-sm">
                <option value="all">Toutes les commandes</option>
                <option value="pending">En attente</option>
                <option value="shipped">Expédiées</option>
                <option value="delivered">Livrées</option>
              </select>
            </div>
          </div>

          <div v-if="filteredOrders.length === 0" class="card-natural p-12 text-center">
            <div class="text-6xl mb-4">📦</div>
            <h3 class="text-xl font-semibold text-primary-700 dark:text-primary-300 mb-2">Aucune commande</h3>
            <p class="text-background-600 dark:text-background-400 mb-6">Vous n'avez pas encore passé de commande.</p>
            <button @click="navigateToProducts" class="btn-primary">
              Découvrir nos produits
            </button>
          </div>

          <div v-else class="space-y-4">
            <div v-for="order in filteredOrders" :key="order.id" class="card-natural p-6 hover:shadow-natural transition-all duration-300">
              <div class="flex items-start justify-between mb-4">
                <div>
                  <h3 class="font-semibold text-lg text-primary-700 dark:text-primary-300">
                    Commande #{{ order.id.slice(-8).toUpperCase() }}
                  </h3>
                  <p class="text-sm text-background-600 dark:text-background-400">
                    {{ formatDate(order.created) }}
                  </p>
                </div>
                
                <div class="text-right">
                  <div class="text-lg font-bold text-primary-600 dark:text-primary-400">
                    {{ order.totalPrice?.toFixed(2) || '0.00' }} DH
                  </div>
                  <span :class="getStatusClass(order.status)" class="inline-flex px-2 py-1 text-xs font-medium rounded-full">
                    {{ getStatusText(order.status) }}
                  </span>
                </div>
              </div>

              <!-- Order Items -->
              <div v-if="order.items && order.items.length > 0" class="space-y-3 mb-4">
                <div v-for="item in order.items" :key="item.id" class="flex items-center space-x-4 p-3 bg-background-50 dark:bg-background-800 rounded-lg">
                  <div class="w-12 h-12 bg-gradient-to-br from-eucalyptus-100 to-primary-100 dark:from-eucalyptus-900/20 dark:to-primary-900/20 rounded-lg flex items-center justify-center">
                    <span class="text-lg">🧴</span>
                  </div>
                  <div class="flex-1">
                    <h4 class="font-medium text-background-900 dark:text-background-100">{{ item.expand?.product?.name || 'Produit' }}</h4>
                    <p class="text-sm text-background-600 dark:text-background-400">Quantité: {{ item.quantity }}</p>
                  </div>
                  <div class="text-right">
                    <div class="font-semibold text-background-900 dark:text-background-100">
                      {{ (item.price * item.quantity)?.toFixed(2) || '0.00' }} DH
                    </div>
                  </div>
                </div>
              </div>

              <!-- Order Actions -->
              <div class="flex items-center justify-between pt-4 border-t border-background-200 dark:border-background-700">
                <div class="flex items-center space-x-4">
                  <button class="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors">
                    Voir les détails
                  </button>
                  <button v-if="canReorder(order.status)" class="text-eucalyptus-600 hover:text-eucalyptus-700 text-sm font-medium transition-colors">
                    Commander à nouveau
                  </button>
                </div>
                
                <div v-if="canTrack(order.status)" class="flex items-center space-x-2">
                  <span class="text-sm text-background-600 dark:text-background-400">Suivi:</span>
                  <button class="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors">
                    {{ order.trackingNumber || 'Disponible bientôt' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Password Tab -->
        <div v-else-if="activeTab === 'password'" class="max-w-2xl">
          <div class="card-natural p-8">
            <h2 class="text-2xl font-bold text-primary-700 dark:text-primary-300 mb-6">Changer le mot de passe</h2>
            
            <form @submit.prevent="updatePassword" class="space-y-6">
              <div>
                <label class="input-label">Mot de passe actuel</label>
                <input
                  v-model="passwordData.currentPassword"
                  type="password"
                  class="input-primary"
                  required
                  placeholder="Entrez votre mot de passe actuel"
                />
              </div>

              <div>
                <label class="input-label">Nouveau mot de passe</label>
                <input
                  v-model="passwordData.newPassword"
                  type="password"
                  class="input-primary"
                  required
                  placeholder="Entrez votre nouveau mot de passe"
                />
                <div class="mt-2 text-sm text-background-600 dark:text-background-400">
                  Le mot de passe doit contenir au moins 8 caractères
                </div>
              </div>

              <div>
                <label class="input-label">Confirmer le nouveau mot de passe</label>
                <input
                  v-model="passwordData.confirmPassword"
                  type="password"
                  class="input-primary"
                  required
                  placeholder="Confirmez votre nouveau mot de passe"
                  :class="{ 'border-error-500': passwordMismatch }"
                />
                <div v-if="passwordMismatch" class="mt-1 text-sm text-error-500">
                  Les mots de passe ne correspondent pas
                </div>
              </div>

              <div class="flex justify-end">
                <button
                  type="submit"
                  class="btn-primary"
                  :disabled="isSubmitting || passwordMismatch"
                >
                  <span v-if="isSubmitting" class="mr-2">⏳</span>
                  {{ isSubmitting ? 'Mise à jour...' : 'Mettre à jour le mot de passe' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Addresses Tab -->
        <div v-else-if="activeTab === 'addresses'" class="space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-primary-700 dark:text-primary-300">Mes Adresses</h2>
            <button @click="showAddressModal = true" class="btn-primary">
              <span class="mr-2">➕</span>
              Ajouter une adresse
            </button>
          </div>

          <div v-if="addresses.length === 0" class="card-natural p-12 text-center">
            <div class="text-6xl mb-4">📍</div>
            <h3 class="text-xl font-semibold text-primary-700 dark:text-primary-300 mb-2">Aucune adresse</h3>
            <p class="text-background-600 dark:text-background-400 mb-6">Ajoutez votre première adresse de livraison.</p>
            <button @click="showAddressModal = true" class="btn-primary">
              Ajouter une adresse
            </button>
          </div>

          <div v-else class="grid md:grid-cols-2 gap-6">
            <div v-for="address in addresses" :key="address.id" class="card-natural p-6 relative">
              <div v-if="address.isDefault" class="absolute top-4 right-4">
                <span class="inline-flex px-2 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
                  Par défaut
                </span>
              </div>
              
              <h3 class="font-semibold text-lg text-primary-700 dark:text-primary-300 mb-3">{{ address.name }}</h3>
              <div class="space-y-1 text-background-700 dark:text-background-300 mb-4">
                <p>{{ address.street }}</p>
                <p>{{ address.city }}, {{ address.zipCode }}</p>
                <p>{{ address.country }}</p>
              </div>
              
              <div class="flex items-center space-x-4">
                <button class="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Modifier
                </button>
                <button v-if="!address.isDefault" class="text-eucalyptus-600 hover:text-eucalyptus-700 text-sm font-medium">
                  Définir par défaut
                </button>
                <button v-if="!address.isDefault" class="text-error-600 hover:text-error-700 text-sm font-medium">
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Preferences Tab -->
        <div v-else-if="activeTab === 'preferences'" class="max-w-2xl">
          <div class="card-natural p-8">
            <h2 class="text-2xl font-bold text-primary-700 dark:text-primary-300 mb-6">Préférences</h2>
            
            <div class="space-y-8">
              <!-- Notifications -->
              <div>
                <h3 class="font-semibold text-lg text-primary-700 dark:text-primary-300 mb-4">Notifications</h3>
                <div class="space-y-4">
                  <label class="flex items-center justify-between p-4 bg-background-50 dark:bg-background-800 rounded-lg">
                    <div>
                      <div class="font-medium text-background-900 dark:text-background-100">Newsletter</div>
                      <div class="text-sm text-background-600 dark:text-background-400">Recevez nos dernières actualités et offres</div>
                    </div>
                    <input v-model="preferences.newsletter" type="checkbox" class="checkbox-primary">
                  </label>
                  
                  <label class="flex items-center justify-between p-4 bg-background-50 dark:bg-background-800 rounded-lg">
                    <div>
                      <div class="font-medium text-background-900 dark:text-background-100">Commandes</div>
                      <div class="text-sm text-background-600 dark:text-background-400">Notifications sur le statut de vos commandes</div>
                    </div>
                    <input v-model="preferences.orderNotifications" type="checkbox" class="checkbox-primary">
                  </label>
                  
                  <label class="flex items-center justify-between p-4 bg-background-50 dark:bg-background-800 rounded-lg">
                    <div>
                      <div class="font-medium text-background-900 dark:text-background-100">Promotions</div>
                      <div class="text-sm text-background-600 dark:text-background-400">Alertes sur les ventes et promotions spéciales</div>
                    </div>
                    <input v-model="preferences.promotions" type="checkbox" class="checkbox-primary">
                  </label>
                </div>
              </div>

              <!-- Privacy -->
              <div class="border-t border-background-200 dark:border-background-700 pt-8">
                <h3 class="font-semibold text-lg text-primary-700 dark:text-primary-300 mb-4">Confidentialité</h3>
                <div class="space-y-4">
                  <label class="flex items-center justify-between p-4 bg-background-50 dark:bg-background-800 rounded-lg">
                    <div>
                      <div class="font-medium text-background-900 dark:text-background-100">Profil public</div>
                      <div class="text-sm text-background-600 dark:text-background-400">Permettre aux autres de voir votre profil</div>
                    </div>
                    <input v-model="preferences.publicProfile" type="checkbox" class="checkbox-primary">
                  </label>
                  
                  <label class="flex items-center justify-between p-4 bg-background-50 dark:bg-background-800 rounded-lg">
                    <div>
                      <div class="font-medium text-background-900 dark:text-background-100">Données d'utilisation</div>
                      <div class="text-sm text-background-600 dark:text-background-400">Aider à améliorer nos services</div>
                    </div>
                    <input v-model="preferences.analytics" type="checkbox" class="checkbox-primary">
                  </label>
                </div>
              </div>

              <!-- Account Actions -->
              <div class="border-t border-background-200 dark:border-background-700 pt-8">
                <h3 class="font-semibold text-lg text-error-600 mb-4">Zone de danger</h3>
                <div class="space-y-4">
                  <div class="p-4 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg">
                    <div class="flex items-center justify-between">
                      <div>
                        <div class="font-medium text-error-900 dark:text-error-100">Supprimer le compte</div>
                        <div class="text-sm text-error-700 dark:text-error-300">Cette action est irréversible</div>
                      </div>
                      <button @click="confirmDeleteAccount" class="btn-error">
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex justify-end">
                <button @click="updatePreferences" class="btn-primary" :disabled="isSubmitting">
                  <span v-if="isSubmitting" class="mr-2">⏳</span>
                  {{ isSubmitting ? 'Enregistrement...' : 'Enregistrer les préférences' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notifications -->
    <div class="fixed bottom-4 right-4 z-50">
      <transition name="slide-up">
        <div
          v-if="toast.show"
          class="p-4 rounded-lg shadow-lg max-w-sm transform transition-all backdrop-blur-sm"
          :class="{
            'bg-success-500/90 text-white': toast.type === 'success',
            'bg-error-500/90 text-white': toast.type === 'error',
            'bg-primary-500/90 text-white': toast.type === 'info'
          }"
        >
          <div class="flex items-center">
            <span class="mr-3 text-lg">
              {{ toast.type === 'success' ? '✅' : toast.type === 'error' ? '❌' : 'ℹ️' }}
            </span>
            <span class="font-medium flex-1">{{ toast.message }}</span>
            <button @click="toast.show = false" class="ml-3 hover:opacity-70">
              <span class="text-xl">&times;</span>
            </button>
          </div>
        </div>
      </transition>
    </div>

    <!-- Address Modal -->
    <div v-if="showAddressModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="card-natural p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-primary-700 dark:text-primary-300">Nouvelle adresse</h3>
          <button @click="showAddressModal = false" class="text-background-500 hover:text-background-700">
            <span class="text-2xl">&times;</span>
          </button>
        </div>
        
        <form @submit.prevent="addAddress" class="space-y-4">
          <div>
            <label class="input-label">Nom de l'adresse</label>
            <input v-model="newAddress.name" type="text" class="input-primary" required placeholder="Ex: Domicile, Bureau...">
          </div>
          
          <div>
            <label class="input-label">Rue</label>
            <input v-model="newAddress.street" type="text" class="input-primary" required placeholder="123 rue de la Paix">
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="input-label">Code postal</label>
              <input v-model="newAddress.zipCode" type="text" class="input-primary" required placeholder="75001">
            </div>
            <div>
              <label class="input-label">Ville</label>
              <input v-model="newAddress.city" type="text" class="input-primary" required placeholder="Paris">
            </div>
          </div>
          
          <div>
            <label class="input-label">Pays</label>
            <select v-model="newAddress.country" class="input-primary" required>
              <option value="">Sélectionner un pays</option>
              <option value="France">France</option>
              <option value="Belgique">Belgique</option>
              <option value="Suisse">Suisse</option>
              <option value="Luxembourg">Luxembourg</option>
            </select>
          </div>
          
          <label class="flex items-center">
            <input v-model="newAddress.isDefault" type="checkbox" class="checkbox-primary mr-3">
            <span>Définir comme adresse par défaut</span>
          </label>
          
          <div class="flex justify-end space-x-4 pt-4">
            <button type="button" @click="showAddressModal = false" class="btn-secondary">
              Annuler
            </button>
            <button type="submit" class="btn-primary" :disabled="isSubmitting">
              {{ isSubmitting ? 'Ajout...' : 'Ajouter' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, watch } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'

// Middleware and SEO
definePageMeta({
  middleware: 'auth'
})

useSeoMeta({
  title: 'Mon Compte | Ajimall - Gommages Corporels Naturels',
  ogTitle: 'Mon Compte | Ajimall',
  description: 'Gérez votre profil, suivez vos commandes et personnalisez vos préférences sur Ajimall.',
  ogDescription: 'Gérez votre profil, suivez vos commandes et personnalisez vos préférences sur Ajimall.',
  ogImage: '/images/account-hero.jpg',
  twitterCard: 'summary_large_image',
})

const { $pb } = useNuxtApp()
const authStore = useAuthStore()
const router = useRouter()

// State
const isLoading = ref(true)
const isSubmitting = ref(false)
const isEditing = ref(false)
const showAddressModal = ref(false)
const user = ref({})
const formData = reactive({
  firstName: '',
  lastName: '',
  phone: '',
  birthdate: '',
  newsletter: false,
  orderNotifications: true
})
const passwordData = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const orders = ref([])
const addresses = ref([
  {
    id: 1,
    name: 'Domicile',
    street: '123 rue de la Paix',
    city: 'Paris',
    zipCode: '75001',
    country: 'France',
    isDefault: true
  }
])
const newAddress = reactive({
  name: '',
  street: '',
  city: '',
  zipCode: '',
  country: '',
  isDefault: false
})
const preferences = reactive({
  newsletter: true,
  orderNotifications: true,
  promotions: false,
  publicProfile: false,
  analytics: true
})
const toast = reactive({
  show: false,
  message: '',
  type: 'success',
  timeout: null
})

// Tabs
const activeTab = ref('profile')
const orderFilter = ref('all')

const tabs = computed(() => [
  { 
    id: 'profile', 
    label: 'Profil', 
    icon: '👤'
  },
  { 
    id: 'orders', 
    label: 'Commandes', 
    icon: '📦',
    badge: orders.value.length > 0 ? orders.value.length : null
  },
  { 
    id: 'password', 
    label: 'Sécurité', 
    icon: '🔒'
  },
  { 
    id: 'addresses', 
    label: 'Adresses', 
    icon: '📍'
  },
  { 
    id: 'preferences', 
    label: 'Préférences', 
    icon: '⚙️'
  }
])

// Computed properties
const avatarUrl = computed(() => {
  if (user.value && user.value.avatar) {
    return `${$pb.baseUrl}/api/files/${user.value.collectionId}/${user.value.id}/${user.value.avatar}`
  }
  return null
})

const userInitials = computed(() => {
  if (!formData.firstName && !formData.lastName) return '?'
  const first = formData.firstName?.charAt(0) || ''
  const last = formData.lastName?.charAt(0) || ''
  return (first + last).toUpperCase() || '?'
})

const passwordMismatch = computed(() => {
  return passwordData.newPassword &&
    passwordData.confirmPassword &&
    passwordData.newPassword !== passwordData.confirmPassword
})

const totalSpent = computed(() => {
  return orders.value.reduce((total, order) => total + (order.totalPrice || 0), 0)
})

const loyaltyPoints = computed(() => {
  return Math.floor(totalSpent.value / 10) // 1 point per 10DH spent
})

const memberSince = computed(() => {
  if (!user.value.created) return '2024'
  return new Date(user.value.created).getFullYear().toString()
})

const filteredOrders = computed(() => {
  if (orderFilter.value === 'all') return orders.value
  return orders.value.filter(order => order.status === orderFilter.value)
})

// Lifecycle
onMounted(async () => {
  try {
    if (!authStore.isAuthenticated) {
      return router.push('/login')
    }
    
    await fetchUserData()
    await fetchOrders()
    isLoading.value = false
  } catch (error) {
    showToast('Erreur lors du chargement des données', 'error')
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
    if (!$pb.authStore.isValid) {
      return router.push('/login')
    }

    user.value = $pb.authStore.model
    
    // Set form data
    const nameParts = (user.value.name || '').split(' ')
    formData.firstName = nameParts[0] || ''
    formData.lastName = nameParts.slice(1).join(' ') || ''
    formData.phone = user.value.phone || ''
    formData.birthdate = user.value.birthdate || ''
    formData.newsletter = user.value.newsletter || false
    formData.orderNotifications = user.value.orderNotifications !== false
  } catch (error) {
    console.error('Error fetching user data:', error)
    throw error
  }
}

async function fetchOrders() {
  try {
    const ordersList = await $pb.collection('orders').getList(1, 50, {
      filter: `user="${user.value.id}"`,
      sort: '-created',
      expand: 'user'
    })

    const ordersWithItems = await Promise.all(
      ordersList.items.map(async (order) => {
        try {
          const items = await $pb.collection('orderItems').getList(1, 100, {
            filter: `order="${order.id}"`,
            expand: 'product'
          })
          return {
            ...order,
            items: items.items
          }
        } catch (error) {
          console.error('Error fetching order items:', error)
          return {
            ...order,
            items: []
          }
        }
      })
    )

    orders.value = ordersWithItems
  } catch (error) {
    console.error('Error fetching orders:', error)
    showToast('Erreur lors du chargement des commandes', 'error')
  }
}

async function updateProfile() {
  if (!isEditing.value) return

  isSubmitting.value = true

  try {
    const data = {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      phone: formData.phone,
      birthdate: formData.birthdate,
      newsletter: formData.newsletter,
      orderNotifications: formData.orderNotifications
    }

    const updatedUser = await $pb.collection('users').update(user.value.id, data)
    
    user.value = updatedUser
    authStore.setUser(updatedUser)
    
    isEditing.value = false
    showToast('Profil mis à jour avec succès', 'success')
  } catch (error) {
    console.error('Error updating profile:', error)
    showToast('Erreur lors de la mise à jour du profil', 'error')
  } finally {
    isSubmitting.value = false
  }
}

async function updatePassword() {
  if (passwordMismatch.value) return

  isSubmitting.value = true

  try {
    await $pb.collection('users').authWithPassword(
      user.value.email,
      passwordData.currentPassword
    )

    await $pb.collection('users').update(user.value.id, {
      password: passwordData.newPassword,
      passwordConfirm: passwordData.confirmPassword
    })

    passwordData.currentPassword = ''
    passwordData.newPassword = ''
    passwordData.confirmPassword = ''

    showToast('Mot de passe mis à jour avec succès', 'success')
  } catch (error) {
    console.error('Error updating password:', error)
    
    if (error.status === 400) {
      showToast('Mot de passe actuel incorrect', 'error')
    } else {
      showToast('Erreur lors de la mise à jour du mot de passe', 'error')
    }
  } finally {
    isSubmitting.value = false
  }
}

async function handleAvatarUpload(event) {
  const file = event.target.files[0]
  if (!file) return

  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  if (!validTypes.includes(file.type)) {
    showToast('Veuillez télécharger une image valide (JPEG, PNG, GIF, ou WebP)', 'error')
    return
  }

  isSubmitting.value = true

  try {
    const formData = new FormData()
    formData.append('avatar', file)

    const updatedUser = await $pb.collection('users').update(user.value.id, formData)
    
    user.value = updatedUser
    authStore.setUser(updatedUser)
    
    showToast('Photo de profil mise à jour', 'success')
  } catch (error) {
    console.error('Error uploading avatar:', error)
    showToast('Erreur lors du téléchargement de la photo', 'error')
  } finally {
    isSubmitting.value = false
    event.target.value = null
  }
}

function cancelEdit() {
  isEditing.value = false
  const nameParts = (user.value.name || '').split(' ')
  formData.firstName = nameParts[0] || ''
  formData.lastName = nameParts.slice(1).join(' ') || ''
  formData.phone = user.value.phone || ''
  formData.birthdate = user.value.birthdate || ''
}

async function addAddress() {
  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newAddr = {
      id: Date.now(),
      ...newAddress
    }
    
    addresses.value.push(newAddr)
    
    // Reset form
    Object.assign(newAddress, {
      name: '',
      street: '',
      city: '',
      zipCode: '',
      country: '',
      isDefault: false
    })
    
    showAddressModal.value = false
    showToast('Adresse ajoutée avec succès', 'success')
  } catch (error) {
    showToast('Erreur lors de l\'ajout de l\'adresse', 'error')
  } finally {
    isSubmitting.value = false
  }
}

async function updatePreferences() {
  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    showToast('Préférences enregistrées', 'success')
  } catch (error) {
    showToast('Erreur lors de l\'enregistrement', 'error')
  } finally {
    isSubmitting.value = false
  }
}

function confirmDeleteAccount() {
  if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
    // Handle account deletion
    showToast('Fonction de suppression de compte à implémenter', 'info')
  }
}

function navigateToProducts() {
  router.push('/products')
}

function downloadOrderHistory() {
  showToast('Téléchargement de l\'historique...', 'info')
  // Implement download functionality
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function getStatusClass(status) {
  const classes = {
    'pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    'shipped': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    'delivered': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    'cancelled': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
  }
  return classes[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
}

function getStatusText(status) {
  const texts = {
    'pending': 'En attente',
    'shipped': 'Expédiée',
    'delivered': 'Livrée',
    'cancelled': 'Annulée'
  }
  return texts[status] || 'Inconnu'
}

function canReorder(status) {
  return ['delivered', 'cancelled'].includes(status)
}

function canTrack(status) {
  return ['shipped'].includes(status)
}

function showToast(message, type = 'success') {
  if (toast.timeout) {
    clearTimeout(toast.timeout)
  }

  toast.message = message
  toast.type = type
  toast.show = true

  toast.timeout = setTimeout(() => {
    toast.show = false
  }, 5000)
}
</script>

<style scoped>
/* Transitions */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

/* Custom checkbox styling */
.checkbox-primary {
  @apply w-4 h-4 text-primary-600 bg-background-100 border-background-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-background-800 focus:ring-2 dark:bg-background-700 dark:border-background-600;
}

/* Enhanced input styling */
.input-primary:focus {
  @apply ring-2 ring-primary-500 border-primary-500;
  transform: scale(1.01);
}

/* Button error variant */
.btn-error {
  @apply px-4 py-2 bg-error-600 text-white rounded-lg font-medium hover:bg-error-700 focus:outline-none focus:ring-2 focus:ring-error-500 focus:ring-offset-2 transition-all duration-200;
}

/* Animation delays */
.animation-delay-100 { animation-delay: 100ms; }
.animation-delay-200 { animation-delay: 200ms; }
.animation-delay-300 { animation-delay: 300ms; }
</style>