<template>
  <div v-if="isLoading" class="section-padding">
    <div class="responsive-container">
      <div class="grid place-items-center py-16">
        <div class="animate-pulse flex flex-col items-center">
          <div class="w-32 h-32 bg-background-300 dark:bg-background-700 rounded-full mb-6"></div>
          <div class="h-6 bg-background-300 dark:bg-background-700 rounded w-1/2 mb-4"></div>
          <div class="h-4 bg-background-300 dark:bg-background-700 rounded w-1/3 mb-10"></div>
          <div class="h-4 bg-background-300 dark:bg-background-700 rounded w-3/4 mb-2"></div>
          <div class="h-4 bg-background-300 dark:bg-background-700 rounded w-2/3 mb-2"></div>
          <div class="h-4 bg-background-300 dark:bg-background-700 rounded w-1/2 mb-6"></div>
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="product" class="section-padding">
    <div class="responsive-container">
      <nav class="mb-8">
        <ol class="flex items-center space-x-2 text-sm">
          <li>
            <NuxtLink to="/" class="text-background-600 hover:text-primary-600 transition-colors">Accueil</NuxtLink>
          </li>
          <li class="text-background-600">/</li>
          <li>
            <NuxtLink to="/products" class="text-background-600 hover:text-primary-600 transition-colors">Produits</NuxtLink>
          </li>
          <li class="text-background-600">/</li>
          <li class="text-background-900 dark:text-white font-medium truncate">{{ product.name }}</li>
        </ol>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">

        <div class="space-y-4">
          <div class="bg-white dark:bg-background-800 rounded-2xl overflow-hidden shadow-md aspect-square">
            <img
                :src="mainImageUrl"
                :alt="product.name"
                class="w-full h-full object-contain"
            />
          </div>

          <div class="grid grid-cols-5 gap-3">
            <button
                @click="activeImageIndex = 0"
                class="bg-white dark:bg-background-800 rounded-lg overflow-hidden shadow-sm aspect-square border transition-all"
                :class="activeImageIndex === 0 ? 'border-primary-500 ring-2 ring-primary-400/30' : 'border-background-200 dark:border-background-700'"
            >
              <img
                  :src="`${$pb.baseUrl}/api/files/products/${product.id}/${product.image}`"
                  :alt="`${product.name} - Image principale`" class="w-full h-full object-cover"
              />
            </button>

            <button
                v-for="(image, index) in product.gallery"
                :key="`gallery-${index}`"
                @click="activeImageIndex = index + 1"
                class="bg-white dark:bg-background-800 rounded-lg overflow-hidden shadow-sm aspect-square border transition-all"
                :class="activeImageIndex === index + 1 ? 'border-primary-500 ring-2 ring-primary-400/30' : 'border-background-200 dark:border-background-700'"
            >
              <img
                  :src="`${$pb.baseUrl}/api/files/products/${product.id}/${image}`"
                  :alt="`${product.name} - Image ${index + 1}`" class="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>

        <div class="space-y-6">
          <div class="flex flex-wrap gap-2">
            <span v-for="category in product.expand?.category" :key="category.id"
                  class="badge-outline-primary">
              {{ category.name }}
            </span>
            <span v-for="tag in product.expand?.tags" :key="tag.id"
                  class="badge bg-background-200 dark:bg-background-800 text-background-700 dark:text-background-300">
              {{ tag.name }}
            </span>
          </div>

          <div class="space-y-3">
            <h1 class="heading-2">{{ product.name }}</h1>

            <div class="flex items-center">
              <div class="flex items-center">
                <span v-for="i in 5" :key="i" class="text-yellow-400 mr-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="{'fill-current': i <= averageRating, 'text-background-300 dark:text-background-600': i > averageRating}" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </span>
              </div>
              <span class="ml-1 text-sm text-background-700 dark:text-background-300">
                 {{ averageRating.toFixed(1) }} · {{ reviews.length }} avis
              </span>
            </div>

            <div class="flex items-baseline space-x-3">
              <span v-if="product.promoPrice" class="line-through text-background-500 text-lg">
                 {{ product.price.toFixed(2) }} DH
              </span>
              <span class="text-3xl font-bold text-primary-600">
                 {{ (product.promoPrice || product.price).toFixed(2) }} DH
              </span>
              <span v-if="product.promoPrice" class="badge-primary">
                 {{ Math.round((1 - product.promoPrice / product.price) * 100) }}% DE REMISE
              </span>
            </div>

            <div>
              <span
                  :class="product.stock > 0 ? 'text-success-600' : 'text-error-600'"
                  class="font-medium"
              >
                 {{ product.stock > 0 ? `En Stock (${product.stock} disponible(s))` : 'Épuisé' }}
              </span>
            </div>
          </div>

          <div>
            <p class="text-background-700 dark:text-background-300">
              {{ product.shortDescription }}
            </p>
          </div>

          <div class="pt-4">
            <div class="flex items-center space-x-4 mb-4">
              <div class="flex items-center border border-background-300 dark:border-background-600 rounded-md">
                <button
                    @click="decrementQuantity"
                    class="px-3 py-2 text-lg border-r border-background-300 dark:border-background-600"
                    :disabled="quantity <= 1"
                    :class="{'opacity-50 cursor-not-allowed': quantity <= 1}"
                >
                  -
                </button>
                <input
                    v-model="quantity"
                    type="number"
                    min="1"
                    class="w-16 text-center border-none focus:ring-0 focus:outline-none bg-transparent"
                />
                <button
                    @click="incrementQuantity"
                    class="px-3 py-2 text-lg border-l border-background-300 dark:border-background-600"
                    :disabled="product.stock > 0 && quantity >= product.stock"
                    :class="{'opacity-50 cursor-not-allowed': product.stock > 0 && quantity >= product.stock}"
                >
                  +
                </button>
              </div>

              <button
                  @click="addToCart"
                  class="btn-primary flex-1"
                  :disabled="product.stock <= 0"
                  :class="{'opacity-50 cursor-not-allowed': product.stock <= 0}"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Ajouter au Panier </button>

              <button
                  @click="toggleWishlist"
                  class="btn-ghost aspect-square p-3 rounded-full"
                  :class="{'text-error-500': isInWishlist}"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :fill="isInWishlist ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>

          <div class="border-t border-background-200 dark:border-background-700 pt-6 space-y-3">
            <div class="grid grid-cols-2 gap-2">
              <div class="text-background-600 dark:text-background-400">SKU</div>
              <div>{{ product.id }}</div>
              <div class="text-background-600 dark:text-background-400">Catégories</div>
              <div>{{ product.expand?.category?.map(c => c.name).join(', ') }}</div>
              <div class="text-background-600 dark:text-background-400">Étiquettes</div>
              <div>{{ product.expand?.tags?.map(t => t.name).join(', ') }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-16">
        <div class="border-b border-background-200 dark:border-background-700 mb-8">
          <div class="flex flex-wrap -mb-px">
            <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                class="py-3 px-4 font-medium border-b-2 transition-colors"
                :class="activeTab === tab.id ? 'border-primary-500 text-primary-600' : 'border-transparent text-background-600 hover:text-background-900 dark:text-background-400 dark:hover:text-white'"
            >
              {{ tab.name }} </button>
          </div>
        </div>

        <div class="py-4">
          <div v-if="activeTab === 'description'" class="prose prose-lg max-w-none dark:prose-invert">
            <div v-html="product.longDescription"></div>
          </div>

          <div v-else-if="activeTab === 'reviews'" class="space-y-8">
            <div class="flex flex-col md:flex-row md:items-center gap-6 p-6 bg-background-100 dark:bg-background-800 rounded-xl">
              <div class="flex flex-col items-center md:w-1/4">
                <div class="text-5xl font-bold text-primary-600">{{ averageRating.toFixed(1) }}</div>
                <div class="flex mt-2">
                  <span v-for="i in 5" :key="i" class="text-yellow-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="{'fill-current': i <= averageRating, 'text-background-300 dark:text-background-600': i > averageRating}" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </span>
                </div>
                <div class="text-sm text-background-600 dark:text-background-400 mt-1">{{ reviews.length }} avis</div>
              </div>

              <div class="md:w-3/4 space-y-2">
                <div v-for="n in 5" :key="n" class="flex items-center">
                  <div class="w-1/4 md:w-1/6 flex items-center">
                    <span class="text-sm w-3">{{ 6-n }}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div class="w-3/4 md:w-5/6">
                    <div class="h-2 bg-background-200 dark:bg-background-700 rounded-full">
                      <div class="h-2 bg-primary-500 rounded-full" :style="{width: `${getStarPercent(6-n)}%`}"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-6">
              <div v-if="reviews.length === 0" class="text-center py-10">
                <p class="text-background-600 dark:text-background-400">Aucun avis pour l'instant. Soyez le premier à laisser un avis sur ce produit !</p>
              </div>

              <div v-for="review in reviews" :key="review.id" class="card">
                <div class="flex justify-between">
                  <div class="flex items-center">
                    <img
                        v-if="review.expand?.user?.avatar"
                        :src="getAvatarUrl(review.expand.user)"
                        alt="Avatar"
                        class="h-10 w-10 rounded-full bg-background-300 dark:bg-background-700"
                    >
                    <div v-else class="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center text-white">
                      {{ review.expand?.user?.name ? review.expand.user.name.charAt(0).toUpperCase() : 'U' }}
                    </div>
                    <div class="ml-3">
                      <p class="font-medium">{{ review.expand?.user?.name || 'Utilisateur' }}</p>
                      <p class="text-sm text-background-600 dark:text-background-400">
                        {{ formatDate(review.created) }}
                      </p>
                    </div>
                  </div>
                  <div class="flex">
                    <span v-for="i in 5" :key="i" class="text-yellow-400">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="{'fill-current': i <= review.rating, 'text-background-300 dark:text-background-600': i > review.rating}" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div class="mt-4">
                  <p class="text-background-800 dark:text-background-200">
                    {{ review.comment }}
                  </p>
                </div>
              </div>

              <div v-if="authStore.isAuthenticated && !userReview" class="card">
                <h3 class="text-xl font-semibold mb-4">Écrire un Avis</h3>
                <form @submit.prevent="submitReview" class="space-y-4">
                  <div>
                    <label class="input-label">Évaluation</label>
                    <div class="flex">
                      <button
                          v-for="i in 5"
                          :key="i"
                          type="button"
                          @click="newReview.rating = i"
                          class="text-yellow-400 focus:outline-none"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" :class="{'fill-current': i <= newReview.rating, 'text-background-300 dark:text-background-600': i > newReview.rating}" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div>
                    <label for="comment" class="input-label">Votre Avis</label>
                    <textarea
                        v-model="newReview.comment"
                        id="comment"
                        rows="4"
                        class="input-primary"
                        placeholder="Partagez votre opinion sur ce produit..." required
                    ></textarea>
                  </div>
                  <div>
                    <button type="submit" class="btn-primary" :disabled="isSubmitting">
                      <span v-if="isSubmitting">Envoi en cours...</span>
                      <span v-else>Envoyer l'Avis</span>
                    </button>
                  </div>
                </form>
              </div>

              <div v-else-if="!authStore.isAuthenticated" class="card text-center">
                <p class="mb-4">Veuillez vous connecter pour laisser un avis.</p>
                <NuxtLink to="/login" class="btn-primary">Connexion</NuxtLink> </div>
            </div>
          </div>

          <div v-else-if="activeTab === 'related'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-if="isLoadingRelated" class="col-span-full text-center py-10">
              <p class="text-background-600 dark:text-background-400">Chargement des produits similaires...</p>
            </div>

            <div v-else-if="relatedProducts.length === 0" class="col-span-full text-center py-10">
              <p class="text-background-600 dark:text-background-400">Aucun produit similaire trouvé.</p>
            </div>

            <div v-for="item in relatedProducts" :key="item.id" class="card-fancy group">
              <div class="relative mb-4 overflow-hidden rounded-lg aspect-square bg-background-100 dark:bg-background-900">
                <img
                    :src="getProductImageUrl(item)"
                    :alt="item.name"
                    class="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                <span
                    v-if="item.promoPrice"
                    class="absolute top-2 right-2 badge-primary"
                >
                   {{ Math.round((1 - item.promoPrice / item.price) * 100) }}% DE REMISE
                </span>
              </div>

              <div>
                <h3 class="mb-2 font-semibold truncate">
                  <NuxtLink :to="`/products/${item.slug}`" class="hover:text-primary-600 transition-colors">
                    {{ item.name }}
                  </NuxtLink>
                </h3>

                <div class="flex items-center space-x-2">
                  <span
                      v-if="item.promoPrice"
                      class="text-background-500 line-through"
                  >
                     {{ item.price.toFixed(2) }} DH
                  </span>
                  <span class="font-semibold text-primary-600">
                     {{ (item.promoPrice || item.price).toFixed(2) }} DH
                  </span>
                </div>

                <div class="flex items-center justify-between mt-4">
                  <button
                      @click="addRelatedToCart(item)"
                      class="btn-icon-text btn-sm btn-primary"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Ajouter </button>

                  <NuxtLink
                      :to="`/products/${item.slug}`"
                      class="btn-icon-text btn-sm btn-ghost"
                  >
                    Voir </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="section-padding">
    <div class="responsive-container text-center py-20">
      <h2 class="heading-3 mb-4">Produit Non Trouvé</h2>
      <p class="text-background-600 dark:text-background-400 mb-8">
        Désolé, nous n'avons pas pu trouver le produit que vous recherchez.
      </p>
      <NuxtLink to="/products" class="btn-primary">
        Parcourir Tous les Produits </NuxtLink>
    </div>
  </div>

  <ToastNotification
      :show="showToast"
      :type="toastType"
      :message="toastMessage"
      :title="toastTitle"
      @close="showToast = false"
  />

  <ProductMeta v-if="product" :product="product" />
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useNuxtApp } from 'nuxt/app';
import { useAuthStore } from '~/stores/auth';
import { useCartStore } from '~/stores/cart';

