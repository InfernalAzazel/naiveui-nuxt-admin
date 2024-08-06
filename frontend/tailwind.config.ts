import type { Config } from 'tailwindcss'
import Typography from '@tailwindcss/typography'
import { getIconCollections, iconsPlugin } from '@egoist/tailwindcss-icons'

export default <Partial<Config>>{
    darkMode: 'class',
    theme: {},
    plugins: [
        iconsPlugin({
            collections: getIconCollections(['ri', 'mdi', 'uil', 'ant-design']),
        }),
        Typography,
    ],
}
