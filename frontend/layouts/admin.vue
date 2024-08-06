<script lang="ts" setup>
import type {MenuOption} from "naive-ui";

const route = useRoute()
const router = useRouter()
const menus = ref<MenuOption[]>([])
const matched = route.matched

const selectedKey = ref<string>(route.path as string)
const openKeys = ref(matched && matched.length ? matched.map(item => item.path) : [])

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
    <LayoutSider />
    <NLayout  :native-scrollbar="false">
      <NLayoutHeader>
        <LayoutHeader />
        <LayoutTabs />
      </NLayoutHeader>
      <NLayoutContent
          class="h-[100%] bg-blue-50"
          embedded
          :native-scrollbar="false"
      >
        <ClientOnly>
          <slot  />
        </ClientOnly>
      </NLayoutContent>
<!--      <NLayoutFooter bordered  position="absolute">-->
<!--        <LayoutFooter />-->
<!--      </NLayoutFooter>-->
    </NLayout>
  </NLayout>

</template>

<style scoped></style>
