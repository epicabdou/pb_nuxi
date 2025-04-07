// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  // Set default rendering mode to client-side only
  ssr: false,

  routeRules: {
    // Make API routes server-rendered
    '/api/**': {
      ssr: true,  // Enable SSR for API routes
      cors: true  // Keep your CORS settings
    },

    // Your existing redirects can stay the same
    '/privacy': { redirect: '/privacy-policy' },
    '/terms': { redirect: '/terms-conditions' },
    '/tags': { redirect: '/products' }
  },
  hooks: {
    'pages:extend': (pages) => {
      pages.forEach(route => {
        // Apply admin middleware to all dashboard routes
        if (route.path.startsWith('/dashboard')) {
          route.meta = route.meta || {}
          route.meta.middleware = route.meta.middleware || []
          if (!route.meta.middleware.includes('admin')) {
            route.meta.middleware.push('admin')
          }
        }
      })
      pages.forEach(route => {
        // Apply admin middleware to all account routes
        if (route.path.startsWith('/account')) {
          route.meta = route.meta || {}
          route.meta.middleware = route.meta.middleware || []
          if (!route.meta.middleware.includes('auth')) {
            route.meta.middleware.push('auth')
          }
        }
      })
    }
  },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', 'nuxt-lucide-icons'],
  // Runtime config
  runtimeConfig: {
    // Server-side environment variables
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    pocketbaseAdminEmail: process.env.POCKETBASE_ADMIN_EMAIL,
    pocketbaseAdminPassword: process.env.POCKETBASE_ADMIN_PASSWORD,
    public: {
      pocketbaseUrl: process.env.POCKETBASE_URL || 'http://127.0.0.1:8090',
      stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
      publicUrl: process.env.PUBLIC_URL || 'http://localhost:3000'
    }
  },
  app: {
    head: {
      title: 'Ajimall Store',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      htmlAttrs: {
        lang: 'fr',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ]
    }
  },
  
})