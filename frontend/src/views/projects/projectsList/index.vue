<template>
  <div class="mx-40 dark:bg-black dark:text-white text-[#121211]">
    <div class="flex justify-between mb-4">
      <div>
        <div class="dark-input hidden dark:inline-block w-full">
          <a-input v-model:value="search" placeholder="Search here..." />
        </div>
        <div class="white-input dark:hidden w-full">
          <a-input v-model:value="search" placeholder="Search here..." />
        </div>
      </div>
      <a-button type="primary">Creat Project</a-button>
    </div>
    <div class="dark:bg-[#1D1C1A] bg-[#FFFFFF] rounded-[16px] py-[24px] px-[32px]">
      <div class="flex justify-between">
        <div class="mb-[32px] flex items-center">
          <div class="text-[24px] dark:font-bold font-normal">Hamster</div>
          <div class="ml-4 rounded-[18px] px-2 border border-solid border-[#434343]">Contract</div>
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
  </div>
</template>
<script lang='ts' setup>
import { ref } from 'vue';



const search = ref('');
</script>
<style lang='less' scoped>
@baseColor: #E2B578;
:deep(.ant-input){
  background-color: transparent;
  border-radius: 8px;
  height: 40px;
}
:deep(.ant-input:focus),:deep(.ant-input-focused){
  border-color: @baseColor;
  box-shadow: 0 0 0 2px rgb(226 181 120 / 20%);
}
:deep(.dark-input .ant-input){
  color: #8A8A8A;
  border-color: #434343;
}
:deep(.white-input .ant-input){
  color: #BBBAB9;
  border-color: #EBEBEB;
}
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