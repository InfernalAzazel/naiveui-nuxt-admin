<script setup lang="ts">
</script>
<template>
  <NConfigProvider
      :inline-theme-disabled="true"
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