<script lang="ts" setup>
import type {MenuOption} from "naive-ui";

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
  <NLayout position="absolute" has-sider>
    <LayoutMenu />
    <NLayout  :native-scrollbar="false">
      <NLayoutHeader>
      </NLayoutHeader>
      <NLayoutContent
          embedded
          :native-scrollbar="false"
      >
        <slot  />
      </NLayoutContent>
    </NLayout>
  </NLayout>

</template>

<style scoped></style>
