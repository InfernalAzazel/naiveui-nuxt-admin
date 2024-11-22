import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {NaiveUiResolver} from 'unplugin-vue-components/resolvers'
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
        '@nuxtjs/tailwindcss',
        '@nuxt/content'
    ],
    vite: {
        plugins: [
            AutoImport({
                imports: [
                    {
                        'naive-ui': [
                            'useDialog',
                            'useMessage',
                            'useNotification',
                            'useLoadingBar'
                        ]
                    }
                ]
            }),
            Components({
                resolvers: [NaiveUiResolver()]
            })
        ]
    },
    imports: {
        dirs: [
            'composables/**/*',
        ],
    },
    i18n,
    tailwindcss: {
        viewer: false,
        exposeConfig: true,
    },
    routeRules: {
        '/': {prerender: true},
        '/admin/**': {ssr: false},
        '/admin': {redirect: '/admin/dashboard'},
        '/docs/**': {ssr: false},
        '/api/**': {cors: true},
    },
})