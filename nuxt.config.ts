export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/supabase"],
  supabase: {
    redirect: false,
  },
});
