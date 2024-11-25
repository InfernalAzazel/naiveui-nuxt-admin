import naive from 'naive-ui'
import KNaiveUiPro from 'k-naiveui-pro'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(naive)
    nuxtApp.vueApp.use(KNaiveUiPro)
})