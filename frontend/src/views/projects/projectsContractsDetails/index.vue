<template>
  <div class="flex justify-between">
    <div>导航</div>
    <a-select ref="select" v-model:value="value1" style="width: 180px" @change="handleChange">
      <a-select-option value="jack">Jack</a-select-option>
    </a-select>
  </div>
  <div class="dark:bg-[#1D1C1A] bg-[#ffffff] dark:text-white text-[#121211] p-[32px] rounded-[8px]">
    <a-tabs v-model:activeKey="activeKey" class="dark:text-white text-[#121211]">
      <a-tab-pane key="1" tab="Tab 1">
        <a-table :dataSource="dataSource" :columns="columns" class="mb-[64px]" :customHeaderRow="customHeaderRowStyle">
          <template #bodyCell="{ column }">
            <template v-if="column.key === 'action'">
              <a>Deploy</a>
            </template>
          </template>
        </a-table>
        <div class="">
          <div class="text-[24px] font-blod mb-[32px]">Contract List</div>
          <ContractList></ContractList>
        </div>


      </a-tab-pane>
      <a-tab-pane key=" 2" tab="Tab 2" force-render>
        3
      </a-tab-pane>
    </a-tabs>
    <noData :hasData="hasData"></noData>
  </div>

</template>
<script lang='ts' setup>
import { ref } from "vue";
import MathTest from "../json/MathTest.json";
import SimpleStorage from "../json/SimpleStorage.json";
import noData from "./components/noData.vue";
import ContractList from "./components/ContractList.vue";
const activeKey = ref('1')
const hasData = ref(true);
const dataSource = ref([]);
const columns = [
  {
    title: 'Network',
    dataIndex: 'name',
    key: 'Network',
  },
  {
    title: 'Network',
    dataIndex: 'name',
    key: 'Network',
  },
  {
    title: 'Action',
    key: 'action',
  }];

const customHeaderRowStyle = (record: any, index: number) => {
  return {
    style: {
      backGroundColor: '#E2B578',
    }
  }
}
</script>
<style lang='less' scoped>
:deep(.ant-table-thead>tr>th) {
  background-color: #E2B578 !important;
  color: #ffffff;
}

// .ant-table-thead {
//   background-color: #E2B578;
// }
</style>