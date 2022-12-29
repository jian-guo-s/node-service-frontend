<template>
  <div
    class="contracyList p-[32px] dark:bg-[#1D1C1A] bg-[#ffffff] dark:text-white text-[#121211] rounded-[12px] mt-[32px]">
    <div class="flex justify-between mb-[32px]">
      <span class="text-[24px] font-bold">{{ $t("workFlows.contractList") }}</span>
      <a-button class="btn">{{ $t('common.deploy') }}</a-button>
    </div>
    <a-table :dataSource="contractListData" :columns="columns" :pagination="false">
      <template #bodyCell="{ column }">
        <template v-if="column.key === 'action'">
          <a class="dark:text-[#E0DBD2] text-[#151210]">{{ $t('common.detail') }}</a>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";
import dayjs from "dayjs";

const columns = [{
  title: 'Contract',
  dataIndex: 'name',
  align: "center",
  key: 'name',
},
{
  title: 'Version',
  dataIndex: 'version',
  align: "center",
  key: 'version',
},
{
  title: 'Network',
  dataIndex: 'network',
  align: "center",
  key: 'network',
},
{
  title: 'Build Time',
  dataIndex: 'buildTime',
  align: "center",
  customRender: ({ text }) => {
    return dayjs(text).format('YYYY/MM/DD ss:hh:mm')
  },
  key: 'buildTime'
},
{
  title: 'Action',
  align: "center",
  key: 'action',
}];

const props = defineProps({
  contractListData: Array,
})
const { contractListData } = toRefs(props)

// const dataSource = ref(

// )

</script>

<style lang="less" scoped>
.btn {
  width: 131px;
  height: 43px;
  // background-color: @baseColor;
  // color: #fff;
  // border-color: @baseColor;
}

// .btn:hover,
// .btn:focus {
//   background-color: @baseColor;
//   color: #fff;
// }
</style>