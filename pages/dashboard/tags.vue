<template>
  <div class="responsive-container section-padding">
    <div class="flex justify-between items-center mb-8">
      <h1 class="heading-2">Gestion des Étiquettes</h1>
      <button @click="openTagModal()" class="btn-primary">
        <span class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Ajouter une Nouvelle Étiquette
        </span>
      </button>
    </div>

    <div class="card-flat mb-6 p-4">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-grow">
          <input
              v-model="searchQuery"
              type="text"
              placeholder="Rechercher des étiquettes..." class="input-primary w-full"
          >
        </div>
        <div class="flex justify-end items-center gap-2">
          <span class="text-sm text-background-600 dark:text-background-400">
            {{ filteredTags.length }} étiquette{{ filteredTags.length !== 1 ? 's' : '' }}
          </span>
          <button @click="fetchTags" class="btn-ghost px-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>

    <div v-else-if="!tags || tags.length === 0" class="card-flat flex flex-col items-center py-16">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-background-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
      <h3 class="heading-4 mb-2">Aucune Étiquette Trouvée</h3>
      <p class="body-regular text-background-600 dark:text-background-400 mb-6">
        Les étiquettes aident à organiser vos produits et à améliorer la recherche.
      </p>
      <button @click="openTagModal()" class="btn-primary">
        <span class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Créez Votre Première Étiquette
        </span>
      </button>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
          v-for="tag in filteredTags"
          :key="tag.id"
          class="card-flat hover:shadow-md transition-shadow duration-200"
      >
        <div class="flex items-center mb-3">
          <div
              class="w-4 h-4 rounded-full mr-3"
              :style="{ backgroundColor: getTagColor(tag.name) }"
          ></div>
          <h3 class="heading-5 truncate flex-grow">{{ tag.name }}</h3>
          <div class="dropdown relative ml-2">
            <button class="btn-ghost px-2 py-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
            <div class="dropdown-menu hidden absolute right-0 mt-2 w-48 bg-white dark:bg-background-800 rounded-lg shadow-lg z-10 border border-background-300 dark:border-background-700">
              <ul class="py-1">
                <li>
                  <button @click="openTagModal(tag)" class="flex items-center w-full px-4 py-2 text-sm text-left text-background-700 dark:text-background-300 hover:bg-background-100 dark:hover:bg-background-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Modifier </button>
                </li>
                <li>
                  <button @click="confirmDelete(tag)" class="flex items-center w-full px-4 py-2 text-sm text-left text-error-600 hover:bg-background-100 dark:hover:bg-background-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Supprimer </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p class="text-sm text-background-600 dark:text-background-400 mb-3">
          <span class="inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {{ tag.slug }}
          </span>
        </p>

        <div class="flex justify-between items-center pt-3 border-t border-background-300 dark:border-background-700">
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-background-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span class="text-sm text-background-600 dark:text-background-400">
              {{ tag.productCount || 0 }} produit{{ (tag.productCount !== 1) ? 's' : '' }}
            </span>
          </div>
          <div class="text-sm text-background-500">
            {{ formatDate(tag.created) }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="showTagModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-background-900 bg-opacity-75 transition-opacity" aria-hidden="true" @click="closeTagModal"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white dark:bg-background-800 rounded-xl text-left overflow-hidden shadow-modern transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form @submit.prevent="saveTag">
            <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 class="heading-3 mb-6">{{ isEditMode ? 'Modifier l\'Étiquette' : 'Créer une Nouvelle Étiquette' }}</h3>

              <div class="grid grid-cols-1 gap-6">
                <div
                    class="p-4 rounded-lg border border-background-300 dark:border-background-700 flex items-center"
                    :style="{ backgroundColor: tagPreviewBg }"
                >
                  <div
                      class="w-4 h-4 rounded-full mr-3"
                      :style="{ backgroundColor: getTagColor(currentTag.name || 'Nouvelle Étiquette') }"
                  ></div>
                  <span class="font-medium">{{ currentTag.name || 'Aperçu de l\'Étiquette' }}</span>
                </div>

                <div>
                  <label for="name" class="input-label">Nom de l'Étiquette</label>
                  <input
                      id="name"
                      v-model="currentTag.name"
                      type="text"
                      class="input-primary"
                      placeholder="ex. Soldes Été, En Vedette, Édition Limitée" required
                      autofocus
                  >
                </div>

                <div>
                  <div class="flex justify-between">
                    <label for="slug" class="input-label">Slug</label>
                    <button
                        type="button"
                        @click="toggleSlugGeneration"
                        class="text-xs text-primary-500 hover:text-primary-600"
                    >
                      {{ slugGeneratedAuto ? 'Modifier manuellement' : 'Générer auto.' }}
                    </button>
                  </div>
                  <input
                      id="slug"
                      v-model="currentTag.slug"
                      type="text"
                      class="input-primary"
                      :disabled="slugGeneratedAuto"
                      placeholder="ex. soldes-ete" required
                  >
                  <p v-if="slugGeneratedAuto" class="text-xs text-background-500 mt-1">
                    Généré automatiquement à partir du nom de l'étiquette
                  </p>
                </div>
              </div>
            </div>

            <div class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-background-300 dark:border-background-700">
              <button
                  type="submit"
                  class="btn-primary sm:ml-3"
                  :disabled="isSaving"
              >
                <span v-if="isSaving" class="inline-block animate-spin mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </span>
                {{ isEditMode ? 'Mettre à Jour' : 'Créer' }}
              </button>
              <button type="button" @click="closeTagModal" class="btn-secondary mt-3 sm:mt-0">
                Annuler </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div v-if="showDeleteModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-background-900 bg-opacity-75 transition-opacity" aria-hidden="true" @click="showDeleteModal = false"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white dark:bg-background-800 rounded-xl text-left overflow-hidden shadow-modern transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white dark:bg-background-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-error-100 dark:bg-error-900 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-error-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="heading-4" id="modal-title">Supprimer l'Étiquette</h3>
                <div class="mt-2">
                  <p v-if="hasRelatedProducts" class="text-error-500 mb-4 p-3 bg-error-100 dark:bg-error-900 rounded-lg">
                    <strong>Attention :</strong> Cette étiquette est utilisée par {{ tagProductCount }} produit{{ tagProductCount !== 1 ? 's' : '' }}. Sa suppression la retirera de ces produits.
                  </p>
                  <p class="body-regular text-background-600 dark:text-background-400">
                    Êtes-vous sûr de vouloir supprimer l'étiquette "<strong>{{ tagToDelete?.name }}</strong>" ?
                    <br><br>
                    Cette action est irréversible.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-background-100 dark:bg-background-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
                @click="deleteTag"
                type="button"
                class="btn-primary bg-error-600 hover:bg-error-700 focus:ring-error-500 sm:ml-3"
                :disabled="isDeleting"
            >
              <span v-if="isDeleting" class="inline-block animate-spin mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </span>
              Oui, Supprimer
            </button>
            <button @click="showDeleteModal = false" type="button" class="btn-secondary mt-3 sm:mt-0">
              Annuler </button>
          </div>
        </div>
      </div>
    </div>

    <div
        v-if="showToast"
        class="fixed bottom-6 right-6 max-w-md p-4 rounded-xl shadow-elevated transition-all flex items-center"
        :class="{
        'bg-success-500 text-white': toastType === 'success',
        'bg-error-500 text-white': toastType === 'error',
        'bg-primary-500 text-white': toastType === 'info'
      }"
    >
      <svg v-if="toastType === 'success'" class="h-6 w-6 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <svg v-if="toastType === 'error'" class="h-6 w-6 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
      <svg v-if="toastType === 'info'" class="h-6 w-6 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <div>{{ toastMessage }}</div> <button
        @click="showToast = false"
        class="ml-auto pl-3 text-white hover:text-background-100"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import { useNuxtApp } from 'nuxt/app';

