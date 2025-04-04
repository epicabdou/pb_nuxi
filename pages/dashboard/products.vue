<template>
  <div class="min-h-screen bg-background-100 dark:bg-background-900">
    <AdminLayout>
      <template #header>
        <div class="flex justify-between items-center">
          <h1 class="heading-3">Gestion des Produits</h1>
          <button
              @click="openProductModal()"
              class="btn-primary btn-icon-text"
          >
            <PlusIcon class="w-5 h-5" />
            <span>Ajouter un Produit</span>
          </button>
        </div>
      </template>

      <div v-if="isLoading" class="flex justify-center items-center py-20">
        <div class="flex flex-col items-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p class="mt-4 text-background-700 dark:text-background-300">Chargement des produits...</p>
        </div>
      </div>

      <div v-else-if="error" class="bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg p-4 my-6">
        <div class="flex">
          <AlertCircleIcon class="h-5 w-5 text-error-500 mr-3" />
          <p class="text-error-700 dark:text-error-400">{{ error }}</p>
        </div>
      </div>

      <div v-else-if="products.length === 0" class="bg-white dark:bg-background-800 rounded-xl p-8 shadow-soft text-center my-8">
        <PackageIcon class="h-16 w-16 text-background-400 mx-auto mb-4" />
        <h3 class="heading-4 mb-2">Aucun produit pour l'instant</h3>
        <p class="text-background-600 dark:text-background-400 mb-6">Commencez par ajouter votre premier produit</p>
        <button
            @click="openProductModal()"
            class="btn-primary"
        >
          Ajouter Votre Premier Produit </button>
      </div>

      <div v-else>
        <div class="bg-white dark:bg-background-800 rounded-xl p-4 shadow-soft mb-6">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1">
              <div class="input-group">
                <SearchIcon class="absolute left-3 top-3 h-5 w-5 text-background-500" />
                <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Rechercher des produits..." class="input-primary input-icon"
                />
              </div>
            </div>
            <div class="flex gap-4">
              <select v-model="categoryFilter" class="select">
                <option value="">Toutes les Catégories</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
              <select v-model="sortBy" class="select">
                <option value="name_asc">Nom (A-Z)</option>
                <option value="name_desc">Nom (Z-A)</option>
                <option value="price_asc">Prix (Bas-Haut)</option>
                <option value="price_desc">Prix (Haut-Bas)</option>
                <option value="created_desc">Plus Récents</option>
                <option value="created_asc">Plus Anciens</option>
              </select>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-background-800 rounded-xl shadow-soft overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-background-100 dark:bg-background-700 border-b border-background-200 dark:border-background-600">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-background-700 dark:text-background-300 uppercase tracking-wider">
                  Image
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-background-700 dark:text-background-300 uppercase tracking-wider">
                  Nom
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-background-700 dark:text-background-300 uppercase tracking-wider">
                  Prix
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-background-700 dark:text-background-300 uppercase tracking-wider">
                  Stock
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-background-700 dark:text-background-300 uppercase tracking-wider">
                  Catégories
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-background-700 dark:text-background-300 uppercase tracking-wider">
                  Statut
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-background-700 dark:text-background-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
              </thead>
              <tbody class="divide-y divide-background-200 dark:divide-background-700">
              <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-background-50 dark:hover:bg-background-800/70">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="h-12 w-12 rounded-md overflow-hidden bg-background-200 dark:bg-background-700">
                    <img
                        v-if="product.imageUrl"
                        :src="product.imageUrl"
                        :alt="product.name"
                        class="h-full w-full object-cover"
                    />
                    <div v-else class="h-full w-full flex items-center justify-center">
                      <ImageIcon class="h-6 w-6 text-background-400" />
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="font-medium text-background-900 dark:text-white">{{ product.name }}</div>
                  <div class="text-sm text-background-500">{{ product.slug }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-background-900 dark:text-white">{{ product.price.toFixed(2) }} €</div>
                  <div v-if="product.promoPrice" class="text-sm text-success-600 dark:text-success-400">
                    Promo : {{ product.promoPrice.toFixed(2) }} €
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span
                        :class="{
                        'text-error-600 dark:text-error-400': product.stock === 0,
                        'text-warning-600 dark:text-warning-400': product.stock > 0 && product.stock < 10,
                        'text-success-600 dark:text-success-400': product.stock >= 10
                      }"
                    >
                      {{ product.stock ?? 'Illimité' }}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex flex-wrap gap-2">
                      <span
                          v-for="categoryId in product.category"
                          :key="categoryId"
                          class="badge-outline-primary text-xs"
                      >
                        {{ getCategoryName(categoryId) }}
                      </span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span
                        class="badge"
                        :class="{
                        'bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-400': product.isFeatured,
                        'bg-background-100 text-background-800 dark:bg-background-800 dark:text-background-400': !product.isFeatured
                      }"
                    >
                      {{ product.isFeatured ? 'En Vedette' : 'Standard' }}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex space-x-2">
                    <button
                        @click="openProductModal(product)"
                        class="p-1.5 rounded-lg text-background-600 hover:text-background-900 dark:text-background-400 dark:hover:text-background-100 hover:bg-background-200 dark:hover:bg-background-700"
                    >
                      <PencilIcon class="h-4 w-4" />
                    </button>
                    <button
                        @click="confirmDeleteProduct(product)"
                        class="p-1.5 rounded-lg text-background-600 hover:text-error-600 dark:text-background-400 dark:hover:text-error-400 hover:bg-background-200 dark:hover:bg-background-700"
                    >
                      <TrashIcon class="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>

          <div class="px-6 py-4 bg-background-50 dark:bg-background-800/70 border-t border-background-200 dark:border-background-700 flex justify-between items-center">
            <div class="text-sm text-background-600 dark:text-background-400">
              Affichage de {{ Math.min(1, filteredProducts.length) }} à {{ filteredProducts.length }} sur {{ filteredProducts.length }} produits
            </div>
            <div class="flex space-x-2">
              <button
                  class="btn-ghost btn-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  :disabled="currentPage === 1"
                  @click="currentPage--"
              >
                Précédent </button>
              <button
                  v-for="page in totalPages"
                  :key="page"
                  @click="currentPage = page"
                  class="px-3 py-1 rounded-md"
                  :class="{
                  'bg-primary-500 text-white': currentPage === page,
                  'hover:bg-background-200 dark:hover:bg-background-700': currentPage !== page
                }"
              >
                {{ page }}
              </button>
              <button
                  class="btn-ghost btn-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  :disabled="currentPage === totalPages"
                  @click="currentPage++"
              >
                Suivant </button>
            </div>
          </div>
        </div>
      </div>

      <transition name="fade">
        <div
            v-if="showProductModal"
            class="fixed inset-0 bg-background-900/80 dark:bg-background-950/80 backdrop-blur-sm z-50 flex justify-center items-center p-4"
        >
          <div
              class="bg-white dark:bg-background-800 rounded-2xl shadow-elevated w-full max-w-3xl max-h-[90vh] overflow-auto animate-slide-up"
              @click.stop
          >
            <div class="p-6 border-b border-background-200 dark:border-background-700 flex justify-between items-center">
              <h2 class="heading-4">{{ editingProduct.id ? 'Modifier le Produit' : 'Ajouter un Nouveau Produit' }}</h2>
              <button @click="showProductModal = false" class="p-1.5 rounded-lg hover:bg-background-200 dark:hover:bg-background-700">
                <XIcon class="h-5 w-5 text-background-600 dark:text-background-400" />
              </button>
            </div>

            <form @submit.prevent="saveProduct" class="p-6 space-y-6">
              <div class="space-y-4">
                <h3 class="heading-5 text-background-800 dark:text-background-200">Informations de Base</h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="name" class="input-label">Nom du Produit*</label>
                    <input
                        id="name"
                        v-model="editingProduct.name"
                        type="text"
                        required
                        class="input-primary"
                        placeholder="Entrez le nom du produit" />
                  </div>
                  <div>
                    <label for="slug" class="input-label">Slug*</label>
                    <input
                        id="slug"
                        v-model="editingProduct.slug"
                        type="text"
                        required
                        class="input-primary"
                        placeholder="slug-produit" />
                    <p class="input-help">Doit être unique, utilisé dans l'URL</p>
                  </div>
                </div>

                <div>
                  <label for="shortDescription" class="input-label">Description Courte*</label>
                  <textarea
                      id="shortDescription"
                      v-model="editingProduct.shortDescription"
                      rows="2"
                      required
                      class="input-primary"
                      placeholder="Brève description du produit" ></textarea>
                </div>

                <div>
                  <label for="longDescription" class="input-label">Description Longue</label>
                  <textarea
                      id="longDescription"
                      v-model="editingProduct.longDescription"
                      rows="4"
                      class="input-primary"
                      placeholder="Description détaillée du produit" ></textarea>
                </div>
              </div>

              <div class="space-y-4 pt-2">
                <h3 class="heading-5 text-background-800 dark:text-background-200">Tarification & Inventaire</h3>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label for="price" class="input-label">Prix*</label>
                    <div class="input-group">
                      <span class="absolute left-3 top-3 text-background-600 dark:text-background-400">€</span>
                      <input
                          id="price"
                          v-model.number="editingProduct.price"
                          type="number"
                          step="0.01"
                          min="0"
                          required
                          class="input-primary pl-8"
                          placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div>
                    <label for="promoPrice" class="input-label">Prix Promotionnel</label>
                    <div class="input-group">
                      <span class="absolute left-3 top-3 text-background-600 dark:text-background-400">€</span>
                      <input
                          id="promoPrice"
                          v-model.number="editingProduct.promoPrice"
                          type="number"
                          step="0.01"
                          min="0"
                          class="input-primary pl-8"
                          placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div>
                    <label for="stock" class="input-label">Stock</label>
                    <input
                        id="stock"
                        v-model.number="editingProduct.stock"
                        type="number"
                        min="0"
                        class="input-primary"
                        placeholder="Laisser vide pour illimité" />
                  </div>
                </div>

                <div class="flex items-center">
                  <input
                      id="isFeatured"
                      v-model="editingProduct.isFeatured"
                      type="checkbox"
                      class="checkbox"
                  />
                  <label for="isFeatured" class="ml-2 text-background-700 dark:text-background-300">
                    Produit en Vedette
                  </label>
                </div>
              </div>

              <div class="space-y-4 pt-2">
                <h3 class="heading-5 text-background-800 dark:text-background-200">Catégories & Étiquettes</h3>

                <div>
                  <label class="input-label">Catégories*</label>
                  <div class="space-y-2">
                    <div v-if="categories.length === 0" class="text-sm text-background-600 dark:text-background-400">
                      Aucune catégorie disponible. Veuillez d'abord créer des catégories.
                    </div>
                    <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-2">
                      <div v-for="category in categories" :key="category.id" class="flex items-center">
                        <input
                            :id="`category-${category.id}`"
                            v-model="editingProduct.category"
                            :value="category.id"
                            type="checkbox"
                            class="checkbox"
                        />
                        <label :for="`category-${category.id}`" class="ml-2 text-background-700 dark:text-background-300">
                          {{ category.name }}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label class="input-label">Étiquettes*</label>
                  <div class="space-y-2">
                    <div v-if="tags.length === 0" class="text-sm text-background-600 dark:text-background-400">
                      Aucune étiquette disponible. Veuillez d'abord créer des étiquettes.
                    </div>
                    <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-2">
                      <div v-for="tag in tags" :key="tag.id" class="flex items-center">
                        <input
                            :id="`tag-${tag.id}`"
                            v-model="editingProduct.tags"
                            :value="tag.id"
                            type="checkbox"
                            class="checkbox"
                        />
                        <label :for="`tag-${tag.id}`" class="ml-2 text-background-700 dark:text-background-300">
                          {{ tag.name }}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="space-y-4 pt-2">
                <h3 class="heading-5 text-background-800 dark:text-background-200">Images</h3>

                <div>
                  <label class="input-label">Image Principale*</label>
                  <div class="border border-dashed border-background-300 dark:border-background-600 rounded-lg p-4">
                    <div v-if="mainImagePreview" class="mb-4">
                      <img :src="mainImagePreview" alt="Aperçu image principale" class="h-40 object-contain mx-auto" />
                    </div>
                    <div class="flex justify-center">
                      <label class="btn-secondary cursor-pointer">
                        <span>{{ mainImagePreview ? 'Changer l\'Image' : 'Sélectionner une Image' }}</span>
                        <input
                            type="file"
                            accept="image/*"
                            class="hidden"
                            @change="handleMainImageUpload"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label class="input-label">Images de Galerie*</label>
                  <div class="border border-dashed border-background-300 dark:border-background-600 rounded-lg p-4">
                    <div v-if="galleryPreviews.length > 0" class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div v-for="(preview, index) in galleryPreviews" :key="index" class="relative">
                        <img :src="preview" alt="Aperçu image galerie" class="h-24 w-full object-cover rounded-lg" />
                        <button
                            type="button"
                            @click="removeGalleryImage(index)"
                            class="absolute top-1 right-1 bg-error-500 text-white rounded-full p-1 hover:bg-error-600"
                        >
                          <XIcon class="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <div class="flex justify-center">
                      <label class="btn-secondary cursor-pointer">
                        <span>Ajouter des Images de Galerie</span>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            class="hidden"
                            @change="handleGalleryUpload"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex justify-end space-x-3 pt-4 border-t border-background-200 dark:border-background-700">
                <button
                    type="button"
                    @click="showProductModal = false"
                    class="btn-secondary"
                >
                  Annuler </button>
                <button
                    type="submit"
                    class="btn-primary"
                    :disabled="isSaving"
                >
                  <span v-if="isSaving">
                    <LoaderIcon class="animate-spin h-4 w-4 mr-2" />
                    Enregistrement... </span>
                  <span v-else>
                     {{ editingProduct.id ? 'Mettre à Jour' : 'Créer' }}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </transition>

      <transition name="fade">
        <div
            v-if="showDeleteModal"
            class="fixed inset-0 bg-background-900/80 dark:bg-background-950/80 backdrop-blur-sm z-50 flex justify-center items-center p-4"
        >
          <div
              class="bg-white dark:bg-background-800 rounded-2xl shadow-elevated w-full max-w-md animate-slide-up"
              @click.stop
          >
            <div class="p-6 flex flex-col items-center text-center">
              <div class="bg-error-100 dark:bg-error-900/20 p-3 rounded-full mb-4">
                <AlertTriangleIcon class="h-8 w-8 text-error-500" />
              </div>
              <h2 class="heading-4 mb-2">Supprimer le Produit</h2>
              <p class="text-background-600 dark:text-background-400 mb-6">
                Êtes-vous sûr de vouloir supprimer <span class="font-semibold text-background-800 dark:text-background-200">{{ productToDelete?.name }}</span> ? Cette action est irréversible.
              </p>
              <div class="flex gap-3 w-full">
                <button
                    @click="showDeleteModal = false"
                    class="btn-secondary flex-1"
                >
                  Annuler </button>
                <button
                    @click="deleteProduct"
                    class="btn-primary bg-error-500 hover:bg-error-600 focus:ring-error-500 flex-1"
                    :disabled="isDeleting"
                >
                  <span v-if="isDeleting">
                    <LoaderIcon class="animate-spin h-4 w-4 mr-2" />
                    Suppression... </span>
                  <span v-else>Supprimer</span> </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </AdminLayout>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, defineComponent, h } from 'vue';
