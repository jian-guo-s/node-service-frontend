<template>
  <div class="mt-4 dark:bg-[#1D1C1A] bg-[#FFFFFF] rounded-[16px] py-[24px] px-[32px]">
    <div class="flex justify-between">
      <div class="mb-[32px] items-center">
        <div v-if="viewType === 'detail'" class="text-[24px]">Overview</div>
        <div v-else class="flex items-center">
          <div class="text-[24px] dark:font-bold font-normal cursor-pointer">
            <a href="#/projects/1/details">Hamster</a>
          </div>
          <div class="ml-4 rounded-[18px] px-2 border border-solid border-[#434343]">Contract</div>
        </div>
      </div>
      <div>
        <a-button type="primary">Check</a-button>
        <a-button type="primary" class="ml-4">Build</a-button>
        <a-button type="primary" class="ml-4">Deploy</a-button>
        <a-button type="primary" class="ml-4">Ops</a-button>
      </div>
    </div>  
    <div class="py-[24px] px-[32px] border border-solid border-[#434343]">
      <div class="grid grid-cols-5 gap-4">
        <div class="col-span-2">
          <div>代码仓库</div>
          <div>https://github.com/hamster-shared/hamster.git</div>
          <div>master</div>
        </div>
        <div class="text-center">
          <div>Recent Check</div>
          <div>No Data</div>
          <div>Check Now</div>
        </div>
        <div class="text-center">
          <div>Recent Build</div>
          <div>No Data</div>
          <div>Build Now</div>
        </div>
        <div class="text-center">
          <div>Recent Deploy</div>
          <div>No Data</div>
          <div>Explorer</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { toRefs } from 'vue';


const props = defineProps({
  viewType: String,
});
const { viewType } = toRefs(props);
</script>
<style lang='less' scoped>
@baseColor: #E2B578;
:deep(.ant-btn){
  border-radius: 8px;
}
:deep(.ant-btn-primary){
  width: 120px;
  height: 40px;
}
:deep(.ant-btn-primary), :deep(.ant-btn-primary:hover), :deep(.ant-btn-primary:focus){
  border-color: @baseColor;
  background: @baseColor;
}
</style>