// Importer les composants personnalisés // MODIFIED
import ToastNotification from '~/components/ToastNotification.vue';
import ProductMeta from '~/components/ProductMeta.vue';

// Obtenir la route, l'instance PocketBase et les stores // MODIFIED
const route = useRoute();
const { $pb } = useNuxtApp();
const authStore = useAuthStore();
const cartStore = useCartStore();

// État // MODIFIED
const product = ref(null);
const reviews = ref([]);
const relatedProducts = ref([]);
const isLoading = ref(true);
const isLoadingRelated = ref(true);
const isSubmitting = ref(false);
const activeImageIndex = ref(0);
const quantity = ref(1);
const isInWishlist = ref(false);
const userWishlistItem = ref(null);
const userReview = ref(null);

// État de la notification Toast // MODIFIED
const showToast = ref(false);
const toastType = ref('success');
const toastMessage = ref('');
const toastTitle = ref('');

// Onglets pour les détails du produit // MODIFIED
const activeTab = ref('description');
const tabs = [
  // MODIFIED Labels
  { id: 'description', name: 'Description' },
  { id: 'reviews', name: 'Avis' },
  { id: 'related', name: 'Produits Similaires' }
];

// Formulaire pour un nouvel avis // MODIFIED
const newReview = ref({
  rating: 5,
  comment: ''
});