// Obtenir l'instance PocketBase // MODIFIED
const { $pb } = useNuxtApp();

definePageMeta({
  layout: 'dashboard'
});

// État // MODIFIED
const isLoading = ref(true);
const isSaving = ref(false);
const isDeleting = ref(false);
const tags = ref([]);
const searchQuery = ref('');
const showTagModal = ref(false);
const showDeleteModal = ref(false);
const isEditMode = ref(false);
const slugGeneratedAuto = ref(true);
const tagToDelete = ref(null);
const hasRelatedProducts = ref(false);
const tagProductCount = ref(0);
const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref('info');
const toastTimeout = ref(null);

// Initialiser avec une étiquette vide // MODIFIED
const currentTag = ref({
  name: '',
  slug: ''
});

// Activer la fonctionnalité de menu déroulant // MODIFIED
const initDropdowns = () => {
  nextTick(() => {
    const dropdownButtons = document.querySelectorAll('.dropdown button');

    dropdownButtons.forEach(button => {
      const menu = button.nextElementSibling;

      // Afficher/Masquer le menu déroulant // MODIFIED
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('hidden');
      });

      // Masquer en cliquant à l'extérieur // MODIFIED
      document.addEventListener('click', () => {
        menu.classList.add('hidden');
      });
    });
  });
};

