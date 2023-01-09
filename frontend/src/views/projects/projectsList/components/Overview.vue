<template>
  <div :class="theme.themeValue === 'dark' ? 'dark-css' : 'white-css'" class="mt-4 dark:bg-[#1D1C1A] bg-[#FFFFFF] rounded-[12px] p-[32px]">
    <div class="flex justify-between">
      <div class="mb-[32px] items-center">
        <div v-if="viewType === 'detail'" class="text-[24px]">Overview</div>
        <div v-else class="flex items-center">
          <div class="text-[24px] font-bold cursor-pointer" @click="goDetail(viewInfo.id)">{{ viewInfo.name }}</div>
          <div class="ml-4 text-[14px] rounded-[32px] py-1 px-4 border border-solid dark:border-[#434343] border-[#EBEBEB]">Contract</div>
        </div>
      </div>
      <div>
        <a-button type="primary" @click="projectsCheck(viewInfo.id,viewInfo.recentCheck.status)">Check</a-button>
        <a-button type="primary" class="ml-4" @click="projectsBuild(viewInfo.id,viewInfo.recentBuild.status)">Build</a-button>
        <a-button type="primary" class="ml-4" @click="projectsDeploy(viewInfo.id, viewInfo.recentDeploy.version, viewInfo.recentBuild.status)">Deploy</a-button>
        <a-button type="primary" class="ml-4" @click="projectsOps(viewInfo.id, viewInfo.recentDeploy.version)">Ops</a-button>
      </div>
    </div>  
    <div class="p-[32px] dark:bg-[#36322D] rounded-[12px] border border-solid dark:border-[#434343] border-[#EBEBEB]">
      <div class="grid grid-cols-5 gap-4">
        <div class="col-span-2">
          <div class="text-[16px] font-bold">Code Repository</div>
          <div class="my-2">
            <a target="_blank" :href="viewInfo.repositoryUrl">{{ viewInfo.repositoryUrl }}</a>
          </div>
          <div>
            <img
                src="@/assets/icons/white-link.svg"
                class="h-[16px] mr-1 dark:hidden"
              />
              <img
                src="@/assets/icons/dark-link.svg"
                class="h-[16px] mr-1 hidden dark:inline-block"
              />
            main</div>
        </div>
        <div>
          <div class="text-[16px] font-bold">Recent Check</div>
          <div class="my-2" v-if="viewInfo.recentCheck.status === 0">No Data</div>
          <div class="my-2 flex items-center" v-else-if="viewInfo.recentCheck.status === 1">
            <img
              src="@/assets/icons/running.svg"
              class="h-[16px] mr-1"
            />
            Running｜{{ setDays(viewInfo.recentCheck.startTime) }} day ago
          </div>
          <div class="my-2 flex items-center" v-else-if="viewInfo.recentCheck.status === 2">
            <img
              src="@/assets/icons/failed.svg"
              class="h-[16px] mr-1"
            />
            Failed｜{{ setDays(viewInfo.recentCheck.startTime) }} day ago</div>
          <div class="my-2 flex items-center" v-else-if="viewInfo.recentCheck.status === 3">
            <img
              src="@/assets/icons/success.svg"
              class="h-[16px] mr-1"
            />
            Success｜{{ setDays(viewInfo.recentCheck.startTime) }} day ago</div>
          <div class="my-2" v-else-if="viewInfo.recentCheck.status === 4">Stop｜{{ setDays(viewInfo.recentCheck.startTime) }} day ago</div>
          <div class="text-[#E2B578] cursor-pointer" @click="projectsCheck(viewInfo.id,viewInfo.recentCheck.status)" v-if="viewInfo.recentCheck.status === 0">Check Now</div>
          <div class="text-[#E2B578] cursor-pointer" @click="goContractCheck(viewInfo.id, viewInfo.recentCheck.workflowId, viewInfo.recentCheck.id)" v-else-if="viewInfo.recentCheck.status === 1 || viewInfo.recentCheck.status === 4">View Process</div>
          <div class="text-[#E2B578] cursor-pointer" @click="goContractCheck(viewInfo.id, viewInfo.recentCheck.workflowId, viewInfo.recentCheck.id)" v-else>View Result</div>
        </div>
        <div>
          <div class="text-[16px] font-bold">Recent Build</div>
          <div class="my-2" v-if="viewInfo.recentBuild.status === 0">No Data</div>
          <div class="my-2 flex items-center" v-else-if="viewInfo.recentBuild.status === 1">
            <img
              src="@/assets/icons/running.svg"
              class="h-[16px] mr-1"
            />
            Running｜{{ setDays(viewInfo.recentBuild.startTime) }} day ago
          </div>
          <div class="my-2 flex items-center" v-else-if="viewInfo.recentBuild.status === 2">
            <img
              src="@/assets/icons/failed.svg"
              class="h-[16px] mr-1"
            />
            Failed｜{{ setDays(viewInfo.recentBuild.startTime) }} day ago</div>
          <div class="my-2 flex items-center" v-else-if="viewInfo.recentBuild.status === 3">
            <img
              src="@/assets/icons/success.svg"
              class="h-[16px] mr-1"
            />
            Success｜{{ setDays(viewInfo.recentBuild.startTime) }} day ago</div>
          <div class="my-2" v-else-if="viewInfo.recentBuild.status === 4">Stop｜{{ setDays(viewInfo.recentBuild.startTime) }} day ago</div>
          <div class="text-[#E2B578] cursor-pointer" @click="projectsBuild(viewInfo.id,viewInfo.recentBuild.status)" v-if="viewInfo.recentBuild.status === 0">Build Now</div>
          <div class="text-[#E2B578] cursor-pointer" @click="goContractBuild(viewInfo.id, viewInfo.recentBuild.workflowId, viewInfo.recentBuild.id)" v-else-if="viewInfo.recentBuild.status === 1 || viewInfo.recentBuild.status === 4">View Process</div>
          <div class="text-[#E2B578] cursor-pointer" @click="goContractBuild(viewInfo.id, viewInfo.recentBuild.workflowId, viewInfo.recentBuild.id)" v-else-if="viewInfo.recentBuild.status === 2">View Result</div>
          <div class="text-[#E2B578] cursor-pointer" @click="goContractDeploy(viewInfo.id, viewInfo.recentDeploy.version)" v-else>Deploy Now</div>
        </div>
        <div>
          <div class="text-[16px] font-bold">Recent Deploy</div>
          <div class="my-2" v-if="viewInfo.recentDeploy.version === ''">No Data</div>
          <div class="my-2 flex items-center" v-else>
            <img
              src="@/assets/icons/success.svg"
              class="h-[16px] mr-1"
            />
            {{ viewInfo.recentDeploy.version }}｜{{ setDays(viewInfo.recentDeploy.deployTime) }} day ago</div>
          <div class="text-[#D3C9BC]" v-if="viewInfo.recentDeploy.version === ''">Explorer</div>
          <div class="text-[#E2B578]" @click="goContractDetail(viewInfo.id, viewInfo.recentDeploy.version)" v-else>View Contract</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { toRefs } from 'vue';
