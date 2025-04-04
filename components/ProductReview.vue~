<template>
  <div class="space-y-8">
    <!-- Reviews Stats -->
    <div class="flex flex-col md:flex-row md:items-center gap-6 p-6 bg-background-100 dark:bg-background-800 rounded-xl">
      <div class="flex flex-col items-center md:w-1/4">
        <div class="text-5xl font-bold text-primary-600">{{ averageRating.toFixed(1) }}</div>
        <div class="flex mt-2">
          <StarRating :rating="averageRating" :readonly="true" size="md" />
        </div>
        <div class="text-sm text-background-600 dark:text-background-400 mt-1">{{ reviews.length }} {{ reviews.length === 1 ? 'review' : 'reviews' }}</div>
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

    <!-- Reviews List -->
    <div class="space-y-6">
      <div v-if="reviews.length === 0" class="text-center py-10">
        <p class="text-background-600 dark:text-background-400">No reviews yet. Be the first to review this product!</p>
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
              <p class="font-medium">{{ review.expand?.user?.name || 'User' }}</p>
              <p class="text-sm text-background-600 dark:text-background-400">
                {{ formatDate(review.created) }}
              </p>
            </div>
          </div>
          <div class="flex">
            <StarRating :rating="review.rating" :readonly="true" />
          </div>
        </div>
        <div class="mt-4">
          <p class="text-background-800 dark:text-background-200">
            {{ review.comment }}
          </p>
        </div>
      </div>

      <!-- Add Review Form -->
      <div v-if="authStore.isAuthenticated && !userReview" class="card">
        <h3 class="text-xl font-semibold mb-4">Write a Review</h3>
        <form @submit.prevent="submitReview" class="space-y-4">
          <div>
            <label class="input-label">Rating</label>
            <StarRating v-model="newReview.rating" :readonly="false" size="lg" />
          </div>
          <div>
            <label for="comment" class="input-label">Your Review</label>
            <textarea
                v-model="newReview.comment"
                id="comment"
                rows="4"
                class="input-primary"
                placeholder="Share your thoughts on this product..."
                required
            ></textarea>
          </div>
          <div>
            <button type="submit" class="btn-primary" :disabled="isSubmitting">
              <span v-if="isSubmitting">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
              <span v-else>Submit Review</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Login to Review Message -->
      <div v-else-if="!authStore.isAuthenticated" class="card text-center">
        <p class="mb-4">Please log in to leave a review.</p>
        <NuxtLink to="/login" class="btn-primary">Login</NuxtLink>
      </div>

      <!-- User's Existing Review -->
      <div v-else-if="userReview" class="card border-primary-100 dark:border-primary-900 border-2">
        <div class="flex justify-between items-start">
          <h3 class="text-xl font-semibold">Your Review</h3>
          <div class="flex space-x-2">
            <button
                v-if="!isEditing"
                @click="startEditing"
                class="btn-ghost text-sm px-2 py-1"
            >
              Edit
            </button>
            <button
                v-if="!isEditing"
                @click="confirmDeleteReview"
                class="btn-ghost text-sm px-2 py-1 text-error-600"
            >
              Delete
            </button>
          </div>
        </div>

        <!-- Display Mode -->
        <div v-if="!isEditing" class="mt-4">
          <div class="flex mb-2">
            <StarRating :rating="userReview.rating" :readonly="true" />
            <span class="text-sm text-background-600 dark:text-background-400 ml-2">
              Posted on {{ formatDate(userReview.created) }}
            </span>
          </div>
          <p class="text-background-800 dark:text-background-200">
            {{ userReview.comment }}
          </p>
        </div>

        <!-- Edit Mode -->
        <div v-else class="mt-4">
          <form @submit.prevent="updateReview" class="space-y-4">
            <div>
              <label class="input-label">Rating</label>
              <StarRating v-model="editReview.rating" :readonly="false" size="lg" />
            </div>
            <div>
              <label for="edit-comment" class="input-label">Your Review</label>
              <textarea
                  v-model="editReview.comment"
                  id="edit-comment"
                  rows="4"
                  class="input-primary"
                  required
              ></textarea>
            </div>
            <div class="flex space-x-3">
              <button type="submit" class="btn-primary" :disabled="isSubmitting">
                <span v-if="isSubmitting">Updating...</span>
                <span v-else>Update Review</span>
              </button>
              <button
                  type="button"
                  @click="cancelEditing"
                  class="btn-secondary"
                  :disabled="isSubmitting"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Confirmation Modal for Delete -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div class="bg-white dark:bg-background-800 rounded-lg max-w-md w-full p-6 shadow-xl">
        <h3 class="text-xl font-bold mb-4">Delete Review</h3>
        <p class="mb-6">Are you sure you want to delete your review? This action cannot be undone.</p>
        <div class="flex justify-end space-x-3">
          <button
              @click="showDeleteConfirm = false"
              class="btn-secondary"
          >
            Cancel
          </button>
          <button
              @click="deleteReview"
              class="btn-primary bg-error-600 hover:bg-error-700 focus:ring-error-500"
              :disabled="isSubmitting"
          >
            <span v-if="isSubmitting">Deleting...</span>
            <span v-else>Delete</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <Teleport to="body">
      <div
          v-if="showToast"
          class="fixed top-20 right-4 z-50 max-w-sm transform transition-all duration-500"
          :class="[showToast ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0']"
      >
        <div
            class="p-4 rounded-lg shadow-md border-l-4"
            :class="{
            'bg-success-100 border-success-500 text-success-800': toastType === 'success',
            'bg-error-100 border-error-500 text-error-800': toastType === 'error',
            'bg-secondary-100 border-secondary-500 text-secondary-800': toastType === 'info'
          }"
        >
          <div class="flex items-start">
            <!-- Success Icon -->
            <div v-if="toastType === 'success'" class="flex-shrink-0">
              <svg class="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <!-- Error Icon -->
            <div v-else-if="toastType === 'error'" class="flex-shrink-0">
              <svg class="w-5 h-5 text-error-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <!-- Info Icon -->
            <div v-else class="flex-shrink-0">
              <svg class="w-5 h-5 text-secondary-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
              </svg>
            </div>

            <div class="ml-3">
              <h3 v-if="toastTitle" class="text-sm font-medium">{{ toastTitle }}</h3>
              <div class="mt-1">
                <p class="text-sm">{{ toastMessage }}</p>
              </div>
            </div>

            <div class="ml-auto pl-3">
              <button @click="showToast = false" class="inline-flex text-gray-400 hover:text-gray-500">
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useAuthStore } from '~/stores/auth';

