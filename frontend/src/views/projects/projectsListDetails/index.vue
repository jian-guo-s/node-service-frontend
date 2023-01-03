<template>
  <div :class="[ isWhite ? 'white-css' : 'dark-css']">
    <div class="flex justify-between">
      <div class="flex items-center">
        <div class="text-[24px] font-bold cursor-pointer flex items-center" @click="goBack">
          <img
            src="@/assets/icons/back-white.svg"
            class="h-[24px] dark:hidden mr-2"
          />
          <img
            src="@/assets/icons/back-dark.svg"
            class="h-[24px] hidden dark:inline-block mr-2"
          />
          back</div>
        <div class="ml-4">
          <img
            src="@/assets/icons/Line-white.svg"
            class="h-[16px] dark:hidden"
          />
          <img
            src="@/assets/icons/Line-dark.svg"
            class="h-[16px] hidden dark:inline-block"
          />
        </div>
        <div class="ml-4 text-[24px] font-bold">Hamster</div>
        <div class="ml-4 text-[14px] rounded-[32px] py-1 px-4 border border-solid dark:border-[#434343] border-[#EBEBEB]">Contract</div>
      </div>
      <div>
       <a-button type="primary" ghost>Delete</a-button>
       <a-button type="primary" class="ml-4">Setting</a-button>
      </div>
    </div>
    <Overview :viewType="viewType" :viewInfo="projectsDetail" />
    <div :class="[ isWhite ? 'white-css' : 'dark-css']" class="mt-4 dark:bg-[#1D1C1A] bg-[#FFFFFF] rounded-[12px] py-[24px] px-[32px]">
      <div class="flex justify-between">
        <div class="mb-[32px] items-center text-[24px] font-bold">Workflows</div>
        <div>
          <a-select v-model:value="action" placeholder="Please enter Network"
          :options="actionList.map(item => ({ value: item }))">
          </a-select>
        </div>
      </div>  
      <a-table
        class="my-4"
        :columns="tableColumns"
        :dataSource="workflowList"
        :pagination="pagination"
      >
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.dataIndex === 'action'">
            <label class="text-[#E2B578] cursor-pointer">Details</label>｜
            <label class="text-[#E2B578] cursor-pointer">Stop</label>
          </template>
        </template>
      </a-table>
    </div>
    <div :class="[ isWhite ? 'white-css' : 'dark-css']" class="mt-4 dark:bg-[#1D1C1A] bg-[#FFFFFF] rounded-[12px] py-[24px] px-[32px]">
      <div class="flex mb-[32px] items-center text-[24px] font-bold">Artifacts</div> 
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="Contract">
          <div class="flex">
            <div>
              <a-select v-model:value="contract"
              :options="contractList.map(item => ({ value: item }))">
              </a-select>
            </div>
            <div class="ml-4">
              <a-select v-model:value="version"
              :options="versionList.map(item => ({ value: item }))">
              </a-select>
            </div>
            <div class="ml-4">
              <a-select v-model:value="network"
              :options="networkList.map(item => ({ value: item }))">
              </a-select>
            </div>
          </div>
          <a-table
            class="my-4"
            :columns="contractTableColumns"
            :dataSource="contractTableList"
            :pagination="contractPagination"
          >
            <template #bodyCell="{ column, record, index }">
              <template v-if="column.dataIndex === 'action'">
                <label class="text-[#E2B578] cursor-pointer">Deploy</label>｜
                <label class="text-[#E2B578] cursor-pointer">Details</label>
              </template>
            </template>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Report">
          <div>
            <a-select v-model:value="checkTool"
              :options="checkToolList.map(item => ({ value: item }))">
              </a-select>
          </div>
          <a-table
            class="my-4"
            :columns="reportTableColumns"
            :dataSource="reportTableList"
            :pagination="reportPagination"
          >
            <template #bodyCell="{ column, record, index }">
              <template v-if="column.dataIndex === 'action'">
                <label class="text-[#E2B578] cursor-pointer">View Report</label>
              </template>
            </template>
          </a-table>
        </a-tab-pane>
      </a-tabs> 
    </div>
  </div>
