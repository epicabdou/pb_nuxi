<template>
  <div class="responsive-container section-padding">
    <div class="flex justify-between items-center mb-8">
      <h1 class="heading-2">Tags Management</h1>
      <button @click="openTagModal()" class="btn-primary">
        <span class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add New Tag
        </span>
      </button>
    </div>

    <!-- Filter/Search Bar -->
    <div class="card-flat mb-6 p-4">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-grow">
          <input
              v-model="searchQuery"
              type="text"
              placeholder="Search tags..."
              class="input-primary w-full"
          >
        </div>
        <div class="flex justify-end items-center gap-2">
          <span class="text-sm text-background-600 dark:text-background-400">
            {{ filteredTags.length }} tag{{ filteredTags.length !== 1 ? 's' : '' }}
          </span>
          <button @click="fetchTags" class="btn-ghost px-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!tags || tags.length === 0" class="card-flat flex flex-col items-center py-16">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-background-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
      <h3 class="heading-4 mb-2">No Tags Found</h3>
      <p class="body-regular text-background-600 dark:text-background-400 mb-6">
        Tags help organize your products and improve search functionality.
      </p>
      <button @click="openTagModal()" class="btn-primary">
        <span class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Create Your First Tag
        </span>
      </button>
    </div>

    <!-- Main Content: Tags Grid -->
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
                    Edit
                  </button>
                </li>
                <li>
                  <button @click="confirmDelete(tag)" class="flex items-center w-full px-4 py-2 text-sm text-left text-error-600 hover:bg-background-100 dark:hover:bg-background-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
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
              {{ tag.productCount || 0 }} product{{ (tag.productCount !== 1) ? 's' : '' }}
            </span>
          </div>
          <div class="text-sm text-background-500">
            {{ formatDate(tag.created) }}
          </div>
        </div>
      </div>
    </div>

    <!-- Tag Modal -->
    <div v-if="showTagModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-background-900 bg-opacity-75 transition-opacity" aria-hidden="true" @click="closeTagModal"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white dark:bg-background-800 rounded-xl text-left overflow-hidden shadow-modern transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form @submit.prevent="saveTag">
            <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 class="heading-3 mb-6">{{ isEditMode ? 'Edit Tag' : 'Create New Tag' }}</h3>

              <div class="grid grid-cols-1 gap-6">
                <!-- Tag Preview -->
                <div
                    class="p-4 rounded-lg border border-background-300 dark:border-background-700 flex items-center"
                    :style="{ backgroundColor: tagPreviewBg }"
                >
                  <div
                      class="w-4 h-4 rounded-full mr-3"
                      :style="{ backgroundColor: getTagColor(currentTag.name || 'New Tag') }"
                  ></div>
                  <span class="font-medium">{{ currentTag.name || 'Tag Preview' }}</span>
                </div>

                <!-- Tag Name -->
                <div>
                  <label for="name" class="input-label">Tag Name</label>
                  <input
                      id="name"
                      v-model="currentTag.name"
                      type="text"
                      class="input-primary"
                      placeholder="e.g. Summer Sale, Featured, Limited Edition"
                      required
                      autofocus
                  >
                </div>

                <!-- Slug -->
                <div>
                  <div class="flex justify-between">
                    <label for="slug" class="input-label">Slug</label>
                    <button
                        type="button"
                        @click="toggleSlugGeneration"
                        class="text-xs text-primary-500 hover:text-primary-600"
                    >
                      {{ slugGeneratedAuto ? 'Edit manually' : 'Auto-generate' }}
                    </button>
                  </div>
                  <input
                      id="slug"
                      v-model="currentTag.slug"
                      type="text"
                      class="input-primary"
                      :disabled="slugGeneratedAuto"
                      placeholder="e.g. summer-sale"
                      required
                  >
                  <p v-if="slugGeneratedAuto" class="text-xs text-background-500 mt-1">
                    Automatically generated from the tag name
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
                {{ isEditMode ? 'Update Tag' : 'Create Tag' }}
              </button>
              <button type="button" @click="closeTagModal" class="btn-secondary mt-3 sm:mt-0">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
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
                <h3 class="heading-4" id="modal-title">Delete Tag</h3>
                <div class="mt-2">
                  <p v-if="hasRelatedProducts" class="text-error-500 mb-4 p-3 bg-error-100 dark:bg-error-900 rounded-lg">
                    <strong>Warning:</strong> This tag is used by {{ tagProductCount }} product{{ tagProductCount !== 1 ? 's' : '' }}. Deleting it will remove the tag from these products.
                  </p>
                  <p class="body-regular text-background-600 dark:text-background-400">
                    Are you sure you want to delete the tag "<strong>{{ tagToDelete?.name }}</strong>"?
                    <br><br>
                    This action cannot be undone.
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
              Yes, Delete Tag
            </button>
            <button @click="showDeleteModal = false" type="button" class="btn-secondary mt-3 sm:mt-0">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
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
      <div>{{ toastMessage }}</div>
      <button
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

// Get PocketBase instance
const { $pb } = useNuxtApp();

definePageMeta({
  layout: 'dashboard'
});

