<script lang="ts" setup>
import type {DropdownOption, MenuOption} from "naive-ui";
import {createDiscreteApi} from "naive-ui";
import type {ProTabData} from "k-naiveui-pro";
import {Icon} from '@iconify/vue';

const collapsed = ref(false)
const route = useRoute()
const router = useRouter()
const menus = ref<MenuOption[]>([])
const matched = route.matched
const selectedKey = ref<string>(route.path as string)
const openKeys = ref(matched && matched.length ? matched.map(item => item.path) : [])
const tabsRef = ref()
const {message} = createDiscreteApi(
    ['message'],
)
const {t} = useI18n()
const tabs = ref<ProTabData[]>([
  getRouteTitleAndPath('/admin/dashboard') || {}
  // { title: '首页', path: '/admin/dashboard'},
]);

function updateSelectedKey() {
  openKeys.value = matched.map(item => item.path)
  selectedKey.value = route.path
}

function getRouteTitleAndPath(path: string): { title: string; path: string } | null {
  const route = router.getRoutes().find(r => r.path === path);
  if (route) {
    return {
      title: route.meta?.title ? t(route.meta.title as string) : '未命名路由',
      path: route.path,
    };
  }
  return null;
}

function clickMenuItem(key: string) {
  if (/http(s)?:/.test(key))
    window.open(key)
  else
    router.push({path: key})
}

const options = [
  {
    label: '用户资料',
    key: 'profile',
    icon: renderIcon('ei:user')
  },
  {
    label: '编辑用户资料',
    key: 'editProfile',
    icon: renderIcon('material-symbols-light:edit-sharp')
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon('material-symbols-light:logout')
  }
]

const dropdownOptions = [
  {
    label: '刷新',
    key: 'refresh',
    icon: () =>
        h(Icon, {
          icon: 'carbon:renew',
        }),
  },
  {
    label: '关闭全部',
    key: 'close-all',
    icon: () =>
        h(Icon, {
          icon: 'carbon:close-outline',
        }),
  },
];

function handleSelect(key: string | number) {
  message.info(String(key))
}

const languageOptions = ref<DropdownOption[]>([
  {label: 'English', key: 'en'},
  {label: '中文', key: 'zh'},
  {label: 'Español', key: 'es'}
])

function handleLanguageSelect(key: string | number) {
  message.info(`选择的语言键值为：${key}`)
  // 在这里处理语言切换的逻辑
}

function handleTabSelect(path: string) {
  if (/http(s)?:/.test(path))
    window.open(path)
  else
    router.push({path: path})
}

function handleDropdownSelect(key: string) {
  if (key === 'refresh') {
    message.info(key)
  } else if (key === 'close-all') {
    tabs.value = tabs.value.slice(0, 1)
    tabsRef.value.setSelected(0)
    handleTabSelect(tabs.value[0].path || '');
  }
}

function syncTabsWithRoute() {
  const currentPath = route.fullPath;

  // 确保当前路由对应的选项卡已存在
  if (!tabs.value.some((tab) => tab.path === currentPath)) {
    tabs.value.push({
      title: t(route.meta.title as string),
      path: currentPath,
    });
  }

  // 找到当前路由在 tabs 中的索引
  const index = tabs.value.findIndex((tab) => tab.path === currentPath);

  // 如果找到索引，设置选中状态
  if (index !== -1 && tabsRef.value) {
    tabsRef.value.setSelected(index);
  }
}

watch(() => route.fullPath, () => {
  updateSelectedKey()
  syncTabsWithRoute()
})

onMounted(() => {
  menus.value =  generateNaiveUIMenu(rawMenuData)
  syncTabsWithRoute()
})
</script>

<template>

  <ProLayout
      v-model:collapsed="collapsed"
      :clickMenuItem="clickMenuItem"
      :menus="menus"
      :selectedKey="selectedKey"
  >
    <template #actions>
      <pro-toggle-theme/>
      <pro-toggle-language :options="languageOptions" @select="handleLanguageSelect"/>
      <pro-avatar :options="options" class="w-40" name="admin" round @select="handleSelect"/>
    </template>
    <template #footer>
      © 2024 Your Company. All rights reserved.
    </template>
    <ProTabs ref="tabsRef" v-model="tabs" borderStyle="bottom" @change-select="handleTabSelect">
      <template #toolbar>
        <n-dropdown :options="dropdownOptions" trigger="hover" @select="handleDropdownSelect">
          <Icon height="24" icon="ant-design:appstore-outlined" width="24"/>
        </n-dropdown>
      </template>
    </ProTabs>
    <n-el class="p-4 bg-gray-100 "  tag="div">
      <slot/>
    </n-el>
  </ProLayout>

</template>

<style scoped></style>