</template>
<script lang='ts' setup>
import { reactive, ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { formatToDateTime } from '@/utils/dateUtil';
import Overview from "../projectsList/components/Overview.vue";
import { apiGetProjectsDetail, apiGetProjectsWorkflows } from "@/apis/projects";

const router = useRouter();
const { params } = useRoute();
const detailId = ref(params.id);
const viewType = ref("detail");
const isWhite = ref(false);
const projectsDetail = ref({});
const activeKey = ref("1");
const actionList = reactive(["All Action", "Contract Build", "Contract Check"]);
const action = ref("1");
const contractList = reactive(["All Contract"]);
const contract = ref("All Contract");
const versionList = reactive(["All Version"]);
const version = ref("All Version");
const networkList = reactive(["All Network"]);
const network = ref("All Network");
const checkToolList = reactive(["All Check Tool"]);
const checkTool = ref("All Network");
const workflowList = ref([]);
const contractTableList = ref([]);
const reportTableList = ref([]);

const tableColumns = computed<any[]>(() => [
  {
    title: 'Status',
    dataIndex: 'status',
    align: 'center',
    ellipsis: 'fixed',
    key: 'status',
  },
  {
    title: 'Action',
    dataIndex: 'type',
    align: 'center',
    ellipsis: 'fixed',
    key: 'type',
  },
  {
    title: 'Trigger Info',
    dataIndex: 'triggerMode',
    key: 'triggerMode',
    ellipsis: 'fixed',
    align: 'center',
  },
  {
    title: 'Stage',
    dataIndex: 'stageInfo',
    align: 'center',
    ellipsis: 'fixed',
    key: 'stageInfo',
    width: '200px'
  },
  {
    title: 'Time',
    dataIndex: 'startTime',
    align: 'center',
    ellipsis: 'fixed',
    key: 'startTime',
      customRender: ({ text: date }) => formatToDateTime(date, (f) => f.datetime),
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    width: '150px',
  },
]);

const pagination = reactive({
  // 分页配置器
  pageSize: 10, // 一页的数据限制
  current: 1, // 当前页
  total: 10, // 总数
  size: 'small',
  position: ['bottomCenter'], //指定分页显示的位置
  hideOnSinglePage: false, // 只有一页时是否隐藏分页器
  showQuickJumper: false, // 是否可以快速跳转至某页
  showSizeChanger: false, // 是否可以改变 pageSize
  pageSizeOptions: ['10', '20', '30'], // 指定每页可以显示多少条
  onShowSizeChange: (current: number, pagesize: number) => {
    // 改变 pageSize时的回调
    pagination.current = current;
    pagination.pageSize = pagesize;
    // getApps();
  },
  onChange: (current: number) => {
    // 切换分页时的回调，
    pagination.current = current;
    // getApps();
  },
  // showTotal: total => `总数：${total}人`, // 可以展示总数
});


const contractTableColumns = computed<any[]>(() => [
  {
    title: 'Contract',
    dataIndex: 'name',
    align: 'center',
    ellipsis: 'fixed',
    key: 'name',
  },
  {
    title: 'Version',
    dataIndex: 'network',
    align: 'center',
    ellipsis: 'fixed',
    key: 'network',
  },
  {
    title: 'Network',
    dataIndex: 'total_requests_today',
    key: 'total_requests_today',
    ellipsis: 'fixed',
    align: 'center',
  },
  {
    title: 'Build Time',
    dataIndex: 'daylyRequests',
    align: 'center',
    ellipsis: 'fixed',
    key: 'daylyRequests',
    width: '200px'
  },
  {
    title: 'Action',
    dataIndex: 'action',
    align: 'center',
    width: '150px',
  },
]);

const contractPagination = reactive({
  // 分页配置器
  pageSize: 10, // 一页的数据限制
  current: 1, // 当前页
  total: 10, // 总数
  size: 'small',
  position: ['bottomCenter'], //指定分页显示的位置
  hideOnSinglePage: false, // 只有一页时是否隐藏分页器
  showQuickJumper: false, // 是否可以快速跳转至某页
  showSizeChanger: false, // 是否可以改变 pageSize
  pageSizeOptions: ['10', '20', '30'], // 指定每页可以显示多少条
  onShowSizeChange: (current: number, pagesize: number) => {
    // 改变 pageSize时的回调
    contractPagination.current = current;
    contractPagination.pageSize = pagesize;
    // getApps();
  },
  onChange: (current: number) => {
    // 切换分页时的回调，
    contractPagination.current = current;
    // getApps();
  },
  // showTotal: total => `总数：${total}人`, // 可以展示总数
});

const reportTableColumns = computed<any[]>(() => [
  {
    title: 'Report Name',
    dataIndex: 'name',
    align: 'center',
    ellipsis: 'fixed',
    key: 'name',
  },
  {
    title: 'Report Type',
    dataIndex: 'network',
    align: 'center',
    ellipsis: 'fixed',
    key: 'network',
  },
  {
    title: 'Check Tool',
    dataIndex: 'total_requests_today',
    key: 'total_requests_today',
    ellipsis: 'fixed',
    align: 'center',
  },
  {
    title: 'Result',
    dataIndex: 'daylyRequests',
    align: 'center',
    ellipsis: 'fixed',
    key: 'daylyRequests',
    width: '200px'
  },
  {
    title: 'Check Time',
    dataIndex: 'daylyRequests',
    align: 'center',
    ellipsis: 'fixed',
    key: 'daylyRequests',
    width: '200px'
  },
  {
    title: 'Action',
    dataIndex: 'action',
    align: 'center',
    width: '150px',
  },
]);

const reportPagination = reactive({
  // 分页配置器
  pageSize: 10, // 一页的数据限制
  current: 1, // 当前页
  total: 10, // 总数
  size: 'small',
  position: ['bottomCenter'], //指定分页显示的位置
  hideOnSinglePage: false, // 只有一页时是否隐藏分页器
  showQuickJumper: false, // 是否可以快速跳转至某页
  showSizeChanger: false, // 是否可以改变 pageSize
  pageSizeOptions: ['10', '20', '30'], // 指定每页可以显示多少条
  onShowSizeChange: (current: number, pagesize: number) => {
    // 改变 pageSize时的回调
    reportPagination.current = current;
    reportPagination.pageSize = pagesize;
    // getApps();
  },
  onChange: (current: number) => {
    // 切换分页时的回调，
    reportPagination.current = current;
    // getApps();
  },
  // showTotal: total => `总数：${total}人`, // 可以展示总数
});
  
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

  getProjectsDetail();
  getProjectsWorkflows();
})

const getProjectsDetail = async () => {
  try {
    const { data } = await apiGetProjectsDetail(detailId.value.toString());
    projectsDetail.value = data;
    
  } catch (error: any) {
    console.log("erro:",error)
  } finally {
    // loading.value = false;
  }
}; 

const getProjectsWorkflows = async () => {
  try {
    const params = {
      type: action.value,
      page: pagination.current,
      size: pagination.pageSize,
    }
    const { data } = await apiGetProjectsWorkflows(detailId.value.toString(), params);
    workflowList.value = data.data;
    pagination.total = data.total
    
  } catch (error: any) {
    console.log("erro:",error)
  } finally {
    // loading.value = false;
  }
};

const goBack = () => {
   router.back();
}
</script>
<style lang='less' scoped>
@baseColor: #E2B578;
:deep(.ant-btn-primary){
  width: 120px;
  height: 40px;
}
</style>