import { useNuxtApp } from 'nuxt/app';

// Placeholder AdminLayout - replace with your actual layout if needed
// MODIFIED Placeholder component description
// Vous pourriez avoir besoin de créer ce composant layout
// Ceci est un placeholder que vous pouvez personnaliser ou remplacer par votre layout admin réel
const AdminLayout = defineComponent({
  setup(_, { slots }) {
    return () => h('div', {}, [
      h('div', { class: 'p-6' }, slots.header?.()),
      h('div', { class: 'p-6' }, slots.default?.())
    ]);
  }
});
import {
  PlusIcon,
  SearchIcon,
  PencilIcon,
  TrashIcon,
  XIcon,
  ImageIcon,
  AlertCircleIcon,
  AlertTriangleIcon,
  LoaderIcon,
  PackageIcon
} from 'lucide-vue-next';

definePageMeta({
  layout: 'dashboard'
});

// Obtenir le client PocketBase // MODIFIED
const { $pb } = useNuxtApp();

// État de la liste de produits // MODIFIED
const products = ref([]);
const categories = ref([]);
const tags = ref([]);
const isLoading = ref(true);
const error = ref(null);

// État de recherche et de filtre // MODIFIED
const searchQuery = ref('');
const categoryFilter = ref('');
const sortBy = ref('name_asc');
const currentPage = ref(1);
const itemsPerPage = 10;

