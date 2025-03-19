<template>
  <div class="responsive-container section-padding">
    <div class="flex justify-between items-center mb-8">
      <h1 class="heading-2">Categories Management</h1>
      <button @click="openCategoryModal()" class="btn-primary btn-icon-text">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Add New Category
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!categories || categories.length === 0" class="card-flat flex flex-col items-center py-12">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-background-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 class="heading-4 mb-2">No Categories Found</h3>
      <p class="body-regular text-background-600 dark:text-background-400">
        Add your first category by clicking the button above.
      </p>
    </div>

    <!-- Categories Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
          v-for="category in categories"
          :key="category.id"
          class="card-flat hover:shadow-md transition-shadow duration-200"
      >
        <div class="flex flex-col h-full">
          <div class="mb-4 relative aspect-video overflow-hidden rounded-lg">
            <img
                :src="getCategoryImageUrl(category)"
                class="w-full h-full object-cover"
                alt="Category image"
            >
          </div>
          <div class="flex-grow">
            <h3 class="heading-4 mb-2">{{ category.name }}</h3>
            <p v-if="category.description" class="text-background-600 dark:text-background-400 mb-3">
              {{ shortenText(category.description, 100) }}
            </p>
            <div class="text-sm text-background-500 mb-4">
              <span class="inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                {{ category.slug }}
              </span>
            </div>
          </div>
          <div class="flex justify-end space-x-2 pt-3 border-t border-background-300 dark:border-background-700 mt-auto">
            <button @click="openCategoryModal(category)" class="btn-ghost text-secondary-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button @click="confirmDelete(category)" class="btn-ghost text-error-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Category Modal -->
    <div v-if="showCategoryModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-background-900 bg-opacity-75 transition-opacity" aria-hidden="true" @click="showCategoryModal = false"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white dark:bg-background-800 rounded-xl text-left overflow-hidden shadow-modern transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form @submit.prevent="saveCategory">
            <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 class="heading-3 mb-6">{{ isEditMode ? 'Edit Category' : 'Add New Category' }}</h3>

              <div class="grid grid-cols-1 gap-6">
                <!-- Category Info -->
                <div>
                  <label for="name" class="input-label">Category Name</label>
                  <input id="name" v-model="currentCategory.name" type="text" class="input-primary" required>
                </div>

                <div>
                  <label for="slug" class="input-label">Slug</label>
                  <div class="flex space-x-2">
                    <input
                        id="slug"
                        v-model="currentCategory.slug"
                        type="text"
                        class="input-primary"
                        :disabled="slugGeneratedAuto"
                        required
                    >
                    <button
                        type="button"
                        @click="toggleSlugGeneration"
                        class="btn-ghost text-primary-500 px-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path v-if="slugGeneratedAuto" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                  <span v-if="slugGeneratedAuto" class="text-xs text-background-500 mt-1">Slug will be auto-generated</span>
                </div>

                <div>
                  <label for="description" class="input-label">Description</label>
                  <textarea id="description" v-model="currentCategory.description" rows="3" class="input-primary"></textarea>
                </div>

                <!-- Parent Category -->
                <div>
                  <label for="parent" class="input-label">Parent Category (Optional)</label>
                  <select id="parent" v-model="currentCategory.parent" class="select">
                    <option value="">None</option>
                    <option
                        v-for="cat in parentCategoryOptions"
                        :key="cat.id"
                        :value="cat.id"
                        :disabled="cat.id === currentCategory.id"
                    >
                      {{ cat.name }}
                    </option>
                  </select>
                </div>

                <!-- Image Upload -->
                <div>
                  <label class="input-label">Category Image</label>
                  <div
                      class="border border-dashed border-background-400 rounded-lg p-6 text-center"
                      @drop.prevent="handleImageDrop"
                      @dragover.prevent
                  >
                    <div v-if="imagePreview" class="mb-4 flex justify-center">
                      <img
                          :src="imagePreview"
                          alt="Category image preview"
                          class="h-40 object-contain rounded"
                      >
                    </div>
                    <p class="text-background-600 dark:text-background-400 mb-4">
                      Drag & drop image here or click to browse
                    </p>
                    <input
                        ref="imageInput"
                        type="file"
                        @change="handleImageChange"
                        accept="image/png,image/jpeg,image/webp"
                        class="hidden"
                    >
                    <button
                        type="button"
                        @click="$refs.imageInput.click()"
                        class="btn-secondary"
                    >
                      Upload Image
                    </button>
                  </div>
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
                {{ isEditMode ? 'Update Category' : 'Create Category' }}
              </button>
              <button type="button" @click="showCategoryModal = false" class="btn-secondary mt-3 sm:mt-0">
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
                <h3 class="heading-4" id="modal-title">Delete Category</h3>
                <div class="mt-2">
                  <p v-if="hasRelatedProducts" class="text-error-500 mb-2">
                    Warning: This category has related products. Deleting it may affect those products.
                  </p>
                  <p class="body-regular text-background-600 dark:text-background-400">
                    Are you sure you want to delete "{{ categoryToDelete?.name }}"? This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-background-100 dark:bg-background-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
                @click="deleteCategory"
                type="button"
                class="btn-primary bg-error-600 hover:bg-error-700 focus:ring-error-500 sm:ml-3"
                :disabled="isDeleting"
            >
              <span v-if="isDeleting" class="inline-block animate-spin mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </span>
              Delete
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
        class="fixed bottom-6 right-6 max-w-md p-4 rounded-xl shadow-elevated transition-all"
        :class="{
        'bg-success-500 text-white': toastType === 'success',
        'bg-error-500 text-white': toastType === 'error',
        'bg-primary-500 text-white': toastType === 'info'
      }"
    >
      <div class="flex items-center">
        <svg v-if="toastType === 'success'" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <svg v-if="toastType === 'error'" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <svg v-if="toastType === 'info'" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ toastMessage }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';

