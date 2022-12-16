<template>
  <div class="dark:text-white text-[#121211]">
    <a-tabs v-model:activeKey="activeKey" class="dark:text-white text-[#121211]">
      <a-tab-pane key="1" tab="Tab 1">
        <div>Contract Explorer</div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Tab 2" force-render>Content of Tab Pane 2</a-tab-pane>
    </a-tabs>
  </div>
  <noData :hasData="hasData"></noData>
</template>
<script lang='ts' setup>
import { ref } from "vue";
import noData from "./components/noData.vue";
const activeKey = ref('1')
const hasData = ref(false);
</script>
<style lang='less' scoped>

</style>