// État de la modale // MODIFIED
const showProductModal = ref(false);
const showDeleteModal = ref(false);
const editingProduct = ref({
  name: '',
  slug: '',
  shortDescription: '',
  longDescription: '',
  price: 0,
  promoPrice: null,
  stock: null,
  isFeatured: false,
  category: [],
  tags: [],
  image: null,
  gallery: []
});
const productToDelete = ref(null);
const isSaving = ref(false);
const isDeleting = ref(false);

// Fonctions CRUD // MODIFIED
function openProductModal(product = null) {
  if (product) {
    // Modifier un produit existant // MODIFIED
    editingProduct.value = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      shortDescription: product.shortDescription,
      longDescription: product.longDescription,
      price: product.price,
      promoPrice: product.promoPrice,
      stock: product.stock,
      isFeatured: product.isFeatured,
      category: [...product.category],
      tags: [...product.tags],
      // Nous ne copions pas l'image et la galerie ici car elles sont gérées différemment // MODIFIED
    };

    // Définir les aperçus d'images // MODIFIED
    mainImagePreview.value = product.imageUrl;
    galleryPreviews.value = [...product.galleryUrls];
  } else {
    // Créer un nouveau produit // MODIFIED
    editingProduct.value = {
      name: '',
      slug: '',
      shortDescription: '',
      longDescription: '',
      price: 0,
      promoPrice: null,
      stock: null,
      isFeatured: false,
      category: [],
      tags: [],
      image: null,
      gallery: []
    };

    // Effacer les aperçus d'images // MODIFIED
    mainImagePreview.value = null;
    galleryPreviews.value = [];
    mainImageFile.value = null;
    galleryFiles.value = [];
  }

  showProductModal.value = true;
}

