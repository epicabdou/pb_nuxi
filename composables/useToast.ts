// composables/useToast.js
import { ref, reactive } from 'vue'

// Create a reactive state that persists outside the scope of the composable
const toasts = reactive([])
const idCounter = ref(0)

export function useToast() {
    // Toast types
    const TYPES = {
        SUCCESS: 'success',
        ERROR: 'error',
        WARNING: 'warning',
        INFO: 'info'
    }

    // Default duration
    const DEFAULT_DURATION = 3000 // 3 seconds

    /**
     * Add a toast to the queue
     * @param {string} message - The toast message
     * @param {string} type - The toast type (success, error, warning, info)
     * @param {number} duration - Duration in milliseconds before auto-dismissing
     */
    const addToast = (message, type, duration = DEFAULT_DURATION) => {
        const id = idCounter.value++

        const toast = {
            id,
            message,
            type,
            visible: true
        }

        toasts.push(toast)

        // Auto-dismiss after duration
        if (duration !== 0) {
            setTimeout(() => {
                dismissToast(id)
            }, duration)
        }

        return id
    }

    /**
     * Dismiss a toast by id
     * @param {number} id - The toast id to dismiss
     */
    const dismissToast = (id) => {
        const index = toasts.findIndex(toast => toast.id === id)
        if (index !== -1) {
            // First mark as hidden for animation purposes
            toasts[index].visible = false

            // Then remove after animation completes
            setTimeout(() => {
                const removeIndex = toasts.findIndex(toast => toast.id === id)
                if (removeIndex !== -1) {
                    toasts.splice(removeIndex, 1)
                }
            }, 300) // Match with your CSS transition duration
        }
    }

    // Convenience methods for different toast types
    const success = (message, duration = DEFAULT_DURATION) =>
        addToast(message, TYPES.SUCCESS, duration)

    const error = (message, duration = DEFAULT_DURATION) =>
        addToast(message, TYPES.ERROR, duration)

    const warning = (message, duration = DEFAULT_DURATION) =>
        addToast(message, TYPES.WARNING, duration)

    const info = (message, duration = DEFAULT_DURATION) =>
        addToast(message, TYPES.INFO, duration)

    return {
        // State
        toasts,

        // Methods
        addToast,
        dismissToast,
        success,
        error,
        warning,
        info
    }
}