const mainImageUrl = computed(() => {
  if (!product.value) return '';

  // Si activeImageIndex est 0, utiliser l'image principale du produit // MODIFIED
  if (activeImageIndex.value === 0) {
    return `${$pb.baseUrl}/api/files/products/${product.value.id}/${product.value.image}`;
  }

  // Sinon utiliser l'image sélectionnée de la galerie (ajuster l'index car les images de la galerie commencent à l'index 1) // MODIFIED
  const galleryIndex = activeImageIndex.value - 1;
  if (product.value.gallery && product.value.gallery.length > galleryIndex) {
    return `${$pb.baseUrl}/api/files/products/${product.value.id}/${product.value.gallery[galleryIndex]}`;
  }

  // Solution de repli vers l'image principale si quelque chose ne va pas // MODIFIED
  return `${$pb.baseUrl}/api/files/products/${product.value.id}/${product.value.image}`;
});

const averageRating = computed(() => {
  if (!reviews.value.length) return 0;
  const sum = reviews.value.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.value.length;
});

const fetchProduct = async () => {
  isLoading.value = true;
  try {
    // Récupérer le produit par slug avec les relations étendues // MODIFIED
    const record = await $pb.collection('products').getFirstListItem(`slug="${route.params.slug}"`, {
      expand: 'category,tags'
    });

    product.value = record;

    // Après avoir récupéré le produit, récupérer les avis et les articles similaires // MODIFIED
    fetchReviews();
    fetchRelatedProducts();
    checkWishlistStatus();
  } catch (error) {
    // MODIFIED
    console.error('Erreur lors de la récupération du produit :', error);
    product.value = null;
  } finally {
    isLoading.value = false;
  }
};

