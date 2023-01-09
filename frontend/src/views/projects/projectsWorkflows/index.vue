<template>
  <div class="dark:text-white text-[#121211]">
    <div class="flex justify-between mb-[24px]">
      <Breadcrumb :currentName="currentName"></Breadcrumb>
      <a-button class="btn" @click="stopBtn">{{ $t('workFlows.stop') }}</a-button>
    </div>
    <WorkflowsInfo :workflowsDetailsData="workflowsDetailsData" :title="title"></WorkflowsInfo>
    <WorkflowsProcess :processData="processData" :workflowsId="queryJson.workflowsId"
      :workflowDetailId="queryJson.workflowDetailId">
    </WorkflowsProcess>
    <CheckReport v-show="queryJson.type === '1'" :checkReportData="checkReportData"></CheckReport>
    <ContractList v-show="queryJson.type === '2'" :contractListData="contractListData">
    </ContractList>
  </div>
</template>
<script lang='ts' setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import YAML from "yaml";
import dayJs from "dayjs";
import Breadcrumb from '../components/Breadcrumb.vue';
import WorkflowsInfo from './components/WorkflowsInfo.vue';
import WorkflowsProcess from './components/WorkflowsProcess.vue';
import CheckReport from './components/CheckReport.vue';
import ContractList from './components/ContractList.vue';
import { apiGetProjectsDetail, apiProjectsWorkflowsStop } from "@/apis/projects";
import { apiGetWorkflowsDetail, apiGetWorkFlowsContract, apiGetWorkFlowsReport } from "@/apis/workFlows";
import { message } from 'ant-design-vue';

const router = useRouter();
const queryJson = reactive({
  id: router.currentRoute.value.params?.id,
  workflowDetailId: router.currentRoute.value.params?.workflowDetailId,
  workflowsId: router.currentRoute.value.params?.workflowsId,
  type: router.currentRoute.value.params?.type
})
const title = ref('');
const currentName = ref('');
const inRunning = ref(false);
const processData = reactive([])
const contractListData = reactive([])
const workflowsDetailsData = reactive({
  startTime: '',
  endTime: '',
  RepositoryUrl: '',
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
  Object.assign(workflowsDetailsData, data)
  const stageInfo = YAML.parse(data.stageInfo)
  console.log(stageInfo, 'stageInfo')
  Object.assign(processData, stageInfo)
  processData.unshift({ name: 'Start', status: 99, duration: 'none', })

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
  const { data } = await apiGetWorkFlowsContract(queryJson);
  Object.assign(contractListData, data);
}

const getCheckReport = async () => {
  const { data } = await apiGetWorkFlowsReport(queryJson);
}

const stopBtn = async () => {
  try {
    const { data } = await apiProjectsWorkflowsStop(queryJson);
    getWorkflowsDetails()
  } catch (err: any) {
    message.error(err.message)
  }
}

const getProjectsDetailData = async () => {
  const { data } = await apiGetProjectsDetail(queryJson.id.toString())
  Object.assign(workflowsDetailsData, { repositoryUrl: data.repositoryUrl })
}

onMounted(() => {
  getWorkflowsDetails();
  getProjectsDetailData();
  title.value = queryJson.type === '1' ? 'Check' : 'Build';
  currentName.value = `Contract ${title.value}_#${queryJson.workflowsId}`
  queryJson.type === '1' ? getCheckReport() : getContractList();
})

</script>
<style lang='less' scoped>
.btn {
  width: 150px;
  height: 43px;
}
</style>