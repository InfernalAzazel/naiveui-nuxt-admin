import { Icon } from '#components'

export function renderIcon(icon: string) {
    return () => h(Icon, { name: icon })
}