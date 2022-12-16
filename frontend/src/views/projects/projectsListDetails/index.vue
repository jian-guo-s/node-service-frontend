<template>
  <div :class="[ isWhite ? 'white-css' : 'dark-css']">
    <div class="flex justify-between">
      <div class="flex items-center">
        <div class="text-[24px] font-bold cursor-pointer" @click="goBack">
          <img
            src="@/assets/icons/back-white.svg"
            class="h-[24px] dark:hidden"
          />
          <img
            src="@/assets/icons/back-dark.svg"
            class="h-[24px] hidden dark:inline-block"
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
    <Overview :viewType="viewType" />
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
import { useRouter } from "vue-router";
import Overview from "../projectsList/components/Overview.vue";

const router = useRouter();
const viewType = ref("detail");
const isWhite = ref(false);
const activeKey = ref("1");
const actionList = reactive(["All Action", "Contract Build", "Contract Check"]);
const action = ref("All Action");
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
    dataIndex: 'name',
    align: 'center',
    ellipsis: 'fixed',
    key: 'name',
  },
  {
    title: 'Action',
    dataIndex: 'network',
    align: 'center',
    ellipsis: 'fixed',
    key: 'network',
  },
  {
    title: 'Trigger Info',
    dataIndex: 'total_requests_today',
    key: 'total_requests_today',
    ellipsis: 'fixed',
    align: 'center',
  },
  {
    title: 'Stage',
    dataIndex: 'daylyRequests',
    align: 'center',
    ellipsis: 'fixed',
    key: 'daylyRequests',
    width: '200px'
  },
  {
    title: 'Time',
    dataIndex: 'created_at',
    align: 'center',
    ellipsis: 'fixed',
    key: 'DaysOnHamster',
    customRender: ({ text }) => Math.floor((new Date()-new Date(text))/(60*60*24*1000))+' Days',
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
})

const goBack = () => {
   router.back();
}
</script>
<style lang='less' scoped>
@baseColor: #E2B578;
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

:deep(.ant-btn-background-ghost.ant-btn-primary), :deep(.ant-btn-background-ghost.ant-btn-primary:hover), :deep(.ant-btn-background-ghost.ant-btn-primary:focus){
  border-color: @baseColor;
  color: @baseColor;
}
:deep(.white-css .ant-tabs){
  color: #73706E;
}
:deep(.dark-css .ant-tabs){
  color: #E0DBD2;
}
:deep(.ant-tabs-nav-list){
  width: 100%;
}
:deep(.ant-tabs-tab){
  width: 25%;
  display: flex;
  justify-content: center;
}
:deep(.ant-tabs-tab-btn:hover),:deep(.ant-tabs-tab:hover){
  color: @baseColor;
}
:deep(.ant-tabs-ink-bar) {
  background: @baseColor;
}
:deep(.white-css .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn){
  color: @baseColor;
  font-weight: bold;
}
:deep(.dark-css .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn){
  color: #FFFFFF;
  font-weight: bold;
}
:deep(.ant-select){
  width: 150px;
}
:deep(.dark-css .ant-select), :deep(.dark-css .ant-select-arrow){
  color: #E0DBD2 !important;
}
:deep(.white-css .ant-select), :deep(.white-css .ant-select-arrow){
  color: #73706E !important;
}
:deep(.ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector){
  border-color: @baseColor;
  box-shadow: 0 0 0 2px rgb(226 181 120 / 20%);
}
:deep(.ant-select:not(.ant-select-customize-input) .ant-select-selector){
  background-color: transparent;
  border-radius: 8px;
}
:deep(.dark-css .ant-select:not(.ant-select-customize-input) .ant-select-selector){
  border-color: #434343;
}
:deep(.white-css .ant-select:not(.ant-select-customize-input) .ant-select-selector){
  border-color: #EBEBEB;
}
:deep(.ant-select-single:not(.ant-select-customize-input) .ant-select-selector){
  padding: 4px 11px !important;
  height: 40px;
}

:deep(.ant-table){
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
:deep(.white-css .ant-spin-container){
  box-shadow: 3px 3px 12px rgba(203, 217, 207, 0.2);
}
:deep(.dark-css .ant-table){
  color: #E0DBD2;
}
:deep(.white-css .ant-table){
  color: #73706E;
}
:deep(.ant-table-thead > tr > th) {
  color: #FFFFFF;
  font-weight: 400;
  border-bottom: none;
  background: @baseColor;
}
:deep(.white-css .ant-table-tbody > tr > td){
  border-bottom: 1px solid #F8F8F8;
  color: #BBBAB9;
}
:deep(.dark-css .ant-table-tbody > tr > td){
  border-bottom: 1px solid #302D2D;
  color: #8A8A8A;
  background-color: #36322D;
}
:deep(.dark-css .ant-table-tbody > tr.ant-table-row:hover > td),
:deep(.dark-css .ant-table-tbody > tr >td.ant-table-cell-row-hover){
  background-color: #1D1C1A ;
}
:deep(.ant-table-container table > thead > tr:first-child th:first-child){
  border-top-left-radius: 12px;
}
:deep(.ant-table-container table > thead > tr:first-child th:last-child){
  border-top-right-radius: 12px;
}

:deep(.ant-pagination-prev button),:deep(.ant-pagination-next button){
  color: #8A8A8A;
}
:deep(.ant-table-pagination.ant-pagination){
  margin: 0 0;
  padding: 16px 0;
  background: #fff;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}
:deep(.white-css .ant-table-pagination.ant-pagination){
  background: #fff;
}
:deep(.dark-css .ant-table-pagination.ant-pagination){
  background: #36322D;;
}
:deep(.ant-pagination-item a){
  color: #8A8A8A;
}

:deep(.ant-pagination-disabled .ant-pagination-item-link), :deep(.ant-pagination-disabled:hover .ant-pagination-item-link) {
  color: #8A8A8A !important;
  cursor: not-allowed !important;
}
:deep(.ant-pagination-item a:hover), :deep(.ant-pagination-item-link:hover){
  color: #E2B578 !important;
}
:deep(.ant-pagination-item-active a){
  color: #fff;
}
:deep(.ant-pagination-item-active:hover){
  border-color: #E2B578 !important;
}
:deep(.ant-pagination-item-active a:hover){
  color: #fff !important;
}
:deep(.ant-pagination-item-active){
  border-radius: 4px;
  background: #E2B578;
  border-color: #E2B578;
}
</style>