const fetchReviews = async () => {
  try {
    // Récupérer les avis pour ce produit avec les données utilisateur étendues // MODIFIED
    const reviewsList = await $pb.collection('reviews').getList(1, 50, {
      filter: `product="${product.value.id}"`,
      sort: '-created',
      expand: 'user'
    });

    reviews.value = reviewsList.items;

    // Vérifier si l'utilisateur actuel a déjà laissé un avis pour ce produit // MODIFIED
    if (authStore.isAuthenticated) {
      const userReviewData = reviews.value.find(r =>
          r.expand?.user?.id === authStore.currentUser.id
      );

      if (userReviewData) {
        userReview.value = userReviewData;
      }
    }
  } catch (error) {
    // MODIFIED
    console.error('Erreur lors de la récupération des avis :', error);
    reviews.value = [];
  }
};

const fetchRelatedProducts = async () => {
  isLoadingRelated.value = true;
  try {
    if (!product.value) return;

    // Obtenir les produits similaires basés sur les catégories // MODIFIED
    const categoryIds = product.value.expand.category.map(c => c.id);

    if (categoryIds.length === 0) {
      isLoadingRelated.value = false;
      return;
    }

    // Créer un filtre pour les produits dans les mêmes catégories mais pas le produit actuel // MODIFIED
    const categoryFilters = categoryIds.map(id => `category~"${id}"`).join('||');
    const filter = `(${categoryFilters})&&id!="${product.value.id}"`;

    const relatedList = await $pb.collection('products').getList(1, 4, {
      filter: filter,
      sort: 'created'
    });

    relatedProducts.value = relatedList.items;
  } catch (error) {
    // MODIFIED
    console.error('Erreur lors de la récupération des produits similaires :', error);
    relatedProducts.value = [];
  } finally {
    isLoadingRelated.value = false;
  }
};

