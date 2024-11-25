<script lang="ts" setup>
import type {MenuOption, DropdownOption} from "naive-ui";
import {createDiscreteApi} from "naive-ui";
import type {ProTabData} from "k-naiveui-pro";
const {collapsed} = useAdminState()
const route = useRoute()
const router = useRouter()
const menus = ref<MenuOption[]>([])
const matched = route.matched
const selectedKey = ref<string>(route.path as string)
const openKeys = ref(matched && matched.length ? matched.map(item => item.path) : [])
const { message} = createDiscreteApi(
    ['message'],
)
const { t } = useI18n()
const tabs = ref<ProTabData[]>([
  // { title: '首页', path: '/admin/dashboard'},
]);
function updateSelectedKey() {
  openKeys.value = matched.map(item => item.path)
  selectedKey.value = route.path
}

function clickMenuItem(key: string) {
  if (/http(s)?:/.test(key))
    window.open(key)
  else
    router.push({ path: key })
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
function handleSelect(key: string | number) {
  message.info(String(key))
}

const languageOptions = ref<DropdownOption[]>([
  { label: 'English', key: 'en' },
  { label: '中文', key: 'zh' },
  { label: 'Español', key: 'es' }
])
function handleLanguageSelect(key: string | number) {
  message.info(`选择的语言键值为：${key}`)
  // 在这里处理语言切换的逻辑
}

function handleTabSelect(path: string) {
  message.info(path)
  if (/http(s)?:/.test(path))
    window.open(path)
  else
    router.push({ path: path })
}

watch(() => route.fullPath, () => {
  updateSelectedKey()
  // 确保当前路由对应的选项卡已存在
  if (!tabs.value.some((tab) => tab.path === route.fullPath)) {
    tabs.value.push({
      icon: route.meta.icon as string,
      title: t(route.meta.title as string),
      path: route.fullPath,
    });
  }
})

onMounted(()=>{
  menus.value = buildMenuList(router.options.routes)
})
</script>

<template>

  <ProLayout
      v-model:collapsed="collapsed"
      :menus="menus"
      :clickMenuItem="clickMenuItem"
      :selectedKey="selectedKey"
  >
    <template #actions>
      <pro-toggle-theme />
      <pro-toggle-language :options="languageOptions" @select="handleLanguageSelect"/>
      <pro-avatar class="w-40" :options="options" name="admin" @select="handleSelect" round/>
    </template>
    <template #footer>
      © 2024 Your Company. All rights reserved.
    </template>
    <ProTabs
        v-model="tabs"
        @select="handleTabSelect"
    />
    <ClientOnly>
      <slot  />
    </ClientOnly>
  </ProLayout>

</template>

<style scoped></style>