// Calculé // MODIFIED
const filteredTags = computed(() => {
  if (!searchQuery.value) {
    return tags.value;
  }

  const query = searchQuery.value.toLowerCase();
  return tags.value.filter(tag =>
      tag.name.toLowerCase().includes(query) ||
      tag.slug.toLowerCase().includes(query)
  );
});

const tagPreviewBg = computed(() => {
  // MODIFIED fallback name
  const color = getTagColor(currentTag.value.name || 'Nouvelle Étiquette');
  return color.replace(')', ', 0.1)').replace('rgb', 'rgba');
});

// Surveiller les changements de nom d'étiquette pour générer automatiquement le slug // MODIFIED
watch(() => currentTag.value.name, (newName) => {
  if (slugGeneratedAuto.value && newName) {
    currentTag.value.slug = generateSlug(newName);
  }
});

// Surveiller les changements d'étiquettes filtrées pour réinitialiser les menus déroulants // MODIFIED
watch(filteredTags, () => {
  initDropdowns();
}, { deep: true });

// Méthodes // MODIFIED
const fetchTags = async () => {
  isLoading.value = true;

  try {
    const resultList = await $pb.collection('tags').getFullList({
      sort: 'name'
    });

    // Récupérer les comptes de produits pour chaque étiquette // MODIFIED
    const tagsWithCount = await Promise.all(
        resultList.map(async (tag) => {
          try {
            const productCount = await $pb.collection('products').getList(1, 1, {
              filter: `tags ~ "${tag.id}"`,
            });

            return {
              ...tag,
              productCount: productCount.totalItems
            };
          } catch (error) {
            // MODIFIED
            console.error(`Erreur lors de la récupération des produits pour l'étiquette ${tag.id}:`, error);
            return {
              ...tag,
              productCount: 0
            };
          }
        })
    );

    tags.value = tagsWithCount;

    // Initialiser les menus déroulants après le chargement des étiquettes // MODIFIED
    initDropdowns();
  } catch (error) {
    // MODIFIED
    console.error('Erreur lors de la récupération des étiquettes :', error);
    tags.value = [];
    // MODIFIED
    showToastMessage('Échec du chargement des étiquettes', 'error');
  } finally {
    isLoading.value = false;
  }
};

const generateSlug = (name) => {
  return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Retirer les caractères spéciaux // MODIFIED
      .replace(/\s+/g, '-')     // Remplacer les espaces par des tirets // MODIFIED
      .replace(/-+/g, '-')      // Remplacer les tirets multiples par un seul tiret // MODIFIED
      .trim();
};

const toggleSlugGeneration = () => {
  slugGeneratedAuto.value = !slugGeneratedAuto.value;

  if (slugGeneratedAuto.value && currentTag.value.name) {
    currentTag.value.slug = generateSlug(currentTag.value.name);
  }
};

const formatDate = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);
  // MODIFIED Locale
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('fr-FR', options);
};

const getTagColor = (name) => {
  if (!name) return 'rgb(156, 163, 175)'; // Gris par défaut // MODIFIED

  // Générer une couleur déterministe basée sur le nom de l'étiquette // MODIFIED
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const h = Math.abs(hash) % 360;
  // Couleurs plus vives avec saturation et luminosité plus élevées // MODIFIED
  return `hsl(${h}, 65%, 55%)`;
};

const openTagModal = (tag = null) => {
  if (tag) {
    // Mode édition // MODIFIED
    isEditMode.value = true;
    currentTag.value = { ...tag };
    slugGeneratedAuto.value = false; // Ne pas générer automatiquement le slug en mode édition // MODIFIED
  } else {
    // Mode création // MODIFIED
    isEditMode.value = false;
    currentTag.value = {
      name: '',
      slug: ''
    };
    slugGeneratedAuto.value = true;
  }

  showTagModal.value = true;
};

