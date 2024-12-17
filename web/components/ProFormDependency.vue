
<script lang="ts" setup>
import { inject, reactive, watch } from 'vue';

const props = defineProps({
  dependencies: {
    type: Array as () => string[],
    required: true,
  },
});

const formContext = inject('ProFormContext');
const dependenciesData = reactive({});

// 监听依赖字段数据
watch(
    () => props.dependencies.map((key) => formContext.model[key]),
    (newValues) => {
      props.dependencies.forEach((key, index) => {
        dependenciesData[key] = newValues[index];
      });
    },
    { immediate: true }
);
</script>

<template>
  <slot v-bind="dependenciesData" />
</template>
