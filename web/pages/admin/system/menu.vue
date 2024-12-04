<script setup lang="ts">
const { t } = useI18n()
import type { DataTableColumns } from 'naive-ui'
import { NButton } from 'naive-ui'
definePageMeta({
  layout: 'admin',
  // middleware: 'admin',
  title: 'pages.system.menu.title',
})

useHead({
  title: t('pages.system.menu.title'),
})
interface RowData {
  name: string
  index: string
  children?: RowData[]
}
const data: any[] = [
  {
    id: '07akioni',
    name: '07',
    mark: '07',
    path: '07',
    sort: '07',
    type: '07',
    children: [
      {
        id: '07akioni',
        name: '07',
        mark: '07',
        path: '07',
        sort: '07',
        type: '07',
      },
      {
        id: '07akioni',
        name: '07',
        mark: '07',
        path: '07',
        sort: '07',
        type: '07',
      }
    ]
  },
  {
    name: '11akioni',
    index: '11'
  }
]
const columns: DataTableColumns<RowData> = [
  {
    title: 'ID',
    key: 'id'
  },
  {
    title: '权限名称',
    key: 'name'
  },
  {
    title: '权限标识',
    key: 'permission'
  },
  {
    title: '菜单路径',
    key: 'path'
  },
  {
    title: '菜单排序',
    key: 'sort'
  },
  {
    title: '类型',
    key: 'type'
  },
  {
    title: '操作',
    key: 'actions',
    render(row) {
      return h(
          NButton,
          {
            size: 'small',
          },
          { default: () => '排序' }
      )
    }
  }
]



</script>

<template>
  <div >
    <n-space vertical :size="12">
      <n-space>
        <n-button >全部展开</n-button>
        <n-button >全部收缩</n-button>
      </n-space>
      <n-data-table
          :columns="columns"
          :data="data"
          default-expand-all
      />
    </n-space>
  </div>
</template>