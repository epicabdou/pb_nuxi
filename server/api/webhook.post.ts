import { H3Event } from 'h3'
import Stripe from 'stripe'
import PocketBase from 'pocketbase'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2023-10-16',
    })

    // Get the signature from the headers
    const signature = getRequestHeader(event, 'stripe-signature') as string
    if (!signature) {
      throw new Error('No Stripe signature found')
    }

    // Get the raw body as text
    const rawBody = await readRawBody(event, 'utf8')
    if (!rawBody) {
      throw new Error('No raw body found')
    }

    // Verify the event with Stripe
    let stripeEvent
    try {
      stripeEvent = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET || ''
      )
    } catch (err: any) {
      console.error(`Webhook signature verification failed: ${err.message}`)
      throw createError({
        statusCode: 400,
        message: `Webhook Error: ${err.message}`,
      })
    }

    // Initialize PocketBase
    const pb = new PocketBase(process.env.POCKETBASE_URL || 'http://127.0.0.1:8090')
    
    // Authenticate with admin credentials (for webhooks)
    try {
      await pb.admins.authWithPassword(
        process.env.POCKETBASE_ADMIN_EMAIL || '',
        process.env.POCKETBASE_ADMIN_PASSWORD || ''
      )
    } catch (error) {
      console.error('PocketBase admin authentication failed:', error)
      throw createError({
        statusCode: 500,
        message: 'Failed to authenticate with the database',
      })
    }

    // Handle the event
    switch (stripeEvent.type) {
      case 'checkout.session.completed':
        const session = stripeEvent.data.object as Stripe.Checkout.Session

        // Get the order ID from the session metadata
        const orderId = session.metadata?.orderId
        if (!orderId) {
          throw new Error('No order ID found in session metadata')
        }

        // Update the order status to 'paid'
        await pb.collection('orders').update(orderId, {
          status: 'paid',
        })

        // Create a payment record
        await pb.collection('payments').create({
          order: orderId,
          user: session.metadata?.userId,
          amount: session.amount_total ? session.amount_total / 100 : 0, // Convert from cents
          paymentMethod: 'credit_card', // Assuming Stripe payment is credit card
          status: 'completed',
        })
        
        console.log(`Payment completed for order: ${orderId} - Cart will be cleared on success page`)

        break

      case 'checkout.session.expired':
        // Handle expired checkout sessions
        const expiredSession = stripeEvent.data.object as Stripe.Checkout.Session
        const expiredOrderId = expiredSession.metadata?.orderId
        
        if (expiredOrderId) {
          // Update the order status to 'cancelled'
          await pb.collection('orders').update(expiredOrderId, {
            status: 'cancelled',
          })
        }
        break

      // Add handlers for other webhook events as needed
    }

    return { received: true }
  } catch (error: any) {
    console.error('Webhook error:', error)
    throw createError({
      statusCode: 500,
      message: error.message || 'Webhook processing failed',
    })
  }
})