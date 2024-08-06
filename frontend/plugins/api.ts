export default defineNuxtPlugin((nuxtApp) => {

    const api = $fetch.create({
        // 请求拦截
        async onRequest({ options }) {
            // 这里处理你的token
            const state = useGlobalState()
            options.headers = Object.assign(options.headers || {}, {
                // 如果 access_token 存在，则设置 Authorization 头部
                ...(state.value.access_token ? { 'Authorization': `Bearer ${state.value.access_token}` } : {}),
                // 如果locale存在，则设置 Customize-Language 头部
                ...(state.value.locale ? { 'Customize-Language': state.value.locale} : {}),
            })
        },
        // 正常响应
        async onResponse({ response }) {

        },
        // 响应异常
        async onResponseError({ response, options }) {
            options?.params?.noMessage || console.log(response._data?.message || '服务器错误')
        },
    })

    // Expose to useNuxtApp().$api
    return {
        provide: {
            api
        }
    }
})
