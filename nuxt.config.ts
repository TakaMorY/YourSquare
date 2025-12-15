export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/supabase'],

  supabase: {
    redirect: false, // Отключаем автоматические редиректы
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: undefined,
      exclude: ['/', '/register', '/about'],
      cookieRedirect: false,
    }
  },

  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    }
  },


})