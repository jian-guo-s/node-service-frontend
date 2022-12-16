<template>
  <div>
    <div class="flex justify-between mb-[24px]">
      <span>Contract List</span>
      <a-button>Deploy</a-button>
    </div>
    <a-table :dataSource="dataSource" :columns="columns">
      <template #bodyCell="{ column }">
        <template v-if="column.key === 'action'">
          <a>Deploy</a>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const columns = [{
  title: 'Contract',
  dataIndex: 'name',
  key: 'name',
},
{
  title: 'Version',
  dataIndex: 'age',
  key: 'age',
},
{
  title: 'Network',
  dataIndex: 'address',
  key: 'address',
},
{
  title: 'Build Time',
  dataIndex: 'address',
  key: 'address'
},
{
  title: 'Action',
  key: 'action',
}];

const dataSource = ref(

)

</script>

<style lang="less" scoped>

</style>