import { useRouter } from "vue-router";
import { message } from 'ant-design-vue';
import { transTimestamp } from '@/utils/dateUtil';
import { apiProjectsCheck, apiProjectsBuild } from "@/apis/projects";
import { useThemeStore } from "@/stores/useTheme";
const theme = useThemeStore()

const router = useRouter();

const props = defineProps({
  viewType: String,
  viewInfo: Object,
});
const { viewType, viewInfo } = toRefs(props); 
const emit = defineEmits(["loadProjects"]);

const setDays = (startTime: any) => {
  return Math.floor((new Date() - new Date(transTimestamp(startTime))) / (60 * 60 * 24 * 1000));
}

const goDetail = (id: string) => {
  router.push("/projects/"+id+"/details");
}

const projectsCheck = async (id: String, status: Number) => {
  try {
    if (status === 1) {
      message.info("Executing Now，please wait a moment.");
    } else {
      const res = await apiProjectsCheck(id);
      message.success(res.message);
      loadView();
    }
  } catch (error: any) {
    console.log("erro:", error)
    message.error(error.response.data.message);
  } finally {
    // loading.value = false;
  }
};

const projectsBuild = async (id: String, status: Number) => {
  try {
    if (status === 1) {
      message.info("Executing Now，please wait a moment.");
    } else {
      const res = await apiProjectsBuild(id);
      message.success(res.message);
      loadView();
    }
  } catch (error: any) {
    console.log("erro:", error)
    message.error(error.response.data.message);
  } finally {
    // loading.value = false;
  }
};
const projectsDeploy = async (id: String, version: String, status: Number) => {
  if (status === 0 || status === 1) {
    message.info("Smart contract not avaliable.");
  } else {
    goContractDeploy(id, version);
  }
};
const projectsOps = async (id: String, version: String) => {
  if (version === "") {
    message.info("Smart contract not avaliable.");
  } else {
    goContractDetail(id, version);
  }
};
const loadView = async () => {
  //重新查询数据
  emit("loadProjects");
};
const goContractCheck = async (id: String, workflowId: String, detailId: String) => {
  router.push("/projects/"+id+"/"+workflowId+"/workflows/"+detailId+"/1");
};
const goContractBuild = async (id: String, workflowId: String, detailId: String) => {
  router.push("/projects/"+id+"/"+workflowId+"/workflows/"+detailId+"/2");
};
const goContractDeploy = async (id: String, version: String) => {
  if (version === "") {
    message.error("version is empty.");
  } else {
    router.push("/projects/"+id+"/artifacts-contract/"+version+"/deploy/00");
  }
};
const goContractDetail = async (id: String, version: String) => {
  router.push("/projects/"+id+"/contracts-details/"+version);
}
</script>
<style lang='less' scoped>
@baseColor: #E2B578;

html[data-theme='dark'] {
  a, a:hover{
    color: #FFFFFF;
  }
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
// .dark-css a,.dark-css a:hover{
//   color: #FFFFFF;
// }
a, a:hover{
  color: #151210;
}
</style>