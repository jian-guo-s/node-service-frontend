<template>
  <div
    class="contracyList p-[32px] dark:bg-[#1D1C1A] bg-[#ffffff] dark:text-white text-[#121211] rounded-[12px] mt-[32px]">
    <div class="flex justify-between mb-[32px]">
      <span class="text-[24px] font-bold">Contract List</span>
      <a-button class="btn">Deploy</a-button>
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
  align: "center",
  key: 'name',
},
{
  title: 'Version',
  dataIndex: 'age',
  align: "center",
  key: 'age',
},
{
  title: 'Network',
  dataIndex: 'address',
  align: "center",
  key: 'address',
},
{
  title: 'Build Time',
  dataIndex: 'address',
  align: "center",
  key: 'address'
},
{
  title: 'Action',
  align: "center",
  key: 'action',
}];

const dataSource = ref(

)

</script>

<style lang="less" scoped>
@baseColor: #E2B578;

.btn {
  width: 131px;
  height: 43px;
  background-color: @baseColor;
  color: #fff;
  border-color: @baseColor;
}

.btn:hover,
.btn:focus {
  background-color: @baseColor;
  color: #fff;
}
</style>