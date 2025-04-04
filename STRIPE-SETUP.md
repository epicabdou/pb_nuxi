# Step-by-Step Guide to Setting Up Stripe Webhooks

This guide walks you through setting up Stripe webhooks for your e-commerce application, including testing with the Stripe CLI.

## Prerequisites

- A Stripe account (sign up at [stripe.com](https://stripe.com))
- Your e-commerce application properly configured with Stripe
- Node.js and npm installed

## 1. Installing the Stripe CLI

The Stripe CLI allows you to test webhooks locally during development.

### For macOS (with Homebrew):
```bash
brew install stripe/stripe-cli/stripe
```

### For Windows (with Scoop):
```bash
scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git
scoop install stripe
```

### For Linux:
```bash
# Download the latest linux tar.gz file from https://github.com/stripe/stripe-cli/releases/latest
wget https://github.com/stripe/stripe-cli/releases/download/v1.13.6/stripe_1.13.6_linux_x86_64.tar.gz
tar -xvf stripe_1.13.6_linux_x86_64.tar.gz
sudo mv stripe /usr/local/bin
```

### Manual Installation:
You can also download the appropriate binary for your system from the [GitHub releases page](https://github.com/stripe/stripe-cli/releases).

## 2. Authenticate with Stripe

1. Run the following command:
   ```bash
   stripe login
   ```

2. The CLI will open your browser to authenticate with your Stripe account.

3. Give the CLI permission to access your account data.

4. Return to your terminal - you should see a success message.

## 3. Setting Up Webhooks in the Stripe Dashboard

For production use, you'll need to configure webhooks in the Stripe Dashboard:

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com/)

2. Navigate to **Developers > Webhooks**

3. Click **Add endpoint**

4. Enter your webhook endpoint URL:
   - For production: `https://your-domain.com/api/webhook`
   - For testing: You can use a service like [ngrok](https://ngrok.com/) to expose your local server

5. Select events to listen for:
   - `checkout.session.completed` (when a payment is successful)
   - `checkout.session.expired` (when a checkout session expires)

6. Click **Add endpoint** to create the webhook

7. After creating the webhook, you'll see a **Signing secret**. Click on **Reveal** to view it.

8. Copy this secret and add it to your environment variables:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_your_secret_here
   ```

## 4. Testing Webhooks Locally

The Stripe CLI lets you forward webhook events to your local server:

1. Start your development server:
   ```bash
   npm run dev
   ```

2. In a new terminal window, start the webhook forwarding:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```

3. The CLI will show a webhook signing secret. Copy this and update your `.env` file:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_xxxxx
   ```

4. Make sure your application is configured to use this secret for webhook signature verification.

## 5. Trigger Test Webhook Events

To test the webhook integration:

1. With your server running and Stripe CLI listening, trigger a test event:
   ```bash
   stripe trigger checkout.session.completed
   ```

2. The CLI will create a test event and forward it to your application.

3. Check your server logs to confirm the webhook was received and processed correctly.

4. You can trigger other events similarly:
   ```bash
   stripe trigger checkout.session.expired
   ```

## 6. Debugging Webhook Issues

If your webhooks aren't working as expected:

1. Check the Stripe CLI output for any errors

2. Verify your application's webhook handler is correctly set up to:
   - Parse the raw request body
   - Verify the webhook signature
   - Process the event type appropriately

3. In the Stripe Dashboard, you can view webhook attempts under **Developers > Webhooks > [Your Endpoint] > Recent events**

4. Make sure your environment variables are correctly set, especially `STRIPE_WEBHOOK_SECRET`

## 7. Going to Production

When deploying to production:

1. Update your environment variables on your production server

2. Make sure your production URL is set in the Stripe Dashboard webhook configuration

3. Monitor your webhook events in the Stripe Dashboard to ensure they're being delivered and processed

4. Set up proper error handling and retries for webhook processing

## Common Webhook Events to Handle

In an e-commerce application, consider handling these events:

- `checkout.session.completed`: Update order status to paid, confirm the order
- `checkout.session.expired`: Mark the order as abandoned/cancelled
- `payment_intent.succeeded`: Confirm payment has processed successfully
- `payment_intent.payment_failed`: Handle payment failures

## Security Considerations

- Always verify webhook signatures to prevent forgery
- Store the webhook secret securely (environment variables, not in code)
- Implement idempotency handling to prevent duplicate processing
- Return 2xx responses promptly to acknowledge receipt (even if processing will take time)