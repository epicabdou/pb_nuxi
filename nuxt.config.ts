// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,
  hooks: {
    'prerender:routes' ({ routes }) {
      routes.clear() // Do not generate any routes (except the defaults)
    },
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
    public: {
      pocketbaseUrl: process.env.POCKETBASE_URL || 'http://127.0.0.1:8090'
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
  nitro: {
    output: {
      dir: '~/backend/pb_public'
    }
  }
})