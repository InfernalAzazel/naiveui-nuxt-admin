<script setup lang="ts">
const { t } = useI18n()

definePageMeta({
  layout: 'admin',
  // middleware: 'admin',
  title: 'pages.system.title',
  order: 99,
  icon: 'ant-design:setting-outlined',
})


useHead({
  title: t('pages.system.title'),
})
</script>

<template>
  <div class="h-full">
    <NuxtPage />
    666
  </div>
</template>