function confirmDeleteProduct(product) {
  productToDelete.value = product;
  showDeleteModal.value = true;
}

// État de l'aperçu d'image // MODIFIED
const mainImagePreview = ref(null);
const galleryPreviews = ref([]);
const mainImageFile = ref(null);
const galleryFiles = ref([]);

// Fonctions de gestion des images // MODIFIED
function handleMainImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  mainImageFile.value = file;
  mainImagePreview.value = URL.createObjectURL(file);
}

function handleGalleryUpload(event) {
  const files = Array.from(event.target.files);
  if (!files.length) return;

  // Ajouter aux fichiers existants // MODIFIED
  galleryFiles.value = [...galleryFiles.value, ...files];

  // Créer et ajouter les aperçus // MODIFIED
  const newPreviews = files.map(file => URL.createObjectURL(file));
  galleryPreviews.value = [...galleryPreviews.value, ...newPreviews];
}

function removeGalleryImage(index) {
  // Nous devons gérer différemment les images existantes et les nouveaux téléversements // MODIFIED
  if (index < galleryPreviews.value.length) {
    galleryPreviews.value.splice(index, 1);
  }

  if (index < galleryFiles.value.length) {
    galleryFiles.value.splice(index, 1);
  }
}

// Charger les données // MODIFIED
onMounted(async () => {
  try {
    isLoading.value = true;
    await Promise.all([
      loadProducts(),
      loadCategories(),
      loadTags()
    ]);
  } catch (err) {
    // MODIFIED
    console.error('Erreur lors du chargement des données initiales :', err);
    // MODIFIED
    error.value = 'Échec du chargement des données. Veuillez essayer de rafraîchir la page.';
  } finally {
    isLoading.value = false;
  }
});