// Get PocketBase instance
const { $pb } = useNuxtApp();
const config = useRuntimeConfig();

definePageMeta({
  layout: 'dashboard'
});

// State
const isLoading = ref(true);
const isSaving = ref(false);
const isDeleting = ref(false);
const categories = ref([]);
const showCategoryModal = ref(false);
const showDeleteModal = ref(false);
const isEditMode = ref(false);
const slugGeneratedAuto = ref(true);
const imageFile = ref(null);
const imagePreview = ref('');
const categoryToDelete = ref(null);
const hasRelatedProducts = ref(false);
const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref('info');
const toastTimeout = ref(null);

// Refs for file inputs
const imageInput = ref(null);

// Initialize with empty category
const currentCategory = ref({
  name: '',
  slug: '',
  description: '',
  parent: '',
  image: null
});

// Computed
const parentCategoryOptions = computed(() => {
  // Filter out the current category if in edit mode
  if (isEditMode.value && currentCategory.value.id) {
    return categories.value.filter(cat => cat.id !== currentCategory.value.id);
  }
  return categories.value;
});

// Watch for category name changes to auto-generate slug
watch(() => currentCategory.value.name, (newName) => {
  if (slugGeneratedAuto.value && newName) {
    currentCategory.value.slug = generateSlug(newName);
  }
});

// Methods
const fetchCategories = async () => {
  isLoading.value = true;

  try {
    const resultList = await $pb.collection('categories').getFullList({
      sort: 'name',
      expand: 'parent'
    });

    categories.value = resultList;
  } catch (error) {
    console.error('Error fetching categories:', error);
    categories.value = [];
  } finally {
    isLoading.value = false;
  }
};

const shortenText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
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

  if (slugGeneratedAuto.value && currentCategory.value.name) {
    currentCategory.value.slug = generateSlug(currentCategory.value.name);
  }
};

