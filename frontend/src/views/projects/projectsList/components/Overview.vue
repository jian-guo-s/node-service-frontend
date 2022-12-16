<template>
  <div :class="[ isWhite ? 'white-css' : 'dark-css']" class="mt-4 dark:bg-[#1D1C1A] bg-[#FFFFFF] rounded-[12px] p-[32px]">
    <div class="flex justify-between">
      <div class="mb-[32px] items-center">
        <div v-if="viewType === 'detail'" class="text-[24px]">Overview</div>
        <div v-else class="flex items-center">
          <div class="text-[24px] dark:font-bold font-normal cursor-pointer">
            <a href="#/projects/1/details">Hamster</a>
          </div>
          <div class="ml-4 text-[14px] rounded-[32px] py-1 px-4 border border-solid dark:border-[#434343] border-[#EBEBEB]">Contract</div>
        </div>
      </div>
      <div>
        <a-button type="primary">Check</a-button>
        <a-button type="primary" class="ml-4">Build</a-button>
        <a-button type="primary" class="ml-4">Deploy</a-button>
        <a-button type="primary" class="ml-4">Ops</a-button>
      </div>
    </div>  
    <div class="p-[32px] dark:bg-[#36322D] rounded-[12px] border border-solid dark:border-[#434343] border-[#EBEBEB]">
      <div class="grid grid-cols-5 gap-4">
        <div class="col-span-2">
          <div class="text-[16px] font-bold">代码仓库</div>
          <div class="my-2">https://github.com/hamster-shared/hamster.git</div>
          <div>
            <img
                src="@/assets/icons/white-link.svg"
                class="h-[16px] dark:hidden"
              />
              <img
                src="@/assets/icons/dark-link.svg"
                class="h-[16px] hidden dark:inline-block"
              />
            master</div>
        </div>
        <div class="text-center">
          <div class="text-[16px] font-bold">Recent Check</div>
          <div class="my-2">
            <img
              src="@/assets/icons/running.svg"
              class="h-[16px]"
            />
            No Data</div>
          <div class="text-[#E2B578]">Check Now</div>
        </div>
        <div class="text-center">
          <div class="text-[16px] font-bold">Recent Build</div>
          <div class="my-2">
            <img
              src="@/assets/icons/success.svg"
              class="h-[16px]"
            />
            No Data</div>
          <div class="text-[#E2B578]">Build Now</div>
        </div>
        <div class="text-center">
          <div class="text-[16px] font-bold">Recent Deploy</div>
          <div class="my-2">
            <img
              src="@/assets/icons/failed.svg"
              class="h-[16px]"
            />
            No Data</div>
          <div class="text-[#D3C9BC]">Explorer</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { onMounted, ref, toRefs } from 'vue';


const props = defineProps({
  viewType: String,
});
const { viewType } = toRefs(props);

const isWhite = ref(false);
   
onMounted(() => {
  window.addEventListener('setItemEvent', event => {
    if (event.key === 'themeValue') {
      if (event.newValue === 'white') {
        isWhite.value = true;
      } else {
        isWhite.value = false;
      }
    }
  })
})
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
.dark-css a,.dark-css a:hover{
  color: #FFFFFF;
}
.white-css a,.white-css a:hover{
  color: #151210;
}
</style>