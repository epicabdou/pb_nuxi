import { loadStripe } from '@stripe/stripe-js'

export const useStripe = () => {
  const config = useRuntimeConfig()
  const stripePublicKey = config.public.stripePublicKey

  // Initialize Stripe
  const initStripe = async () => {
    return await loadStripe(stripePublicKey)
  }

  // Create checkout session and redirect to Stripe
  const createCheckoutSession = async (payload) => {
    try {
      // Validate items before sending to API
      if (!payload.items || !Array.isArray(payload.items) || payload.items.length === 0) {
        console.error('Invalid cart items:', payload.items)
        throw new Error('Cart items are invalid or empty')
      }
      
      // Check each item has required properties
      payload.items.forEach((item, index) => {
        if (!item.price || isNaN(Number(item.price))) {
          console.error(`Item at index ${index} has invalid price:`, item)
          throw new Error(`Item "${item.name || 'unnamed'}" has invalid price: ${item.price}`)
        }
        if (!item.quantity || isNaN(Number(item.quantity))) {
          console.warn(`Item at index ${index} has invalid quantity, defaulting to 1:`, item)
          item.quantity = 1
        }
      })
      
      console.log('Sending payload to create-checkout-session API:', JSON.stringify(payload))
      
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create checkout session')
      }

      const { url } = await response.json()
      
      // Redirect to Stripe Checkout
      window.location.href = url
      
      return true
    } catch (error) {
      console.error('Error creating checkout session:', error)
      throw error
    }
  }

  return {
    initStripe,
    createCheckoutSession,
  }
}