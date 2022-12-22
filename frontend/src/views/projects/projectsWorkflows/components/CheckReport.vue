<template>
  <div
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
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';


const props = defineProps({
  checkReportData: Object,
})

const { checkReportData } = toRefs(props)

</script>

<style lang="less" scoped>
@backGroundCOlor: #1D1C1A;

.checkReport {
  font-size: 16px;
}
</style>