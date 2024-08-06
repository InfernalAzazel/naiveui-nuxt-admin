<script setup lang="ts">
import type {MenuOption} from "naive-ui";

const {collapsed} = useAdminState()

const route = useRoute()
const router = useRouter()
const menus = ref<MenuOption[]>([])
const matched = route.matched

const selectedKey = ref<string>(route.path as string)
const openKeys = ref(matched && matched.length ? matched.map(item => item.path) : [])

function clickMenuItem(key: string) {
  if (/http(s)?:/.test(key))
    window.open(key)
  else
    router.push({ path: key })
}

function updateSelectedKey() {
  const matched = route.matched
  openKeys.value = matched.map(item => item.path)
  selectedKey.value = route.path
}

watch(() => route.fullPath, () => {
  updateSelectedKey()
})

onMounted(()=>{
  menus.value = buildMenuList(router.options.routes)
})
</script>

<template>
  <NMenu
      mode="vertical"
      :collapsed="collapsed"
      :open-keys="openKeys"
      :options="menus"
      :value="selectedKey"
      @update:value="clickMenuItem"

  />
</template>

<style scoped>

</style>