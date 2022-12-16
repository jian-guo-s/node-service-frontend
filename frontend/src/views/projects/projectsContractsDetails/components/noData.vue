<template>
  <div class="noData w-full dark:text-white text-[#121211] text-center" v-if="hasData">
    <img src="@/assets/images/cl-noData-block.png" class="w-[128px]" />
    <div class="text-[#E0DBD2] mb-[6px]">no Data</div>
    <div class="text-[#E2B578] cursor-pointer" @click="deployNow">Deploy Now</div>
  </div>
</template>
<script lang='ts' setup>
import { toRefs } from "vue";
const props = defineProps<{
  hasData: Boolean;
}>();
const { hasData } = toRefs(props);

const deployNow = () => {
  // 创建
}
</script>
<style lang='less' scoped>
.noData {
  font-size: 16px;
}
</style>