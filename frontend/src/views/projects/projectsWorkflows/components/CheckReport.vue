<template>
  <!-- <div
    class="checkReport p-[32px] dark:bg-[#1D1C1A] bg-[#ffffff] dark:text-white text-[#121211] rounded-[12px] mt-[32px]">
    <div class="text-[24px] font-bold mb-[32px]">{{ $t("workFlows.checkReport") }}</div>
    <div
      class="dark:bg-[#36322D] bg-[#ffffff] p-[32px] rounded-[12px] border border-solid dark:border-[#434343] border-[#EBEBEB] mb-[32px]">
      <div>shushishadadba.sol</div>
      <div>9:4 error only use indent of 1tab. indentation</div>
      <div>9:4 error only use indent of 1tab. indentation</div>
    </div>
    <div class="">
      <div class="mb-[16px]">Support by Ethlint.</div>
      <div>The rules have been taken from Consensys' Recommended Smart Contract Practices and Solium's Rule Wishlist.
      </div>
    </div>
  </div> -->

  <div class="dark:bg-[#1D1C1A] bg-[#ffffff] dark:text-white text-[#121211] p-[32px] rounded-[12px] mt-[32px]">
    <div class="dark:text-white text-[#121211]">
      <img src="" />
      <span class="text-[24px] font-bold">Contract Security Analysis Report</span>
      <a-collapse v-model:activeKey="activeKey" accordion expandIconPosition="left">
        <a-collapse-panel key="1" header="/tmp/MetaCoin.sol">
          <p>jjjjjjjjjjjjjj</p>
          <template #extra>
            <div>3 issues </div>
          </template>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="/tmp/killbilly.sol">
          <p>hhhhhhhhhhhhh</p>
          <template #extra>
            <div>3 issues </div>
          </template>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
  <!-- <div v-for="item in checkReportList" :key="item.id">
      
    </div> -->

</template>

<script setup lang="ts">
import { ref } from "vue";
import { toRefs } from 'vue';
import type { CollapseProps } from 'ant-design-vue';


const expandIconPosition = ref<CollapseProps['expandIconPosition']>('left');

const activeKey = ref(['1']);
const text = ref('qwertyuiqwertyu')
const props = defineProps({
  checkReportData: Object,
  checkReportList: Array,
})

const columns = [
  {
    title: 'Contract',
    dataIndex: 'contract',
    align: "center",
    key: 'contract',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    align: "center",
    key: 'category',
  },
  {
    title: 'Function()',
    dataIndex: 'function',
    align: "center",
    key: 'function',
  },
  {
    title: 'Visibility',
    dataIndex: 'visibility',
    align: "center",
    key: 'visibility',
  },
  {
    title: 'View/Pure',
    dataIndex: 'view',
    align: "center",
    key: 'view',
  },
  {
    title: 'Returns',
    dataIndex: 'returns',
    align: "center",
    key: 'returns',
  },
  {
    title: 'Modifiers',
    dataIndex: 'modifiers',
    align: "center",
    key: 'modifiers',
  }
];

const { checkReportData } = toRefs(props)

const handleClick = (event: MouseEvent) => {
  // If you don't want click extra trigger collapse, you can prevent this:
  event.stopPropagation();
};

</script>

<style lang="less" scoped>
@backGroundCOlor: #1D1C1A;

.checkReport {
  font-size: 16px;
}
</style>