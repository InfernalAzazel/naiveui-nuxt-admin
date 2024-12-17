<script setup lang="ts">
const { t } = useI18n()

definePageMeta({
  layout: 'admin',
  title: 'pages.system.role.title',
})


useHead({
  title: t('pages.system.role.title'),
})

const formData = reactive({
  username: '',
  gender: '',
  hobby: '',
});

const genderOptions = [
  { label: '男', value: 'male' },
  { label: '女', value: 'female' },
];

const onSubmit = (values: any) => {
  console.log('提交的表单数据:', values);
};

</script>

<template>
<div>接口</div>
  <ProForm :model="formData" @submit="onSubmit">
    <ProFormItem label="用户名" name="username" :rules="[ { required: true, message: '用户名不能为空' } ]">
      <ProFields type="input" v-model:value="formData.username" :fieldProps="{ placeholder: '请输入用户名' }" />
    </ProFormItem>

    <ProFormItem label="性别" name="gender">
      <ProFields
          type="select"
          v-model:value="formData.gender"
          :fieldProps="{ options: genderOptions }"
      />
    </ProFormItem>

    <ProFormDependency :dependencies="['gender']">
      <template #default="{ gender }">
        <ProFormItem v-if="gender === 'female'" label="兴趣爱好" name="hobby">
          <ProFields
              type="input"
              v-model:value="formData.hobby"
              :fieldProps="{ placeholder: '请输入兴趣爱好' }"
          />
        </ProFormItem>
      </template>
    </ProFormDependency>

    <n-button type="primary" html-type="submit">提交</n-button>
  </ProForm>
</template>

<style scoped>

</style>