// Propriétés calculées // MODIFIED
const filteredProducts = computed(() => {
  let result = [...products.value];

  // Appliquer le filtre de recherche // MODIFIED
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.shortDescription.toLowerCase().includes(query) ||
        product.slug.toLowerCase().includes(query)
    );
  }

  // Appliquer le filtre de catégorie // MODIFIED
  if (categoryFilter.value) {
    result = result.filter(product =>
        product.category && product.category.includes(categoryFilter.value)
    );
  }

  // Appliquer le tri // MODIFIED
  switch (sortBy.value) {
    case 'name_asc':
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name_desc':
      result.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'price_asc':
      result.sort((a, b) => (a.promoPrice || a.price) - (b.promoPrice || b.price)); // Handle price/promoPrice
      break;
    case 'price_desc':
      result.sort((a, b) => (b.promoPrice || b.price) - (a.promoPrice || a.price)); // Handle price/promoPrice
      break;
    case 'created_desc':
      result.sort((a, b) => new Date(b.created) - new Date(a.created));
      break;
    case 'created_asc':
      result.sort((a, b) => new Date(a.created) - new Date(b.created));
      break;
  }

  return result;
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredProducts.value.slice(start, start + itemsPerPage);
});

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage) || 1;
});

// Helpers // MODIFIED
function getCategoryName(categoryId) {
  const category = categories.value.find(c => c.id === categoryId);
  // MODIFIED Fallback
  return category ? category.name : 'Inconnue';
}

// Surveiller les changements dans les produits filtrés pour réinitialiser la page si nécessaire // MODIFIED
watch(filteredProducts, () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = 1;
  }
});

