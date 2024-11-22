import type {MenuOption} from 'naive-ui'
import type {RouteRecordName, RouteRecordRaw} from 'vue-router'

interface MenuRoute {
    key: string
    label?: string
    name?: RouteRecordName
    icon?: string
    children?: MenuRoute[]
}



function getKey(path: string, parentPath: string) {
    return path.startsWith('http') ? path : `${parentPath}${parentPath ? '/' : ''}${path}`
}

/**
 * 构建菜单列表
 *
 * 此函数递归遍历路由数组，为每个路由生成一个菜单项。
 * 只有当路由具有特定的元数据时，它才会被包括在内。
 *
 * @param routes - Vue 路由配置数组。
 * @param parentPath - 父路由的路径，用于构建完整的路径键。
 * @returns 一个包含菜单项的数组。
 */
export function buildMenuList(routes: Readonly<RouteRecordRaw[]>, parentPath = ''): MenuOption[] {
    const i18n = useNuxtApp().$i18n
    // 初始化空菜单列表
    const menuList: MenuOption[] = [];

    // 过滤和排序路由
    routes
        .filter(route => route.meta?.layout === 'admin')    // 只包含 layout 为 'admin' 的路由
        .filter(route => !route.meta?.hideMenu)                      // 忽略 meta 中设置了 hideMenu 的路由
        .sort((a, b) => (a.meta!.order as number) - (b.meta!.order as number))  // 根据 meta 的 order 属性排序
        .forEach((route) => {
            const {meta, path, children, name} = route;
            const {title, icon} = meta!;

            // 创建单个菜单项
            const menu: MenuOption = {
                label: i18n.t(title) as string,     // 菜单项显示的标题
                key: getKey(path, parentPath),      // 菜单项的唯一键
                name,                               // 路由名称
                path,                               // 路由路径
                icon: renderIcon(icon as string),   // 渲染图标
            };

            // 如果存在子路由，递归构建子菜单
            if (children && children.length > 0) {
                menu.children = buildMenuList(children, menu.key);
            }

            // 将菜单项添加到菜单列表中
            menuList.push(menu);
        });

    return menuList;
}

export function buildRouteList(routes: Readonly<RouteRecordRaw[]>, parentPath = '') {
    const i18n = useNuxtApp().$i18n

    const routeList: MenuRoute[] = []

    routes
        .filter(route => route.meta?.layout === 'admin')
        .filter(route => !route.meta?.hideMenu)
        .sort((a, b) => a.meta!.order as number - (b.meta!.order as number))
        .forEach((route) => {
            const {meta, path, children, name} = route
            const {title, icon} = meta!

            const menu: MenuRoute = {
                label: i18n.t(title),
                key: getKey(path, parentPath),
                name,
                path,
                icon,
            }

            if (children && children.length > 0)
                menu.children = buildRouteList(children, menu.key as string)

            routeList.push(menu)
        })

    return routeList
}

export function useAuth() {
    const router = useRouter()

    // useState 所存放值不能是不可序列化的，如 renderIcon
    const routeList = useState('routeList', () => buildRouteList(router.options.routes))

    return {
        routeList,
        // TODO: premissionList
    }
}
