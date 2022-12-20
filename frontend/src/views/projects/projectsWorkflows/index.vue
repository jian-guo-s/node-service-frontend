<template>
  <div class="dark:text-white text-[#121211]">
    <div class="flex justify-between mb-[24px]">
      <Breadcrumb :currentName="'Contract Check_#1'"></Breadcrumb>
      <a-button class="btn">Stop</a-button>
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
import Breadcrumb from '../components/Breadcrumb.vue';
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
@baseColor: #E2B578;

.btn {
  width: 150px;
  height: 43px;
  background-color: @baseColor;
  color: #fff;
  border-color: @baseColor;
}

.btn:hover,
.btn:focus {
  background-color: @baseColor;
  color: #fff;
}
</style>