const checkWishlistStatus = async () => {
  if (!authStore.isAuthenticated || !product.value) {
    isInWishlist.value = false;
    return;
  }

  try {
    // Vérifier si l'utilisateur a ce produit dans sa liste de souhaits // MODIFIED
    const wishlistItem = await $pb.collection('wishlists').getFirstListItem(`user="${authStore.currentUser.id}"&&product="${product.value.id}"`);

    isInWishlist.value = true;
    userWishlistItem.value = wishlistItem;
  } catch (error) {
    // Non trouvé dans la liste de souhaits // MODIFIED
    isInWishlist.value = false;
    userWishlistItem.value = null;
  }
};

const toggleWishlist = async () => {
  if (!authStore.isAuthenticated) {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié // MODIFIED
    // MODIFIED
    toastType.value = 'info';
    toastTitle.value = 'Authentification Requise';
    toastMessage.value = 'Veuillez vous connecter pour ajouter des articles à votre liste de souhaits.';
    showToast.value = true;

    setTimeout(() => {
      navigateTo('/login');
    }, 1500);
    return;
  }

  try {
    if (isInWishlist.value) {
      // Retirer de la liste de souhaits // MODIFIED
      await $pb.collection('wishlists').delete(userWishlistItem.value.id);
      isInWishlist.value = false;
      userWishlistItem.value = null;

      // Afficher le toast de succès // MODIFIED
      // MODIFIED
      toastType.value = 'success';
      toastTitle.value = 'Retiré de la Liste de Souhaits';
      toastMessage.value = `${product.value.name} a été retiré(e) de votre liste de souhaits.`;
      showToast.value = true;
    } else {
      // Ajouter à la liste de souhaits // MODIFIED
      const data = {
        user: authStore.currentUser.id,
        product: product.value.id
      };

      const result = await $pb.collection('wishlists').create(data);
      isInWishlist.value = true;
      userWishlistItem.value = result;

      // Afficher le toast de succès // MODIFIED
      // MODIFIED
      toastType.value = 'success';
      toastTitle.value = 'Ajouté à la Liste de Souhaits';
      toastMessage.value = `${product.value.name} a été ajouté(e) à votre liste de souhaits.`;
      showToast.value = true;
    }
  } catch (error) {
    // MODIFIED
    console.error('Erreur lors de la mise à jour de la liste de souhaits :', error);

    // Afficher le toast d'erreur // MODIFIED
    // MODIFIED
    toastType.value = 'error';
    toastTitle.value = 'Erreur';
    toastMessage.value = 'Une erreur s\'est produite lors de la mise à jour de votre liste de souhaits. Veuillez réessayer.';
    showToast.value = true;
  }
};

