<template>
  <div class="dark:text-white text-[#121211]">
    <div class="flex justify-between mb-[24px]">
      <Breadcrumb :currentName="'Contract Check_#1'"></Breadcrumb>
      <a-button class="btn">{{ $t('workFlows.stop') }}</a-button>
    </div>
    <WorkflowsInfo :workflowsDetailsData="workflowsDetailsData"></WorkflowsInfo>
    <WorkflowsProcess :processData="processData"></WorkflowsProcess>
    <CheckReport :checkReportData="checkReportData"></CheckReport>
    <ContractList :contractListData="contractListData"></ContractList>
    <div>

    </div>
  </div>
</template>
<script lang='ts' setup>
import { reactive, onMounted } from 'vue';
import Breadcrumb from '../components/Breadcrumb.vue';
import WorkflowsInfo from './components/WorkflowsInfo.vue';
import WorkflowsProcess from './components/WorkflowsProcess.vue';
import CheckReport from './components/CheckReport.vue';
import ContractList from './components/ContractList.vue';

const processData = reactive([
  { name: '开始', status: 0, duration: '', }
])

const workflowsDetailsData = reactive({
  type: 'report'
})

const contractListData = reactive([
  { id: 1, workflowId: 1, workflowDetailsId: 1, name: 'contract-one', version: '#4', network: "mainnet", buildTime: "2022-12-21" },
  { id: 2, workflowId: 2, workflowDetailsId: 2, name: 'contract-two', version: '#3', network: "mainnet", buildTime: "2022-12-19" }
])
const checkReportData = reactive({
  id: 1,
  workflowId: 1,
  workflowDetailsId: 1,
  name: 'contract-one',
  checkTool: '',
  result: "",
})

const getWorkflowsDetails = () => {

}

const getContractList = () => {

}

const getCheckReport = () => {

}



onMounted(() => {
  getWorkflowsDetails()
})
</script>
<style lang='less' scoped>
.btn {
  width: 150px;
  height: 43px;
}
</style>