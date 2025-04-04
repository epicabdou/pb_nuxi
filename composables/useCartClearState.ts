/**
 * This composable handles the cart clearing state persistence across redirects 
 * during the checkout process
 */
export const useCartClearState = () => {
  // Session storage key for cart clearing state
  const CART_CLEAR_KEY = 'cart_clearing_state'
  
  // Mark cart as needing to be cleared
  const markCartForClearing = (orderId: string, sessionId: string) => {
    if (process.client) {
      try {
        sessionStorage.setItem(CART_CLEAR_KEY, JSON.stringify({
          orderId,
          sessionId,
          timestamp: Date.now(),
          processed: false
        }))
        console.log(`Cart marked for clearing - Order: ${orderId}, Session: ${sessionId}`)
      } catch (error) {
        console.error('Failed to mark cart for clearing:', error)
      }
    }
  }
  
  // Check if cart needs to be cleared
  const getCartClearingState = () => {
    if (process.client) {
      try {
        const stateStr = sessionStorage.getItem(CART_CLEAR_KEY)
        if (stateStr) {
          return JSON.parse(stateStr)
        }
      } catch (error) {
        console.error('Failed to get cart clearing state:', error)
      }
    }
    return null
  }
  
  // Mark cart as cleared
  const markCartCleared = () => {
    if (process.client) {
      try {
        const state = getCartClearingState()
        if (state) {
          state.processed = true
          sessionStorage.setItem(CART_CLEAR_KEY, JSON.stringify(state))
          console.log('Cart clearing state updated - marked as processed')
          
          // Remove after a short delay to avoid potential race conditions
          setTimeout(() => {
            sessionStorage.removeItem(CART_CLEAR_KEY)
            console.log('Cart clearing state removed from session storage')
          }, 3000)
        }
      } catch (error) {
        console.error('Failed to mark cart as cleared:', error)
      }
    }
  }
  
  return {
    markCartForClearing,
    getCartClearingState,
    markCartCleared
  }
}