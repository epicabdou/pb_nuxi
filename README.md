# Morrgana E-commerce Store

A Nuxt 3 e-commerce application with PocketBase and Stripe integration.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Stripe Integration

This application uses Stripe for payment processing. Follow these steps to set up the Stripe integration:

1. Create a [Stripe account](https://stripe.com) if you don't have one already.
2. Get your API keys from the Stripe Dashboard (Developers > API keys).
3. Copy the `.env.example` file to `.env` and update the Stripe variables:
   ```
   STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   ```

4. For webhook support (order status updates), you'll need to set up a webhook in the Stripe Dashboard:
   - Go to Developers > Webhooks > Add endpoint
   - Use your application URL with the webhook endpoint, e.g., `https://your-domain.com/api/webhook`
   - Add these events: `checkout.session.completed` and `checkout.session.expired`
   - Get the webhook signing secret and add it to your `.env` file:
     ```
     STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret
     ```

5. For local development, you can use the [Stripe CLI](https://stripe.com/docs/stripe-cli) to test webhooks:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```

## PocketBase Setup

The application uses PocketBase for the backend database:

1. Start the PocketBase server from the backend directory:
   ```bash
   cd backend
   ./pocketbase.exe serve
   ```
   
2. PocketBase admin UI will be available at `http://127.0.0.1:8090/_/`
3. Set up the admin account and ensure the database schema matches with the application

## Environment Variables

Copy the `.env.example` file to `.env` and update the variables according to your configuration:

```bash
cp .env.example .env
```

Update the following variables:
- `POCKETBASE_URL`: URL of your PocketBase instance
- `POCKETBASE_ADMIN_EMAIL` and `POCKETBASE_ADMIN_PASSWORD`: Admin credentials for webhook processing
- `STRIPE_PUBLIC_KEY` and `STRIPE_SECRET_KEY`: Your Stripe API keys
- `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook signing secret
- `PUBLIC_URL`: The public URL of your application (for redirects)
