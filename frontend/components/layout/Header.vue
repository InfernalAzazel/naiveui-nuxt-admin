<script setup lang="ts">
const {isMobile} = useDevice()
const {collapsed, toggleCollapsed} = useAdminState()
</script>

<template>
  <div class="p-2 pr-4 z-40 w-full h-12 flex justify-center items-center backdrop-filter backdrop-blur-md border-b">
    <LayoutLogo v-if="isMobile" :show-title="!isMobile" class="mr-2" />
    <div class="flex justify-center items-center gap-2">
      <div class="ml-1 cursor-pointer inline-flex justify-center items-center" @click="toggleCollapsed">
        <Icon :name="collapsed ? 'ant-design:menu-unfold-outlined' : 'ant-design:menu-fold-outlined'" class="w-5 h-5"  />
      </div>
    </div>
    <div class="flex-1"></div>
  </div>

</template>

<style scoped>

</style>