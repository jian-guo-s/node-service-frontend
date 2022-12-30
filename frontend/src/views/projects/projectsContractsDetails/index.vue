<template>
  <div class="contractSetails flex justify-between mb-[24px]">
    <Breadcrumb :currentName="'Hamster'"></Breadcrumb>
    <a-select class="select-dark" ref="select" v-model:value="contractDeployDetail.version" style="width: 180px"
      @change="handleChange">
      <a-select-option value="jack">Jack</a-select-option>
    </a-select>
  </div>
  <div class="dark:bg-[#1D1C1A] bg-[#ffffff] dark:text-white text-[#121211] p-[32px] rounded-[8px]">
    <a-tabs v-model:activeKey="activeKey" class="dark:text-white text-[#121211]">
      <a-tab-pane v-for="(item, key) in contractInfo" :key="key" :tab="key">
        <a-table :dataSource="item.deployInfo" :columns="columns" class="mb-[64px]"
          :customHeaderRow="customHeaderRowStyle" :pagination="false">
          <template #bodyCell="{ column }">
            <template v-if="column.key === 'action'">
              <a>Deploy</a>
            </template>
          </template>
        </a-table>
        <div class="">
          <div class="text-[24px] font-bold mb-[32px]">Contract List</div>
          <ContractList :abiInfo="item.abiInfo"></ContractList>
        </div>
      </a-tab-pane>
      <!-- <a-tab-pane key="1" tab="Tab 1">
        <a-table :dataSource="dataSource" :columns="columns" class="mb-[64px]" :customHeaderRow="customHeaderRowStyle">
          <template #bodyCell="{ column }">
            <template v-if="column.key === 'action'">
              <a>Deploy</a>
            </template>
          </template>
        </a-table>
        <div class="">
          <div class="text-[24px] font-bold mb-[32px]">Contract List</div>
          <ContractList></ContractList>
        </div>


      </a-tab-pane>
      <a-tab-pane key=" 2" tab="Tab 2" force-render>
        3
      </a-tab-pane> -->
    </a-tabs>
    <noData :hasData="hasData"></noData>
  </div>

</template>
<script lang='ts' setup>
import { ref, computed, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import Breadcrumb from "../components/Breadcrumb.vue";
import noData from "./components/noData.vue";
import ContractList from "./components/ContractList.vue";
import { apiGetContractDeployDetail } from "@/apis/workFlows";
const router = useRouter();
const queryJson = reactive({
  id: router.currentRoute.value.params?.id,
  version: router.currentRoute.value.params?.version,
})
const activeKey = ref()
const hasData = ref(true);
const dataSource = ref([]);
const columns = [
  {
    title: 'Network',
    dataIndex: 'network',
    align: "center",
    key: 'network',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    align: "center",
    customRender: ({ text }) => {
      if (!text) {
        return '-'
      }

    },
    key: 'address',
  },
  {
    title: 'Action',
    align: "center",
    key: 'action',
  }];

const tabList = reactive([]);
const contractDeployDetail = reactive({})
const contractInfo = reactive({})

const getContractDeployDetail = async () => {
  const { data } = await apiGetContractDeployDetail(queryJson)
  console.log(data, 'data')
  for (let key in data.contractInfo) {
    tabList.push(key)
  }
  Object.assign(contractDeployDetail, data)
  Object.assign(contractInfo, data.contractInfo)

  // console.log(contractDeployDetail, 'lll')
  // console.log(Object.keys(contractInfo), 'ppp')
  activeKey.value = Object.keys(contractInfo)[0]
}

const customHeaderRowStyle = (record: any, index: number) => {
  // return {
  //   style: {
  //     backGroundColor: '#E2B578',
  //   }
  // }
}

onMounted(() => {
  getContractDeployDetail()
})

</script>
<style lang='less' scoped>
@baseColor: #E2B578;

:deep(.ant-select-selection-item) {
  color: @baseColor;
}
</style>