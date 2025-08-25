export default defineNuxtConfig({
  // App meta
  app: {
    head: {
      title: 'Notes | Minimal Nuxt',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#1976d2' },
        { hid: 'description', name: 'description', content: 'A minimal notes app built with Nuxt 3.' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect rx="12" width="64" height="64" fill="%231976d2"/><path d="M18 20h28v4H18zm0 10h28v4H18zm0 10h20v4H18z" fill="white"/></svg>' }
      ]
    }
  },

  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  // Runtime config allows environment-based API endpoints
  runtimeConfig: {
    public: {
      // Use NUXT_PUBLIC_API_BASE env var when present, fallback to /api
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api'
    }
  },

  nitro: {
    routeRules: {
      "/**": {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    },
  },

  vite: {
    server: {
      host: '0.0.0.0',
      allowedHosts: true,
      port: 3000,
    },
  },
});