const getStarPercent = (stars) => {
  const count = reviews.value.filter(review => Math.round(review.rating) === stars).length;
  if (reviews.value.length === 0) return 0;
  return Math.round((count / reviews.value.length) * 100);
};

const submitReview = async () => {
  if (!authStore.isAuthenticated || !product.value) {
    // Afficher le toast de connexion requise si non authentifié // MODIFIED
    // MODIFIED
    toastType.value = 'info';
    toastTitle.value = 'Authentification Requise';
    toastMessage.value = 'Veuillez vous connecter pour soumettre un avis.';
    showToast.value = true;

    setTimeout(() => {
      navigateTo('/login');
    }, 1500);
    return;
  }

  isSubmitting.value = true;

  try {
    const data = {
      user: authStore.currentUser.id,
      product: product.value.id,
      rating: newReview.value.rating,
      comment: newReview.value.comment
    };

    const result = await $pb.collection('reviews').create(data);

    // Rafraîchir les avis pour inclure le nouveau // MODIFIED
    await fetchReviews();

    // Réinitialiser le formulaire // MODIFIED
    newReview.value = {
      rating: 5,
      comment: ''
    };

    // Afficher le toast de succès // MODIFIED
    // MODIFIED
    toastType.value = 'success';
    toastTitle.value = 'Avis Envoyé';
    toastMessage.value = 'Merci pour votre avis ! Il a été publié avec succès.';
    showToast.value = true;

  } catch (error) {
    // MODIFIED
    console.error('Erreur lors de l\'envoi de l\'avis :', error);

    // Afficher le toast d'erreur // MODIFIED
    // MODIFIED
    toastType.value = 'error';
    toastTitle.value = 'Erreur';
    toastMessage.value = 'Une erreur s\'est produite lors de l\'envoi de votre avis. Veuillez réessayer.';
    showToast.value = true;
  } finally {
    isSubmitting.value = false;
  }
};

const incrementQuantity = () => {
  if (product.value.stock > 0 && quantity.value < product.value.stock) {
    quantity.value++;
  }
};

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const addToCart = () => {
  if (!product.value || product.value.stock <= 0) return;

  const itemToAdd = {
    id: product.value.id,
    name: product.value.name,
    slug: product.value.slug,
    price: product.value.promoPrice || product.value.price,
    image: product.value.image,
    quantity: quantity.value
  };

  cartStore.addItem(itemToAdd);

  // Afficher le toast de succès // MODIFIED
  // MODIFIED
  toastType.value = 'success';
  toastTitle.value = 'Ajouté au Panier';
  toastMessage.value = `${quantity.value} × ${product.value.name} ajouté(e) à votre panier.`;
  showToast.value = true;

  // Ouvrir la barre latérale du panier après un court délai // MODIFIED
  setTimeout(() => {
    cartStore.toggleCart();
  }, 1000);
};

const addRelatedToCart = (item) => {
  const itemToAdd = {
    id: item.id,
    name: item.name,
    slug: item.slug,
    price: item.promoPrice || item.price,
    image: item.image,
    quantity: 1
  };

  cartStore.addItem(itemToAdd);

  // Afficher le toast de succès // MODIFIED
  // MODIFIED
  toastType.value = 'success';
  toastTitle.value = 'Ajouté au Panier';
  toastMessage.value = `${item.name} ajouté(e) à votre panier.`;
  showToast.value = true;

  // Ouvrir la barre latérale du panier après un court délai // MODIFIED
  setTimeout(() => {
    cartStore.toggleCart();
  }, 1000);
};

const getProductImageUrl = (item) => {
  // Assuming product images structure
  return `${$pb.baseUrl}/api/files/${item.collectionId}/${item.id}/${item.image}`;
};

const getAvatarUrl = (user) => {
  if (!user || !user.avatar) return null;
  // Assuming user avatars structure
  return `${$pb.baseUrl}/api/files/${user.collectionId}/${user.id}/${user.avatar}`;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  // MODIFIED: Locale for date formatting
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

// Surveiller les changements de route pour recharger les données du produit // MODIFIED
watch(() => route.params.slug, async (newSlug) => {
  if (newSlug) {
    await fetchProduct();
  }
});

// Récupérer les données au montage du composant // MODIFIED
onMounted(async () => {
  await fetchProduct();
});
</script>