// Surveiller la génération de slug // MODIFIED
watch(() => editingProduct.value.name, (newName) => {
  if (newName && !editingProduct.value.id) {
    editingProduct.value.slug = newName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
  }
});

// Fonctions de chargement de données // MODIFIED
async function loadProducts() {
  try {
    const records = await $pb.collection('products').getList(1, 100, {
      expand: 'category,tags'
    });

    products.value = records.items.map(item => {
      // Ajouter les URLs des images // MODIFIED
      const imageUrl = item.image ? $pb.files.getUrl(item, item.image) : null;
      const galleryUrls = item.gallery ? item.gallery.map(img => $pb.files.getUrl(item, img)) : [];

      return {
        ...item,
        imageUrl,
        galleryUrls
      };
    });
  } catch (err) {
    // MODIFIED
    console.error('Erreur lors du chargement des produits :', err);
    // MODIFIED
    throw new Error('Échec du chargement des produits');
  }
}

async function loadCategories() {
  try {
    const records = await $pb.collection('categories').getList(1, 100);
    categories.value = records.items;
  } catch (err) {
    // MODIFIED
    console.error('Erreur lors du chargement des catégories :', err);
    // MODIFIED
    throw new Error('Échec du chargement des catégories');
  }
}

async function loadTags() {
  try {
    const records = await $pb.collection('tags').getList(1, 100);
    tags.value = records.items;
  } catch (err) {
    // MODIFIED
    console.error('Erreur lors du chargement des étiquettes :', err);
    // MODIFIED
    throw new Error('Échec du chargement des étiquettes');
  }
}

async function saveProduct() {
  isSaving.value = true;

  try {
    const formData = new FormData();

    // Ajouter les informations de base du produit // MODIFIED
    formData.append('name', editingProduct.value.name);
    formData.append('slug', editingProduct.value.slug);
    formData.append('shortDescription', editingProduct.value.shortDescription);
    formData.append('longDescription', editingProduct.value.longDescription || '');
    formData.append('price', editingProduct.value.price);

    if (editingProduct.value.promoPrice !== null) {
      formData.append('promoPrice', editingProduct.value.promoPrice);
    }

    if (editingProduct.value.stock !== null) {
      formData.append('stock', editingProduct.value.stock);
    }

    formData.append('isFeatured', editingProduct.value.isFeatured);

    // Ajouter catégorie et étiquettes (PocketBase attend des chaînes JSON pour les tableaux) // MODIFIED
    formData.append('category', JSON.stringify(editingProduct.value.category));
    formData.append('tags', JSON.stringify(editingProduct.value.tags));

    // Ajouter les images // MODIFIED
    if (mainImageFile.value) {
      formData.append('image', mainImageFile.value);
    }

    // Ajouter les images de galerie // MODIFIED
    if (galleryFiles.value.length > 0) {
      galleryFiles.value.forEach(file => {
        formData.append('gallery', file);
      });
    }

    let savedProduct;

    if (editingProduct.value.id) {
      // Mettre à jour le produit existant // MODIFIED
      savedProduct = await $pb.collection('products').update(
          editingProduct.value.id,
          formData
      );
    } else {
      // Créer un nouveau produit // MODIFIED
      savedProduct = await $pb.collection('products').create(formData);
    }

    // Rafraîchir la liste des produits // MODIFIED
    await loadProducts();

    // Fermer la modale // MODIFIED
    showProductModal.value = false;

    // Afficher le message de succès // MODIFIED
    alert(editingProduct.value.id ? 'Produit mis à jour avec succès !' : 'Produit créé avec succès !');

  } catch (err) {
    // MODIFIED
    console.error('Erreur lors de l\'enregistrement du produit :', err);
    // MODIFIED
    alert(`Erreur: ${err.message}`);
  } finally {
    isSaving.value = false;
  }
}

async function deleteProduct() {
  if (!productToDelete.value) return;

  isDeleting.value = true;

  try {
    await $pb.collection('products').delete(productToDelete.value.id);

    // Retirer de l'état local // MODIFIED
    products.value = products.value.filter(p => p.id !== productToDelete.value.id);

    // Fermer la modale // MODIFIED
    showDeleteModal.value = false;
    productToDelete.value = null;

    // Afficher le message de succès // MODIFIED
    alert('Produit supprimé avec succès !');
  } catch (err) {
    // MODIFIED
    console.error('Erreur lors de la suppression du produit :', err);
    // MODIFIED
    alert(`Erreur: ${err.message}`);
  } finally {
    isDeleting.value = false;
  }
}
</script>