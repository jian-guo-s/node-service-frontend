<template>
  <div>
    <div class="flex justify-between">
      <div class="mb-[32px] flex items-center">
        <div class="text-[24px]">back</div>
        <div class="ml-4 text-[24px] dark:font-bold font-normal cursor-pointer">Hamster</div>
        <div class="ml-4 rounded-[18px] px-2 border border-solid border-[#434343]">Contract</div>
      </div>
      <div>
       <a-button type="primary">Setting</a-button>
       <a-button type="primary" ghost class="ml-4">Delete</a-button>
      </div>
    </div>
    <Overview :viewType="viewType" />
    <div class="mt-4 dark:bg-[#1D1C1A] bg-[#FFFFFF] rounded-[16px] py-[24px] px-[32px]">
      <div class="flex justify-between">
        <div class="mb-[32px] items-center text-[24px]">Workflows</div>
        <div>
          <a-select v-model:value="action" placeholder="Please enter Network" allow-clear autocomplete="off"
          :options="actionList.map(item => ({ value: item }))">
          </a-select>
        </div>
      </div>  
      <a-table
        class="my-4 dark-table hidden dark:inline-block"
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
    <div class="mt-4 dark:bg-[#1D1C1A] bg-[#FFFFFF] rounded-[16px] py-[24px] px-[32px]">
      <div class="flex mb-[32px] items-center text-[24px]">Artifacts</div> 
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
            class="my-4 dark-table hidden dark:inline-block"
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
            class="my-4 dark-table hidden dark:inline-block"
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
import { reactive, ref, computed } from "vue";
import Overview from "../projectsList/components/Overview.vue";

const viewType = ref("detail");
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
:deep(.ant-tabs){
  color: #BBBAB9;
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
:deep(.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn){
  color: @baseColor;
}
</style>