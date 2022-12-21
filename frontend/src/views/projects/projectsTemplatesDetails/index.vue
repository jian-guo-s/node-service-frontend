<template>
  <div :class="[ isWhite ? 'white-css' : 'dark-css']">
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
        <div class="ml-4 text-[24px] font-bold">Multiwrap</div>
      </div>
      <div>
       <a-button type="primary" ghost>1.0.0（latest）</a-button>
       <a-button type="primary" class="ml-4">Creat by template</a-button>
      </div>
    </div>
    <div class="mt-4 rounded-[12px] dark:bg-[#1D1C1A] bg-[#FFFFFF]">
      <div class="bg-[#36322D] rounded-tl-[12px] rounded-tr-[12px] p-4">
        <div class="text-[24px] font-bold text-[#FFFFFF]">Multiwrap Contract</div>
        <div class="mt-2 text-[#BBBAB9]">The Multiwrap contract lets you wrap ERC20, ERC721 and ERC1155 tokens into a new wrapped ERC721 NFT. The wrapped NFT can be unwrapped (burned) back into the underlying tokens.
The wrapped NFT itself also acts as an ERC721 token, which can have the metadata you'd expect of an NFT, such as a name, image, description, etc.</div>
      </div>
      <div class="p-4">
        <div class="text-[24px] font-bold">Extensions</div>
        <div class="mt-4 border border-solid border-[#E2B578] bg-[#FFFCF9] dark:bg-[#36322D] p-4 rounded-[12px] grid grid-cols-5 gap-4">
          <a-checkbox v-model:checked="checked">ERC721</a-checkbox>
          <a-checkbox v-model:checked="checked">ERC721Supply</a-checkbox>
          <a-checkbox v-model:checked="checked">ERC721Enumerable</a-checkbox>
          <a-checkbox v-model:checked="checked">ContractMetadata</a-checkbox>
          <a-checkbox v-model:checked="checked">Royalty</a-checkbox>
          <a-checkbox v-model:checked="checked">Permissions</a-checkbox>
          <a-checkbox v-model:checked="checked">PermissionsEnumerable</a-checkbox>
          <a-checkbox v-model:checked="checked">Ownable</a-checkbox>
          <a-checkbox v-model:checked="checked">ContractMetadata</a-checkbox>
          <a-checkbox v-model:checked="checked">Gasless</a-checkbox>
        </div>
        <div class="mt-4 text-[24px] font-bold flex items-center">
          <img
            src="@/assets/icons/example.svg"
            class="h-[32px]"
          />
          Use Cases & Examples</div>
          <div class="mt-4">You could use the Multiwrap contract to:</div>
          <ul class="dark:text-[#E0DBD2] text-[#73706E]">
            <li>Combine multiple NFTs into one NFT with new metadata</li>
            <li>Wrap NFTs along with ERC20 tokens to easily trade them for other NFTs</li>
            <li>Create a transparent "bundle" in your game, where the contents of the bundle are visible to the player</li>
          </ul>
        <div class="mt-4 text-[24px] font-bold flex items-center">
          <img
            src="@/assets/icons/resource.svg"
            class="h-[32px]"
          />
          Resources</div>
          <ul class="mt-4 dark:text-[#E0DBD2] text-[#73706E]">
            <li>Frontend demo project</li>
            <li>Technical design doc</li>
            <li>Full reference</li>
          </ul>
      </div>
    </div>
    <div :class="[ isWhite ? 'white-css' : 'dark-css']" class="mt-4 rounded-[12px] dark:bg-[#1D1C1A] bg-[#FFFFFF] pt-4">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="Functions">
          <div class="flex">
            <div class="p-4 border-r-[#302D2D] border-r border">
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
            <div>
              <div class="flex justify-between">
                <div class="text-[16px] font-bold">approve</div>
                <div class="text-[#E0DBD2]">inputs</div>
              </div>
              <a-table
                class="my-4"
                :columns="tableColumns"
                :dataSource="approveList"
              ></a-table>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Events">
        </a-tab-pane>
        <a-tab-pane key="3" tab="Sources">
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";


const router = useRouter();
const checked = ref(true);
const isWhite = ref(false);
const activeKey = ref("1");
const approveList = ref([]);

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
    dataIndex: 'network',
    align: 'center',
    ellipsis: 'fixed',
    key: 'network',
  },
]);

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
:deep(.ant-btn-primary){
  width: 150px;
  height: 40px;
}
:deep(.ant-checkbox-wrapper){
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