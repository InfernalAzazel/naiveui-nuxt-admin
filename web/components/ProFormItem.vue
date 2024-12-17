<script lang="ts" setup>
import { inject } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
  rules: {
    type: [Object, Array],
    default: () => [],
  },
});

// 获取表单上下文
const formContext = inject('ProFormContext');
</script>

<template>
  <n-form-item :label="label" :path="name" :rule="rules">
    <slot />
  </n-form-item>
</template>

