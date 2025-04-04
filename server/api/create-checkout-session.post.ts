import { H3Event } from 'h3'
import Stripe from 'stripe'

export default defineEventHandler(async (event: H3Event) => {
  try {
    // Get the request body (cart items and other checkout data)
    const body = await readBody(event)
    const { items, userId, orderId, customerEmail, shippingDetails } = body
    
    // Validate input data
    if (!items || !Array.isArray(items) || items.length === 0) {
      console.error('Invalid or empty items array:', items)
      throw createError({
        statusCode: 400,
        message: 'Invalid or empty cart items'
      })
    }
    
    // Log the full checkout request
    console.log('Checkout request:', {
      itemsCount: items.length,
      userId,
      orderId,
      customerEmail
    })

    // Initialize Stripe with your secret key
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2023-10-16',
    })

    // Log the items received for debugging
    console.log('Creating Stripe checkout with items:', JSON.stringify(items))
    
    // Create line items for Stripe checkout
    const lineItems = items.map((item: any) => {
      // Ensure we have valid pricing data
      if (!item.price || isNaN(Number(item.price))) {
        console.error(`Invalid price for item: ${item.name}, price: ${item.price}`)
        throw new Error(`Invalid price for item: ${item.name}`)
      }
      
      // Construct image URL correctly if needed
      let imageUrl = null
      if (item.image) {
        // If it's already a full URL
        if (typeof item.image === 'string' && (item.image.startsWith('http://') || item.image.startsWith('https://'))) {
          imageUrl = item.image
        } else {
          // If it's just a filename, construct the PocketBase URL
          const pocketbaseUrl = process.env.POCKETBASE_URL || 'http://127.0.0.1:8090'
          // Use PUBLIC_URL since this needs to be accessible from outside
          const publicUrl = process.env.PUBLIC_URL || 'http://localhost:3000'
          
          // If we have product ID, construct a direct URL to the image
          if (item.id) {
            imageUrl = `${pocketbaseUrl}/api/files/products/${item.id}/${item.image}`
          }
        }
      }
      
      // If we still don't have a valid image URL, don't include images
      const productImages = imageUrl ? [imageUrl] : []
      
      // For debugging, log the image URLs
      if (productImages.length > 0) {
        console.log(`Product ${item.name} images:`, productImages)
      }
      
      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name || 'Product',
            images: productImages,
            // Only include description if it's not empty
            ...(item.shortDescription ? { description: item.shortDescription } : {}),
            metadata: {
              productId: item.id
            }
          },
          unit_amount: Math.round(parseFloat(item.price) * 100), // Convert to cents
        },
        quantity: parseInt(item.quantity) || 1
      }
    })

    // Calculate tax and shipping if needed
    const taxRate = 0.08 // 8% tax (adjust as needed)
    const cartTotal = items.reduce((total: number, item: any) => total + (item.price * item.quantity), 0)
    const shippingCost = cartTotal >= 100 ? 0 : 10

    // Add shipping as a line item if there is a cost
    if (shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Shipping',
            description: 'Standard shipping',
          },
          unit_amount: shippingCost * 100, // Convert to cents
        },
        quantity: 1
      })
    }

    // Create the Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.PUBLIC_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`,
      cancel_url: `${process.env.PUBLIC_URL || 'http://localhost:3000'}/checkout/cancel`,
      customer_email: customerEmail,
      client_reference_id: orderId,
      metadata: {
        userId,
        orderId
      },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'FR', 'DE', 'ES', 'IT', 'BE', 'CH'],
      },
      // Optional: Pre-fill shipping information if available
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: shippingCost * 100,
              currency: 'eur',
            },
            display_name: 'Standard Shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 3,
              },
              maximum: {
                unit: 'business_day',
                value: 5,
              },
            }
          }
        }
      ],
    })

    // Return the session ID to the client
    return { 
      sessionId: session.id,
      url: session.url
    }
  } catch (error: any) {
    console.error('Error creating checkout session:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to create checkout session',
    })
  }
})