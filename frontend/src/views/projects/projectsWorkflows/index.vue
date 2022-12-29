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
  </div>
</template>
<script lang='ts' setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import YAML from "yaml";
import Breadcrumb from '../components/Breadcrumb.vue';
import WorkflowsInfo from './components/WorkflowsInfo.vue';
import WorkflowsProcess from './components/WorkflowsProcess.vue';
import CheckReport from './components/CheckReport.vue';
import ContractList from './components/ContractList.vue';
import { apiGetWorkflowsDetail, apiGetWorkFlowsContract, apiGetWorkFlowsReport, apiGetDetailStageLogs } from "@/apis/workFlows";

const router = useRouter();
const queryJson = reactive({
  id: router.currentRoute.value.params?.id,
  detailId: router.currentRoute.value.params?.workflowId
})

const inRunning = ref(false);

const processData = reactive([])
const contractListData = reactive([])
const workflowsDetailsData = reactive({
  startTime: '',
  endTime: '',
})

const checkReportData = reactive({
  id: 1,
  workflowId: 1,
  workflowDetailsId: 1,
  name: 'contract-one',
  checkTool: '',
  result: "",
})

const getWorkflowsDetails = async () => {
  const { data } = await apiGetWorkflowsDetail(queryJson)
  Object.assign(workflowsDetailsData, { startTime: data.StartTime, endTime: data.EndTime })
  const StageInfo = YAML.parse(data.StageInfo)
  Object.assign(processData, StageInfo.stages)
  processData.unshift({ name: 'Start', status: 99, duration: '', })

  // data.type === 1 ? getCheckReport() : getContractList();
  // inRunning.value = processData.some((val: any) => val.status === 1);
  // let detailTimer = null
  // if (inRunning.value) {
  //   detailTimer = setTimeout(() => {
  //     getWorkflowsDetails();
  //   }, 3000);
  // } else {
  //   clearTimeout(detailTimer);
  // } 
}

const getContractList = async () => {
  const { data } = await apiGetWorkFlowsContract(queryJson)
  Object.assign(contractListData, data)
}

const getCheckReport = async () => {
  const { data } = await apiGetWorkFlowsReport(queryJson)
}



onMounted(() => {
  getWorkflowsDetails()
  getContractList()
  getCheckReport()
})

</script>
<style lang='less' scoped>
.btn {
  width: 150px;
  height: 43px;
}
</style>