<template>
  <div class="dark:text-white text-[#121211]">
    <div class="flex justify-between">
      <div>导航</div>
      <a-button>Stop</a-button>
    </div>
    <WorkflowsInfo :workflowsInfoData="workflowsInfoData"></WorkflowsInfo>
    <WorkflowsProcess :processData="processData"></WorkflowsProcess>
    <CheckReport></CheckReport>
    <ContractList></ContractList>
    <div>

    </div>
  </div>
</template>
<script lang='ts' setup>
import { reactive } from 'vue';
import WorkflowsInfo from './components/WorkflowsInfo.vue';
import WorkflowsProcess from './components/WorkflowsProcess.vue';
import CheckReport from './components/CheckReport.vue';
import ContractList from './components/ContractList.vue';
const workflowsInfoData = reactive({

})

const processData = reactive([
  { name: '开始', status: 0, duration: '', }
])
</script>
<style lang='less' scoped>

</style>