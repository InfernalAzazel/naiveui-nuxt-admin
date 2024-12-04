
export const rawMenuData = [
    {
        label: 'Dashboard',
        path: '/admin/dashboard',
        icon: 'ant-design:setting-outlined'
    },
    {
        label: 'System',
        key: '/admin/system',
        path: '/admin/system',
        icon: 'ant-design:setting-outlined',
        children: [
            {
                label: 'Role',
                path: '/admin/system/role',
                icon: 'ant-design:setting-outlined'
            },
            {
                label: 'Menu',
                path: '/admin/system/menu',
                icon: 'ant-design:setting-outlined'
            }
        ]
    }
];