// State
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

// Initialize with empty tag
const currentTag = ref({
  name: '',
  slug: ''
});

// Enable dropdown functionality
const initDropdowns = () => {
  nextTick(() => {
    const dropdownButtons = document.querySelectorAll('.dropdown button');

    dropdownButtons.forEach(button => {
      const menu = button.nextElementSibling;

      // Show/hide dropdown menu
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('hidden');
      });

      // Hide when clicking outside
      document.addEventListener('click', () => {
        menu.classList.add('hidden');
      });
    });
  });
};

// Computed
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
  const color = getTagColor(currentTag.value.name || 'New Tag');
  return color.replace(')', ', 0.1)').replace('rgb', 'rgba');
});

// Watch for tag name changes to auto-generate slug
watch(() => currentTag.value.name, (newName) => {
  if (slugGeneratedAuto.value && newName) {
    currentTag.value.slug = generateSlug(newName);
  }
});

// Watch for filtered tags changes to reinitialize dropdowns
watch(filteredTags, () => {
  initDropdowns();
}, { deep: true });

// Methods
const fetchTags = async () => {
  isLoading.value = true;

  try {
    const resultList = await $pb.collection('tags').getFullList({
      sort: 'name'
    });

    // Fetch product counts for each tag
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
            console.error(`Error fetching products for tag ${tag.id}:`, error);
            return {
              ...tag,
              productCount: 0
            };
          }
        })
    );

    tags.value = tagsWithCount;

    // Initialize dropdowns after tags are loaded
    initDropdowns();
  } catch (error) {
    console.error('Error fetching tags:', error);
    tags.value = [];
    showToastMessage('Failed to load tags', 'error');
  } finally {
    isLoading.value = false;
  }
};

const generateSlug = (name) => {
  return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-')     // Replace spaces with hyphens
      .replace(/-+/g, '-')      // Replace multiple hyphens with single hyphen
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
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};

const getTagColor = (name) => {
  if (!name) return 'rgb(156, 163, 175)'; // Default gray

  // Generate a deterministic color based on the tag name
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const h = Math.abs(hash) % 360;
  // More vibrant colors with higher saturation and lightness
  return `hsl(${h}, 65%, 55%)`;
};

const openTagModal = (tag = null) => {
  if (tag) {
    // Edit mode
    isEditMode.value = true;
    currentTag.value = { ...tag };
    slugGeneratedAuto.value = false; // Don't auto-generate slug in edit mode
  } else {
    // Create mode
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
  // Only confirm if there are unsaved changes
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
    if (confirm('Discard unsaved changes?')) {
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
      // Update existing tag
      await $pb.collection('tags').update(currentTag.value.id, currentTag.value);
      showToastMessage('Tag updated successfully', 'success');
    } else {
      // Create new tag
      await $pb.collection('tags').create(currentTag.value);
      showToastMessage('Tag created successfully', 'success');
    }

    // Refresh tag list
    fetchTags();
    showTagModal.value = false;

  } catch (error) {
    console.error('Error saving tag:', error);

    // Check for duplicate slug error
    if (error.response?.data?.data?.slug?.code === 'validation_not_unique') {
      showToastMessage('A tag with this slug already exists', 'error');
    } else {
      showToastMessage(
          error.message || 'Failed to save tag. Please try again.',
          'error'
      );
    }
  } finally {
    isSaving.value = false;
  }
};

const confirmDelete = async (tag) => {
  tagToDelete.value = tag;

  // Check if tag has related products
  try {
    const productCount = await $pb.collection('products').getList(1, 1, {
      filter: `tags ~ "${tag.id}"`,
    });

    hasRelatedProducts.value = productCount.totalItems > 0;
    tagProductCount.value = productCount.totalItems;
  } catch (error) {
    console.error('Error checking related products:', error);
    hasRelatedProducts.value = false;
    tagProductCount.value = 0;
  }

  showDeleteModal.value = true;
};

const deleteTag = async () => {
  isDeleting.value = true;

  try {
    await $pb.collection('tags').delete(tagToDelete.value.id);
    showToastMessage('Tag deleted successfully', 'success');

    // Refresh tag list
    fetchTags();
    showDeleteModal.value = false;
    tagToDelete.value = null;
  } catch (error) {
    console.error('Error deleting tag:', error);
    showToastMessage(
        error.message || 'Failed to delete tag. Please try again.',
        'error'
    );
  } finally {
    isDeleting.value = false;
  }
};

const showToastMessage = (message, type = 'info') => {
  // Clear any existing timeout
  if (toastTimeout.value) {
    clearTimeout(toastTimeout.value);
  }

  // Set toast properties
  toastMessage.value = message;
  toastType.value = type;
  showToast.value = true;

  // Hide toast after 5 seconds
  toastTimeout.value = setTimeout(() => {
    showToast.value = false;
  }, 5000);
};

// Initialize data on component mount
onMounted(async () => {
  try {
    await fetchTags();
  } catch (error) {
    console.error('Error initializing component:', error);
    showToastMessage('Failed to load data', 'error');
  } finally {
    isLoading.value = false;
  }
});
</script>