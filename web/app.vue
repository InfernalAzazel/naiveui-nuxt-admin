<script setup lang="ts">
import '@unocss/reset/tailwind-compat.css'
import type { GlobalTheme } from 'naive-ui'
const theme = ref<GlobalTheme | null>(null)
</script>
<template>
  <NConfigProvider
      :theme="theme"
  >
    <!--      <NuxtLoadingIndicator :color="themeColor" />-->

    <NMessageProvider>
      <NNotificationProvider>
        <NDialogProvider>
          <NuxtLayout>
            <NuxtPage />
          </NuxtLayout>
        </NDialogProvider>
      </NNotificationProvider>
    </NMessageProvider>
    <NGlobalStyle />
  </NConfigProvider>
</template>