const closeTagModal = () => {
  // Confirmer seulement s'il y a des modifications non enregistrées // MODIFIED
  if (
      (isEditMode.value && (
          currentTag.value.name !== tagToDelete?.name ||
          currentTag.value.slug !== tagToDelete?.slug
      )) ||
      (!isEditMode.value && (
          currentTag.value.name ||
          currentTag.value.slug
      ))
  ) {
    // MODIFIED Confirmation message
    if (confirm('Abandonner les modifications non enregistrées ?')) {
      showTagModal.value = false;
    }
  } else {
    showTagModal.value = false;
  }
};

const saveTag = async () => {
  isSaving.value = true;

  try {
    if (isEditMode.value) {
      // Mettre à jour l'étiquette existante // MODIFIED
      await $pb.collection('tags').update(currentTag.value.id, currentTag.value);
      // MODIFIED
      showToastMessage('Étiquette mise à jour avec succès', 'success');
    } else {
      // Créer une nouvelle étiquette // MODIFIED
      await $pb.collection('tags').create(currentTag.value);
      // MODIFIED
      showToastMessage('Étiquette créée avec succès', 'success');
    }

    // Rafraîchir la liste des étiquettes // MODIFIED
    fetchTags();
    showTagModal.value = false;

  } catch (error) {
    // MODIFIED
    console.error('Erreur lors de l\'enregistrement de l\'étiquette :', error);

    // Vérifier l'erreur de slug dupliqué // MODIFIED
    if (error.response?.data?.data?.slug?.code === 'validation_not_unique') {
      // MODIFIED
      showToastMessage('Une étiquette avec ce slug existe déjà', 'error');
    } else {
      // MODIFIED
      showToastMessage(
          error.message || 'Échec de l\'enregistrement de l\'étiquette. Veuillez réessayer.',
          'error'
      );
    }
  } finally {
    isSaving.value = false;
  }
};

const confirmDelete = async (tag) => {
  tagToDelete.value = tag;

  // Vérifier si l'étiquette a des produits associés // MODIFIED
  try {
    const productCount = await $pb.collection('products').getList(1, 1, {
      filter: `tags ~ "${tag.id}"`,
    });

    hasRelatedProducts.value = productCount.totalItems > 0;
    tagProductCount.value = productCount.totalItems;
  } catch (error) {
    // MODIFIED
    console.error('Erreur lors de la vérification des produits associés :', error);
    hasRelatedProducts.value = false;
    tagProductCount.value = 0;
  }

  showDeleteModal.value = true;
};

const deleteTag = async () => {
  isDeleting.value = true;

  try {
    await $pb.collection('tags').delete(tagToDelete.value.id);
    // MODIFIED
    showToastMessage('Étiquette supprimée avec succès', 'success');

    // Rafraîchir la liste des étiquettes // MODIFIED
    fetchTags();
    showDeleteModal.value = false;
    tagToDelete.value = null;
  } catch (error) {
    // MODIFIED
    console.error('Erreur lors de la suppression de l\'étiquette :', error);
    // MODIFIED
    showToastMessage(
        error.message || 'Échec de la suppression de l\'étiquette. Veuillez réessayer.',
        'error'
    );
  } finally {
    isDeleting.value = false;
  }
};

const showToastMessage = (message, type = 'info') => {
  // Effacer tout timeout existant // MODIFIED
  if (toastTimeout.value) {
    clearTimeout(toastTimeout.value);
  }

  // Définir les propriétés du toast // MODIFIED
  toastMessage.value = message;
  toastType.value = type;
  showToast.value = true;

  // Masquer le toast après 5 secondes // MODIFIED
  toastTimeout.value = setTimeout(() => {
    showToast.value = false;
  }, 5000);
};

// Initialiser les données au montage du composant // MODIFIED
onMounted(async () => {
  try {
    await fetchTags();
  } catch (error) {
    // MODIFIED
    console.error('Erreur lors de l\'initialisation du composant :', error);
    // MODIFIED
    showToastMessage('Échec du chargement des données', 'error');
  } finally {
    isLoading.value = false;
  }
});
</script>