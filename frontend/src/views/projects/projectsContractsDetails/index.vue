<template>
  <div class="contractSetails flex justify-between mb-[24px]">
    <Breadcrumb :currentName="'Hamster'"></Breadcrumb>
    <a-select class="select-dark" ref="select" v-model:value="value1" style="width: 180px" @change="handleChange">
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
import { ref, computed } from "vue";
import MathTest from "../json/MathTest.json";
import SimpleStorage from "../json/SimpleStorage.json";
import Breadcrumb from "../components/Breadcrumb.vue";
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
  // return {
  //   style: {
  //     backGroundColor: '#E2B578',
  //   }
  // }
}

const themeValue = computed(() => { localStorage.getItem('themeValue') })
</script>
<style lang='less' scoped>
@baseColor: #E2B578;

:deep(.ant-table-thead>tr>th) {
  background-color: @baseColor;
  border-bottom: 1px solid @baseColor;
  color: #ffffff;
}

:deep(.ant-select-selection-item) {
  color: @baseColor;
}
</style>