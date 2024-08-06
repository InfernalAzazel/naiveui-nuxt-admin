export default defineNuxtRouteMiddleware((to, from) => {

    const { public: { adminUid } } = useRuntimeConfig()
    console.log(adminUid)
    // if (user.value.id !== adminUid)
    //     return navigateTo('/')
})