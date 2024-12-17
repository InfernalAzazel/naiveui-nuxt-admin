<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { NInput, NSelect, NDatePicker } from 'naive-ui';

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number, Object, Array, Date],
    default: null,
  },
  fieldProps: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['update:value']);
const componentMap = reactive({
  input: markRaw(NInput),
  select: markRaw(NSelect),
  'date-picker': markRaw(NDatePicker),
});

const value = computed({
  get: () => props.value,
  set: (val) => emit('update:value', val),
});
</script>

<template>
  <component
      :is="componentMap[type]"
      v-bind="fieldProps"
      v-model:value="value"
  />
</template>

