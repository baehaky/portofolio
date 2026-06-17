// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: import.meta.env.IS_PROD },
  runtimeConfig: {
    public: {
      emailjsServiceId: import.meta.env.NUXT_PUBLIC_EMAILJS_SERVICE_ID,
      emailjsTemplateId: import.meta.env.NUXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      emailjsPublicKey: import.meta.env.NUXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      siteKey: import.meta.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY,
    },
  },
  modules: [
    "@nuxt/content",
    "@nuxt/fonts",
    "@nuxt/a11y",
    "@nuxt/hints",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxtjs/turnstile",
  ],
});
