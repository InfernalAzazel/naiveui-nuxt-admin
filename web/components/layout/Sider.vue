<script lang="ts" setup>

const {collapsed, toggleCollapsed} = useAdminState()
const {isMobile} = useDevice()
const showSideDrawer = computed({
  get: () => isMobile.value && !collapsed.value,
  set: (val: any) => {
    collapsed.value = !val
  },
})

</script>

<template>
  <NLayoutSider
      v-if="!isMobile"
      :collapsed="collapsed"
      :native-scrollbar="false"
      bordered
      class="min-h-screen relative z-20 transition-all duration-200 ease-in-out shadow-md"
      collapse-mode="width"
      show-trigger="bar"
      @collapse="toggleCollapsed"
      @expand="toggleCollapsed"
  >
    <LayoutLogo
        :show-title="!(collapsed || isMobile)"
        class="flex h-12"
    />
    <LayoutMenu/>
  </NLayoutSider>
  <NDrawer
      v-else
      v-model:show="showSideDrawer"
      placement="left"
      class="min-h-screen relative z-20 transition-all duration-200 ease-in-out"
  >
    <LayoutLogo class="flex h-12" />
    <LayoutMenu />
  </NDrawer>
</template>

<style scoped>

</style>