<template>
  <div :class="theme.themeValue === 'dark' ? 'dark-css' : 'white-css'">
    <div class="flex justify-between">
      <div class="mb-[32px] flex items-center">
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
        <div class="ml-4 text-[24px] font-bold">{{ templatesDetail.name }}</div>
      </div>
      <div>
       <a-button type="primary" ghost @click="getProjectsContract">{{ templatesDetail.version }}（latest）</a-button>
       <a-button type="primary" class="ml-4">Creat by template</a-button>
      </div>
    </div>
    <div class="mt-4 rounded-[12px] dark:bg-[#1D1C1A] bg-[#FFFFFF]">
      <div class="bg-[#36322D] rounded-tl-[12px] rounded-tr-[12px] p-4">
        <div class="text-[24px] font-bold text-[#FFFFFF]">{{ templatesDetail.name }} Contract</div>
        <div class="mt-2 text-[#BBBAB9]">{{ templatesDetail.description }}</div>
      </div>
      <div class="p-4">
        <div class="text-[24px] font-bold">Extensions</div>
        <div class="mt-4 border border-solid border-[#E2B578] bg-[#FFFCF9] dark:bg-[#36322D] p-4 rounded-[12px] grid grid-cols-5 gap-4">
          <a-checkbox disabled="true" v-for="(items, index) in checkboxList" :key="index" v-model:checked="items.checked">{{ items.label }}</a-checkbox>
        </div>
        <div class="mt-4 text-[24px] font-bold flex items-center">
          <img
            src="@/assets/icons/example.svg"
            class="h-[32px]"
          />
          Use Cases & Examples</div>
        <div class="mt-4 dark:text-[#E0DBD2] text-[#73706E]">
          <pre>{{ templatesDetail.examples }}</pre>
        </div>
        <div class="mt-4 text-[24px] font-bold flex items-center">
          <img
            src="@/assets/icons/resource.svg"
            class="h-[32px]"
          />
          Resources</div>
          <div class="mt-4 dark:text-[#E0DBD2] text-[#73706E]">
            <pre>{{ templatesDetail.resources }}</pre>
          </div>
      </div>
    </div>
    <div :class="theme.themeValue === 'dark' ? 'dark-css' : 'white-css'" class="mt-4 rounded-[12px] dark:bg-[#1D1C1A] bg-[#FFFFFF] pt-4">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="Functions">
          <div class="flex">
            <div class="p-4 border-r-[#302D2D] border-r border w-1/4">
              <div class=" flex items-center">
                <img
                  src="@/assets/icons/send-w.svg"
                  class="h-[20px] dark:hidden mr-[5px]"
                />
                <img
                  src="@/assets/icons/send-dark.svg"
                  class="h-[20px] hidden dark:inline-block mr-[5px]"
                />Send
              </div>
              <div class=" text-[#73706E] dark:text-[#E0DBD2] pl-[25px] mt-4">approve</div>
              <div class="mt-4 flex items-center">
                <img
                  src="@/assets/icons/send-w.svg"
                  class="h-[20px] dark:hidden mr-[5px]"
                />
                <img
                  src="@/assets/icons/send-dark.svg"
                  class="h-[20px] hidden dark:inline-block mr-[5px]"
                />Call
              </div>
              <div class="text-[#73706E] dark:text-[#E0DBD2] dark:bg-[#36322D] bg-[#F9F9F9] rounded-[12px] mt-4 px-[30px] py-[12px]">DEFAULT_ADMIN_ROLE</div>
            </div>
            <div class="p-4  w-3/4">
              <div class="flex justify-between">
                <div class="text-[16px] font-bold">approve</div>
                <div class="text-[#E0DBD2]">inputs</div>
              </div>
              <a-table
                class="my-4"
                :columns="tableColumns"
                :dataSource="approveList"
                :pagination="false"
              ></a-table>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Events">
          <div class="flex">
            <div class="p-4 border-r-[#302D2D] border-r border w-1/4">
              <div class="text-[#73706E] dark:text-[#E0DBD2]" v-for="(item, index) in eventNameList" :key="index">{{ item }}</div>
            </div>
            <div class="p-4 w-3/4">
              <div class="flex justify-between">
                <div class="text-[16px] font-bold">Approval</div>
                <div class="text-[#E0DBD2]">inputs</div>
              </div>
              <a-table
                class="my-4"
                :columns="tableColumns"
                :dataSource="approvalList"
                :pagination="false"
              ></a-table>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="3" tab="Sources">
          <div class="p-4 cursor-pointer">{{  setText(templatesDetail.codeSources) }}</div>
          <div>
            <iframe src="https://www.baidu.com/" frameborder="0" width="100%" :style="{height:100}" scrolling="auto"></iframe>
            <iframe :src="templatesDetail.codeSources" frameborder="0" width="100%" :style="{height:100}" scrolling="auto"></iframe>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { computed, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { apiProjectsContractVersion } from "@/apis/projects";
import { apiTemplatesDetail } from "@/apis/templates";
import { useThemeStore } from "@/stores/useTheme";
const theme = useThemeStore()

const router = useRouter();
const { params } = useRoute();
const templateId = ref(params.templateId); 
const activeKey = ref("1");
const approveList = ref([]);
const eventNameList = ref([]);
const approvalList = ref([])
const templatesDetail = ref([]);
const extensionsList = ref([]);
const checkboxList = ref([
  { checked: false, label: 'ERC721'},
  { checked: false, label: 'ERC721Supply'},
  { checked: false, label: 'ERC721Enumerable'},
  { checked: false, label: 'ContractMetadata'},
  { checked: false, label: 'Royalty'},
  { checked: false, label: 'Permissions'},
  { checked: false, label: 'PermissionsEnumerable'},
  { checked: false, label: 'Ownable'},
  { checked: false, label: 'Gasless'},
]);

const tableColumns = computed<any[]>(() => [
  {
    title: 'NAME',
    dataIndex: 'name',
    align: 'center',
    ellipsis: 'fixed',
    key: 'name',
  },
  {
    title: 'TYPE',
    dataIndex: 'type',
    align: 'center',
    ellipsis: 'fixed',
    key: 'type',
  },
]);

onMounted(() => {
  getTemplatesDetail();
})

const getTemplatesDetail = async () => {
  try {
    const { data } = await apiTemplatesDetail(templateId.value.toString());
    templatesDetail.value = data;
    extensionsList.value = data.extensions.split(',');
    checkboxList.value.forEach((element,index) => {
      if (extensionsList.value.indexOf(element.label) !== -1) {
        checkboxList.value[index].checked = true;
      }
    });
    JSON.parse(data.abiInfo).forEach((element: any) => {
      if (element.type === 'function' && element.name === 'approve') {
        approveList.value = element.inputs;
      }
      if (element.type === 'event') {
        eventNameList.value.push(element.name);
        if (element.name === 'Approval') {
          approvalList.value = element.inputs;
        }
      }
    });
  } catch (error: any) {
    console.log("erro:",error)
  } finally {
    // loading.value = false;
  }
};

const getProjectsContract = async () => {
  try {
    const { data } = await apiProjectsContractVersion(templateId.value.toString(), templatesDetail.value.version);
    console.log("data:",data);
  } catch (error: any) {
    console.log("erro:",error)
  } finally {
    // loading.value = false;
  }
};

const setText = (str: String) => {
  return str.slice(str.lastIndexOf('/')+1);
}

const goBack = () => {
   router.back();
}
</script>
<style lang='less' scoped>
@baseColor: #E2B578;
:deep(.ant-btn-primary){
  width: 150px;
  height: 40px;
}
:deep(.ant-checkbox-wrapper), :deep(.ant-checkbox-disabled+span){
  color: @baseColor;
}
:deep(.ant-checkbox-wrapper+.ant-checkbox-wrapper){
  margin-left: 0px;
}
ul{
  padding-inline-start: 1rem;
}
:deep(.dark-css .ant-tabs){
  color: #E0DBD2;
} 
:deep(.dark-css .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn){
  color: #FFFFFF;
}
:deep(.ant-tabs-tab-btn){
  width: 100px;
  text-align: center;
} 
// :deep(.ant-table-thead > tr > th){
//   background-color: #36322D !important;
//   border-bottom: 1px solid #36322D;
// }
// :deep(.ant-table-tbody .ant-table-cell){
//   background-color: transparent;
// }
</style>