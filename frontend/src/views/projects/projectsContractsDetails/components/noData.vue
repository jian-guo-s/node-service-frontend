<template>
  <div class="w-full dark:text-white text-[#121211] text-center" v-if="hasData">
    <div>no Data</div>
    <a-button @click="deployNow">Deploy Now</a-button>
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

</style>