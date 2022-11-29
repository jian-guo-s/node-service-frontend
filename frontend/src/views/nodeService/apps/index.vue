<template>
  <div class="mx-40 dark:bg-black dark:text-white text-[#121211]">
    <div class="flex justify-between items-center">
      <div class="text-[32px] font-bold mb-4">
        <img
          src="@/assets/icons/apps-list.svg"
          class="h-[40px]"
        />
        Apps
      </div>
      <a-button type="primary" @click="showCreate=true">Create App</a-button>
    </div>
    <a-table
      :loading="loading"
      class="my-4 white-css dark:dark-css"
      :row-key="(record) => record.id"
      :columns="tableColumns"
      :dataSource="appsList"
      :pagination="pagination"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex === 'daylyRequests'">
          <div>折现</div>
        </template>
        <template v-if="column.dataIndex === 'action'">
          <a>View API Key</a>
        </template>
      </template>
    </a-table>
  </div>  
  <createApp :showCreate="showCreate" @setShowCreate="showCreate=false" />
</template>
<script lang="ts" setup>
  import { onMounted, reactive, ref, computed } from 'vue';
  import { apiGetApps } from "@/apis/apps";
  import createApp from "../apps/createApp.vue"
  import useAssets from "@/stores/useAssets";
  const { getImageURL } = useAssets()

  const showCreate = ref(false);
  const appsList = reactive([]); //app列表
  const loading = ref(false);

  const tableColumns = computed<any[]>(() => [
    {
      title: 'App',
      dataIndex: 'name',
      align: 'center',
      ellipsis: 'fixed',
      key: 'name',
    },
    {
      title: 'Network',
      dataIndex: 'network',
      align: 'center',
      ellipsis: 'fixed',
      key: 'network',
    },
    {
      title: 'Total Requests（24h）',
      dataIndex: 'createdAt',
      key: 'createdAt',
      ellipsis: 'fixed',
      align: 'center',
    },
    {
      title: 'Dayly Requests（7days）',
      dataIndex: 'daylyRequests',
      align: 'center',
      ellipsis: 'fixed',
      key: 'daylyRequests',
    },
    {
      title: 'Days on Hamster',
      dataIndex: 'daysOnHamster',
      align: 'center',
      ellipsis: 'fixed',
      key: 'created_at',
      // customRender: ({ text: date }) => formatToDateTime(date, (f) => f.datetimeWithoutSec),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      width: '150px',
    },
  ]);

  const pagination = reactive({
    // 分页配置器
    pageSize: 2, // 一页的数据限制
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
      getChains();
    },
    onChange: (current: number) => {
      // 切换分页时的回调，
      pagination.current = current;
      getChains();
    },
    // showTotal: total => `总数：${total}人`, // 可以展示总数
  });

  onMounted(async () => {
    getChains();
  });

  const getChains = async () => {
    loading.value = true;
    try {
      const params = {
        account: 'jlvihv',
        page: pagination.current,
        size: pagination.pageSize,
      }
      const data = await apiGetApps(params);
      console.log(data)
      Object.assign(appsList, data.result); //赋值
      
    } catch (error: any) {
      console.log("erro:",error)
    } finally {
      loading.value = false;
    }
  };
</script>
<style scoped lang="less">
@btnColor: #E2B578;
:deep(a){
  color: #E2B578;
}
:deep(.ant-btn){
  border-radius: 8px;
}
:deep(.ant-btn-primary){
  width: 120px;
  height: 40px;
}
:deep(.ant-btn-primary), :deep(.ant-btn-primary:hover), :deep(.ant-btn-primary:focus){
  border-color: @btnColor;
  background: @btnColor;
}
:deep(.ant-table){
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  color: #BBBAB9;
}
:deep(.white-css .ant-table-thead > tr > th) {
  background: #151210;
  color: #FFFFFF;
}
:deep(.dark-css .ant-table-thead > tr > th){
  background: #4E4841 !important;
}
:deep(.ant-table-tbody > tr > td){
  border-bottom: 1px solid #F4F4F4;
}
:deep(.ant-table-container table > thead > tr:first-child th:first-child){
  border-top-left-radius: 12px;
}
:deep(.ant-table-container table > thead > tr:first-child th:last-child){
  border-top-right-radius: 12px;
}
:deep(.ant-table-pagination.ant-pagination){
  margin: 0 0;
  padding: 16px 0;
  background: #fff;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}
:deep(.ant-pagination-item a){
  color: #8A8A8A;
}

:deep(.ant-pagination-disabled .ant-pagination-item-link), :deep(.ant-pagination-disabled:hover .ant-pagination-item-link) {
  color: rgba(0, 0, 0, 0.25) !important;
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