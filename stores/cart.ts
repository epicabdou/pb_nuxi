// stores/cart.js
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [],
        isCartOpen: false
    }),

    getters: {
        // Total number of items in cart
        cartCount: (state) => {
            return state.items.reduce((total, item) => total + item.quantity, 0)
        },

        // Total price of all items in cart
        cartTotal: (state) => {
            return state.items.reduce((total, item) => {
                return total + (item.price * item.quantity)
            }, 0)
        },

        // Check if cart has items
        hasItems: (state) => state.items.length > 0,

        // Get formatted cart total with currency symbol
        formattedCartTotal: (state) => {
            const total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
            return `${total.toFixed(2)} €`
        }
    },

    actions: {
        // Add item to cart
        addItem(item) {
            const existingItem = this.items.find(i => i.id === item.id)

            if (existingItem) {
                // If item exists, update quantity
                existingItem.quantity += item.quantity || 1
            } else {
                // If item doesn't exist, add new item with quantity
                this.items.push({
                    ...item,
                    quantity: item.quantity || 1
                })
            }

            // Save to local storage
            this.saveCart()
        },

        // Update item quantity
        updateItemQuantity(itemId, quantity) {
            const item = this.items.find(i => i.id === itemId)

            if (item) {
                item.quantity = quantity

                // Remove item if quantity is 0
                if (quantity <= 0) {
                    this.removeItem(itemId)
                    return
                }

                // Save to local storage
                this.saveCart()
            }
        },

        // Increment item quantity
        incrementItem(itemId) {
            const item = this.items.find(i => i.id === itemId)
            if (item) {
                item.quantity += 1
                this.saveCart()
            }
        },

        // Decrement item quantity
        decrementItem(itemId) {
            const item = this.items.find(i => i.id === itemId)
            if (item && item.quantity > 1) {
                item.quantity -= 1
                this.saveCart()
            } else if (item && item.quantity === 1) {
                this.removeItem(itemId)
            }
        },

        // Remove item from cart
        removeItem(itemId) {
            this.items = this.items.filter(item => item.id !== itemId)
            this.saveCart()
        },

        // Clear all items from cart
        clearCart() {
            this.items = []
            this.saveCart()
        },

        // Toggle cart sidebar
        toggleCart() {
            this.isCartOpen = !this.isCartOpen
        },

        // Save cart to local storage
        saveCart() {
            if (process.client) {
                localStorage.setItem('cart', JSON.stringify(this.items))
            }
        },

        // Load cart from local storage
        loadCart() {
            if (process.client) {
                const savedCart = localStorage.getItem('cart')
                if (savedCart) {
                    this.items = JSON.parse(savedCart)
                }
            }
        },

        // Create order from cart (to be used with PocketBase)
        async createOrder(pb, address) {
            if (!this.hasItems) return null

            try {
                // First create the order
                const orderData = {
                    user: pb.authStore.model.id,
                    totalPrice: this.cartTotal,
                    status: 'pending'
                }

                const order = await pb.collection('orders').create(orderData)

                // Then create order items
                const orderItemPromises = this.items.map(item => {
                    return pb.collection('orderItems').create({
                        order: order.id,
                        product: item.id,
                        quantity: item.quantity,
                        price: item.price
                    })
                })

                await Promise.all(orderItemPromises)

                // Add shipping address if provided
                if (address) {
                    await pb.collection('shippingAddresses').create({
                        order: order.id,
                        user: pb.authStore.model.id,
                        ...address
                    })
                }

                // Clear cart after successful order
                this.clearCart()

                return order
            } catch (error) {
                console.error('Error creating order:', error)
                throw error
            }
        }
    }
})