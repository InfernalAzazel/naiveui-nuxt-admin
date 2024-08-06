import { breakpointsTailwind } from '@vueuse/core'

export function useDevice() {
    const breakpoints = useBreakpoints(breakpointsTailwind)

    const sm = breakpoints.smaller('sm')
    const isMobile = ref<boolean>(sm.value)

    watch(sm, (val: boolean) => {
        isMobile.value = val

    })
    return {
        isMobile,
    }
}