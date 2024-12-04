import type {MenuOption} from 'naive-ui'
/**
 * 递归生成 Naive UI Menu 数据
 * @param menuData - 菜单
 * @returns Naive UI Menu 数据
 */
export const generateNaiveUIMenu = (menuData: any[]): MenuOption[] => {
    return menuData.map((item) => {
        const menuOption: MenuOption = {
            label: item.label,
            key: item.path || item.key, // 使用 path 作为 key
            icon: item.icon ? renderIcon(item.icon) : undefined // 动态渲染图标
        };

        // 如果有子菜单，递归转换
        if (item.children) {
            menuOption.children = generateNaiveUIMenu(item.children);
        }
        return menuOption;
    });
}