// Star Rating Component
const StarRating = defineComponent({
  name: 'StarRating',
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    readonly: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'md', // sm, md, lg
      validator: (value) => ['sm', 'md', 'lg'].includes(value)
    },
    rating: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const starClasses = computed(() => {
      const sizes = {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-8 w-8'
      };
      return sizes[props.size] || sizes.md;
    });

    const stars = ref([1, 2, 3, 4, 5]);
    const currentRating = computed(() => props.modelValue || props.rating);

    const setRating = (value) => {
      if (props.readonly) return;
      emit('update:modelValue', value);
    };

    return {
      stars,
      currentRating,
      setRating,
      starClasses
    };
  },
  template: `
    <div class="flex">
      <button
        v-for="star in stars"
        :key="star"
        type="button"
        @click="setRating(star)"
        :class="[
          'text-yellow-400 focus:outline-none',
          readonly ? 'cursor-default' : 'cursor-pointer',
          starClasses
        ]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" :class="starClasses" :class="{'fill-current': star <= currentRating, 'text-background-300 dark:text-background-600': star > currentRating}" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </button>
    </div>
  `
});

// Props
const props = defineProps({
  productId: {
    type: String,
    required: true
  },
  pb: {
    type: Object,
    required: true
  }
});

// Emits
const emit = defineEmits(['review-added', 'review-updated', 'review-deleted']);

// Get auth store
const authStore = useAuthStore();

// State
const reviews = ref([]);
const isLoading = ref(true);
const isSubmitting = ref(false);
const isEditing = ref(false);
const showDeleteConfirm = ref(false);
const userReview = ref(null);

// Toast notification state
const showToast = ref(false);
const toastType = ref('success');
const toastMessage = ref('');
const toastTitle = ref('');

// Form state
const newReview = ref({
  rating: 5,
  comment: ''
});

const editReview = ref({
  rating: 5,
  comment: ''
});

// Computed
const averageRating = computed(() => {
  if (reviews.value.length === 0) return 0;
  const sum = reviews.value.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.value.length;
});

// Methods
const getStarPercent = (stars) => {
  const count = reviews.value.filter(review => Math.round(review.rating) === stars).length;
  if (reviews.value.length === 0) return 0;
  return Math.round((count / reviews.value.length) * 100);
};

