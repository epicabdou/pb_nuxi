<template>
  <div
      class="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md"
      style="pointer-events: none;"
  >
    <TransitionGroup
        name="toast"
        tag="div"
        class="flex flex-col gap-2"
    >
      <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="[
          'toast-notification px-4 py-3 rounded-lg shadow-md transition-all transform',
          'flex items-center gap-3',
          'animate-slide-up',
          toastTypeClass(toast.type),
          { 'toast-visible': toast.visible }
        ]"
          style="pointer-events: auto;"
      >
        <div :class="['toast-icon', iconColorClass(toast.type)]">
          <component :is="getIcon(toast.type)" class="w-5 h-5" />
        </div>
        <div class="flex-grow">{{ toast.message }}</div>
        <button
            @click="dismissToast(toast.id)"
            class="text-current opacity-70 hover:opacity-100 p-1 transition-opacity"
            aria-label="Dismiss"
        >
          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { defineComponent, h } from 'vue'
import { useToast } from '@/composables/useToast'

const { toasts, dismissToast } = useToast()

// Define icons as render functions
const SuccessIcon = defineComponent({
  render() {
    return h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      fill: 'none',
      viewBox: '0 0 24 24',
      stroke: 'currentColor'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M5 13l4 4L19 7'
      })
    ])
  }
})

const ErrorIcon = defineComponent({
  render() {
    return h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      fill: 'none',
      viewBox: '0 0 24 24',
      stroke: 'currentColor'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
      })
    ])
  }
})

const WarningIcon = defineComponent({
  render() {
    return h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      fill: 'none',
      viewBox: '0 0 24 24',
      stroke: 'currentColor'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
      })
    ])
  }
})

const InfoIcon = defineComponent({
  render() {
    return h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      fill: 'none',
      viewBox: '0 0 24 24',
      stroke: 'currentColor'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
      })
    ])
  }
})

// Map toast type to icon component
const getIcon = (type) => {
  switch (type) {
    case 'success': return SuccessIcon
    case 'error': return ErrorIcon
    case 'warning': return WarningIcon
    case 'info': return InfoIcon
    default: return InfoIcon
  }
}

// Map toast type to background and text colors
const toastTypeClass = (type) => {
  switch (type) {
    case 'success': return 'bg-success-50 text-success-800 border-l-4 border-success-500'
    case 'error': return 'bg-error-50 text-error-800 border-l-4 border-error-500'
    case 'warning': return 'bg-yellow-50 text-yellow-800 border-l-4 border-yellow-500'
    case 'info': return 'bg-secondary-50 text-secondary-800 border-l-4 border-secondary-500'
    default: return 'bg-background-100 text-background-800 border-l-4 border-background-500'
  }
}

// Icon colors
const iconColorClass = (type) => {
  switch (type) {
    case 'success': return 'text-success-500'
    case 'error': return 'text-error-500'
    case 'warning': return 'text-yellow-500'
    case 'info': return 'text-secondary-500'
    default: return 'text-background-500'
  }
}
</script>

<style scoped>
.toast-notification {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
}

.toast-visible {
  opacity: 1;
  transform: translateY(0);
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>