const getCategoryImageUrl = (category) => {
  if (!category || !category.image) {
    return 'https://via.placeholder.com/400x225?text=No+Image';
  }
  return `${config.public.pocketbaseUrl}/api/files/categories/${category.id}/${category.image}`;
};

const openCategoryModal = (category = null) => {
  // Reset form state
  slugGeneratedAuto.value = true;
  imageFile.value = null;
  imagePreview.value = '';

  if (category) {
    // Edit mode
    isEditMode.value = true;
    currentCategory.value = { ...category };
    slugGeneratedAuto.value = false; // Don't auto-generate slug in edit mode

    // Set image preview if available
    if (category.image) {
      imagePreview.value = getCategoryImageUrl(category);
    }
  } else {
    // Create mode
    isEditMode.value = false;
    currentCategory.value = {
      name: '',
      slug: '',
      description: '',
      parent: '',
      image: null
    };
  }

  showCategoryModal.value = true;
};

const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (!file.type.includes('image/')) {
    showToastMessage('Please select an image file', 'error');
    return;
  }

  imageFile.value = file;

  // Create preview
  const reader = new FileReader();
  reader.onload = (e) => {
    imagePreview.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const handleImageDrop = (event) => {
  const file = event.dataTransfer.files[0];
  if (!file) return;

  if (!file.type.includes('image/')) {
    showToastMessage('Please drop an image file', 'error');
    return;
  }

  imageFile.value = file;

  // Create preview
  const reader = new FileReader();
  reader.onload = (e) => {
    imagePreview.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const saveCategory = async () => {
  isSaving.value = true;

  try {
    const formData = new FormData();

    // Add basic fields
    formData.append('name', currentCategory.value.name);
    formData.append('slug', currentCategory.value.slug);

    if (currentCategory.value.description) {
      formData.append('description', currentCategory.value.description);
    }

    if (currentCategory.value.parent) {
      formData.append('parent', currentCategory.value.parent);
    }

    // Add image if changed
    if (imageFile.value) {
      formData.append('image', imageFile.value);
    }

    if (isEditMode.value) {
      // Update existing category
      await $pb.collection('categories').update(currentCategory.value.id, formData);
      showToastMessage('Category updated successfully', 'success');
    } else {
      // Create new category
      await $pb.collection('categories').create(formData);
      showToastMessage('Category created successfully', 'success');
    }

    // Refresh category list
    fetchCategories();
    showCategoryModal.value = false;

  } catch (error) {
    console.error('Error saving category:', error);
    showToastMessage(
        error.message || 'Failed to save category. Please try again.',
        'error'
    );
  } finally {
    isSaving.value = false;
  }
};

const confirmDelete = async (category) => {
  categoryToDelete.value = category;

  // Check if category has related products
  try {
    const productCount = await $pb.collection('products').getList(1, 1, {
      filter: `category="${category.id}"`,
    });

    hasRelatedProducts.value = productCount.totalItems > 0;
  } catch (error) {
    console.error('Error checking related products:', error);
    hasRelatedProducts.value = false;
  }

  showDeleteModal.value = true;
};

const deleteCategory = async () => {
  isDeleting.value = true;

  try {
    await $pb.collection('categories').delete(categoryToDelete.value.id);
    showToastMessage('Category deleted successfully', 'success');

    // Refresh category list
    fetchCategories();
    showDeleteModal.value = false;
    categoryToDelete.value = null;
  } catch (error) {
    console.error('Error deleting category:', error);
    showToastMessage(
        error.message || 'Failed to delete category. Please try again.',
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

  // Hide toast after 3 seconds
  toastTimeout.value = setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

// Initialize data on component mount
onMounted(async () => {
  try {
    await fetchCategories();
  } catch (error) {
    console.error('Error initializing component:', error);
    showToastMessage('Failed to load data', 'error');
  } finally {
    isLoading.value = false;
  }
});
</script>