const fetchReviews = async () => {
  isLoading.value = true;
  try {
    // Fetch reviews for this product with expanded user data
    const reviewsList = await props.pb.collection('reviews').getList(1, 50, {
      filter: `product="${props.productId}"`,
      sort: '-created',
      expand: 'user'
    });

    reviews.value = reviewsList.items;

    // Check if the current user has already reviewed this product
    if (authStore.isAuthenticated) {
      const userReviewData = reviews.value.find(r =>
          r.expand?.user?.id === authStore.currentUser.id
      );

      if (userReviewData) {
        userReview.value = userReviewData;
      }
    }
  } catch (error) {
    console.error('Error fetching reviews:', error);
    reviews.value = [];
  } finally {
    isLoading.value = false;
  }
};

const submitReview = async () => {
  if (!authStore.isAuthenticated) {
    showToast.value = true;
    toastType.value = 'info';
    toastTitle.value = 'Authentication Required';
    toastMessage.value = 'Please log in to submit a review.';
    return;
  }

  isSubmitting.value = true;

  try {
    const data = {
      user: authStore.currentUser.id,
      product: props.productId,
      rating: newReview.value.rating,
      comment: newReview.value.comment
    };

    const result = await props.pb.collection('reviews').create(data);

    // Refresh reviews to include the new one
    await fetchReviews();

    // Reset form
    newReview.value = {
      rating: 5,
      comment: ''
    };

    // Show success toast
    showToast.value = true;
    toastType.value = 'success';
    toastTitle.value = 'Review Submitted';
    toastMessage.value = 'Thank you! Your review has been published.';

    // Emit event
    emit('review-added', result);

  } catch (error) {
    console.error('Error submitting review:', error);

    // Show error toast
    showToast.value = true;
    toastType.value = 'error';
    toastTitle.value = 'Error';
    toastMessage.value = 'There was an error submitting your review. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
};

const startEditing = () => {
  if (!userReview.value) return;

  editReview.value.rating = userReview.value.rating;
  editReview.value.comment = userReview.value.comment;
  isEditing.value = true;
};

const cancelEditing = () => {
  isEditing.value = false;
};

const updateReview = async () => {
  if (!userReview.value) return;

  isSubmitting.value = true;

  try {
    const data = {
      rating: editReview.value.rating,
      comment: editReview.value.comment
    };

    const result = await props.pb.collection('reviews').update(userReview.value.id, data);

    // Refresh reviews
    await fetchReviews();

    // Exit edit mode
    isEditing.value = false;

    // Show success toast
    showToast.value = true;
    toastType.value = 'success';
    toastTitle.value = 'Review Updated';
    toastMessage.value = 'Your review has been updated successfully.';

    // Emit event
    emit('review-updated', result);

  } catch (error) {
    console.error('Error updating review:', error);

    // Show error toast
    showToast.value = true;
    toastType.value = 'error';
    toastTitle.value = 'Error';
    toastMessage.value = 'There was an error updating your review. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
};

const confirmDeleteReview = () => {
  showDeleteConfirm.value = true;
};

const deleteReview = async () => {
  if (!userReview.value) return;

  isSubmitting.value = true;

  try {
    await props.pb.collection('reviews').delete(userReview.value.id);

    // Hide confirmation dialog
    showDeleteConfirm.value = false;

    // Refresh reviews
    await fetchReviews();

    // Show success toast
    showToast.value = true;
    toastType.value = 'success';
    toastTitle.value = 'Review Deleted';
    toastMessage.value = 'Your review has been deleted successfully.';

    // Emit event
    emit('review-deleted', userReview.value.id);

  } catch (error) {
    console.error('Error deleting review:', error);

    // Show error toast
    showToast.value = true;
    toastType.value = 'error';
    toastTitle.value = 'Error';
    toastMessage.value = 'There was an error deleting your review. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
};

const showToastNotification = (type, title, message, duration = 5000) => {
  toastType.value = type;
  toastTitle.value = title;
  toastMessage.value = message;
  showToast.value = true;

  // Auto hide after duration
  setTimeout(() => {
    showToast.value = false;
  }, duration);
};

const getAvatarUrl = (user) => {
  if (!user || !user.avatar) return null;
  return `${props.pb.baseUrl}/api/files/${user.collectionId}/${user.id}/${user.avatar}`;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

// Expose methods to parent component
defineExpose({
  fetchReviews,
  showToastNotification
});

// Fetch reviews on component mount
onMounted(() => {
  fetchReviews();
});

// Watch for auth state changes to check for user review
watch(() => authStore.isAuthenticated, (newValue) => {
  if (newValue) {
    // Check if the user has already reviewed this product
    const userReviewData = reviews.value.find(r =>
        r.expand?.user?.id === authStore.currentUser.id
    );

    userReview.value = userReviewData || null;
  } else {
    userReview.value = null;
  }
});
</script>