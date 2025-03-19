// stores/wishlist.ts
import { defineStore } from 'pinia'

export const useWishlistStore = defineStore('wishlist', {
    state: () => ({
        items: [],
        isLoading: false
    }),

    getters: {
        // Count of items in wishlist
        itemCount: (state) => state.items.length,

        // Check if an item is in the wishlist
        isInWishlist: (state) => (productId) => {
            return state.items.some(item => item.product?.id === productId)
        }
    },

    actions: {
        // Set loading state
        setLoading(status) {
            this.isLoading = status
        },

        // Set wishlist items
        setItems(items) {
            this.items = items
        },

        // Clear wishlist items
        clearItems() {
            this.items = []
        },

        // Add item to wishlist
        async addToWishlist(productId) {
            const { $pb } = useNuxtApp()
            this.isLoading = true

            try {
                if (!$pb.authStore.isValid) {
                    throw new Error('User not authenticated')
                }

                const userId = $pb.authStore.model.id

                // Check if product already in wishlist
                const existingRecord = await $pb.collection('wishlists').getFirstListItem(`user="${userId}" && product="${productId}"`)
                    .catch(() => null)

                if (existingRecord) {
                    // Item already in wishlist
                    return existingRecord
                }

                // Create new wishlist entry
                const data = {
                    user: userId,
                    product: productId
                }

                const record = await $pb.collection('wishlists').create(data)

                // Refresh wishlist items
                await this.fetchItems()

                return record
            } catch (error) {
                console.error('Error adding to wishlist:', error)
                throw error
            } finally {
                this.isLoading = false
            }
        },

        // Remove item from wishlist
        async removeFromWishlist(itemId) {
            this.isLoading = true

            try {
                const { $pb } = useNuxtApp()

                if (!$pb.authStore.isValid) {
                    throw new Error('User not authenticated')
                }

                await $pb.collection('wishlists').delete(itemId)

                // Remove from local state
                this.items = this.items.filter(item => item.id !== itemId)

                return true
            } catch (error) {
                console.error('Error removing from wishlist:', error)
                throw error
            } finally {
                this.isLoading = false
            }
        },

        // Toggle wishlist status (add/remove)
        async toggleWishlist(productId) {
            const { $pb } = useNuxtApp()
            this.isLoading = true

            try {
                if (!$pb.authStore.isValid) {
                    throw new Error('User not authenticated')
                }

                const userId = $pb.authStore.model.id

                // Check if product already in wishlist
                const existingRecord = await $pb.collection('wishlists').getFirstListItem(`user="${userId}" && product="${productId}"`)
                    .catch(() => null)

                if (existingRecord) {
                    // Remove from wishlist
                    await $pb.collection('wishlists').delete(existingRecord.id)
                    this.items = this.items.filter(item => item.id !== existingRecord.id)
                    return { added: false, removed: true }
                } else {
                    // Add to wishlist
                    const data = {
                        user: userId,
                        product: productId
                    }

                    const record = await $pb.collection('wishlists').create(data)

                    // Refresh wishlist items to get expanded product data
                    await this.fetchItems()

                    return { added: true, removed: false, record }
                }
            } catch (error) {
                console.error('Error toggling wishlist:', error)
                throw error
            } finally {
                this.isLoading = false
            }
        },

        // Fetch all wishlist items for current user
        async fetchItems() {
            this.isLoading = true

            try {
                const { $pb } = useNuxtApp()

                if (!$pb.authStore.isValid) {
                    this.items = []
                    return []
                }

                const userId = $pb.authStore.model.id

                const result = await $pb.collection('wishlists').getList(1, 100, {
                    filter: `user="${userId}"`,
                    expand: 'product'
                })

                this.items = result.items.map(item => ({
                    id: item.id,
                    product: item.expand.product
                }))

                return this.items
            } catch (error) {
                console.error('Error fetching wishlist items:', error)
                this.items = []
                throw error
            } finally {
                this.isLoading = false
            }
        }
    }
})