// stores/cart.js
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [],
        isCartOpen: false
    }),
    
    // Ensure we load cart items on store initialization
    hydrate(storeState) {
        // When running on client side, load items from localStorage
        if (process.client) {
            const savedCart = localStorage.getItem('cart')
            if (savedCart) {
                try {
                    storeState.items = JSON.parse(savedCart)
                    console.log('Cart hydrated with items:', storeState.items.length)
                } catch (e) {
                    console.error('Failed to parse saved cart:', e)
                }
            }
        }
    },

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
            console.log('Cart store - Clearing cart, items before:', this.items.length)
            this.items = []
            
            // Make sure to clear localStorage directly too
            if (process.client) {
                console.log('Cart store - Removing cart from localStorage')
                localStorage.removeItem('cart')
            }
            
            // Save empty cart to localStorage
            this.saveCart()
            console.log('Cart store - Cart cleared, items after:', this.items.length)
        },

        // Toggle cart sidebar
        toggleCart() {
            this.isCartOpen = !this.isCartOpen
        },

        // Save cart to local storage
        saveCart() {
            if (process.client) {
                try {
                    // Create clean objects with only necessary properties
                    const simplifiedItems = this.items.map(item => {
                        const cleanItem = {
                            id: item.id,
                            name: item.name,
                            price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
                            quantity: item.quantity || 1,
                            image: item.image
                        };
                        
                        // Only include shortDescription if it has a value
                        if (item.shortDescription && typeof item.shortDescription === 'string' && item.shortDescription.trim() !== '') {
                            cleanItem.shortDescription = item.shortDescription;
                        }
                        
                        return cleanItem;
                    });
                    
                    localStorage.setItem('cart', JSON.stringify(simplifiedItems));
                    console.log(`Saved ${simplifiedItems.length} items to cart`);
                } catch (error) {
                    console.error('Failed to save cart:', error);
                }
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

                // We'll clear the cart only after successful payment, not here
                // Don't clear cart here: this.clearCart()

                console.log(`Order created: ${order.id} with ${this.items.length} items`)
                return order
            } catch (error) {
                console.error('Error creating order:', error)
                throw error
            }
        }
    }
})