<script lang="ts" setup>
import { ref, provide } from 'vue';
import { NForm } from 'naive-ui';

const props = defineProps({
  model: {
    type: Object,
    required: true,
  },
  rules: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['submit']);

const formRef = ref();
const handleSubmit = (e: Event) => {
  e.preventDefault();
  formRef.value?.validate((errors: any) => {
    if (!errors) {
      emit('submit', props.model);
    }
  });
};

// 提供表单实例和模型给子组件
provide('ProFormContext', { formRef, model: props.model });
</script>

<template>
  <n-form
      ref="formRef"
      :model="model"
      :rules="rules"
      @submit="handleSubmit"
  >
    <slot />
  </n-form>
</template>