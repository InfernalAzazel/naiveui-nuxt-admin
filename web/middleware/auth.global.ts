export default defineNuxtRouteMiddleware((to, from) => {

    const { public: { adminUid } } = useRuntimeConfig()
    console.log('aaaa', to)
    // if (user.value.id !== adminUid)
    //     return navigateTo('/')
})