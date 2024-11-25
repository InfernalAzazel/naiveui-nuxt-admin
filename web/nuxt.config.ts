import { i18n } from './config/i18n'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},
    ssr: false,
    modules: [
        'nuxtjs-naive-ui',
        '@vueuse/nuxt',
        "@nuxtjs/i18n",
        '@nuxt/icon',
        '@nuxt/content',
        '@unocss/nuxt',
    ],
    imports: {
        dirs: [
            'composables/**/*',
        ],
    },
    i18n,
    routeRules: {
        '/': {prerender: true},
        '/admin/**': {ssr: false},
        '/admin': {redirect: '/admin/dashboard'},
        '/docs/**': {ssr: false},
        '/api/**': {cors: true},
    },
})