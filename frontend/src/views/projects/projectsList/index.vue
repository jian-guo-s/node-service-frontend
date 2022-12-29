<template>
  <div>
    <div :class="[ isWhite ? 'white-css' : 'dark-css']" class="flex justify-between">
        <div>
          <a-input v-model:value="keyword" placeholder="Search here..." allow-clear autocomplete="off">
            <template #prefix>
              <img
                src="@/assets/icons/white-search.svg"
                class="h-[20px] dark:hidden"
              />
              <img
                src="@/assets/icons/dark-search.svg"
                class="h-[20px] hidden dark:inline-block"
              />
            </template>
          </a-input>
        </div>
      <a-button type="primary" @click="goCreateProject">Creat Project</a-button>
    </div>
    <Overview :viewType="viewType" />
    <a-pagination :class="[ isWhite ? 'white-css' : 'dark-css']" @change="onChange" @showSizeChange="onShowSizeChange" :current="current" :total="total" size="small" />
  </div>
</template>
<script lang='ts' setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from "vue-router";
import Overview from "./components/Overview.vue";
import { apiGetProjects } from "@/apis/projects";


const router = useRouter();
const isWhite = ref(false);
const keyword = ref('');
const viewType = ref("list");
const current = ref(1);
const total = ref(0);
const pageSize = ref(10);
const projectsList = ref([]); //projects列表

const onChange = (pageNumber: number) => {
  console.log("onchange...",pageNumber);
}
const onShowSizeChange = (current: number, pageSize: number) => {
  current = current;
  pageSize = pageSize;
  
  console.log("onShowSizeChange...");
}

const goCreateProject = () => {
  router.push("/projects/creat");
}
    
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

  getProjects();
})

const getProjects = async () => {
  try {
    const params = {
      query: keyword.value,
      page: current.value,
      size: pageSize.value,
    }
    const data = await apiGetProjects(params);
    projectsList.value = data.result;
    total.value = data.total;
    
  } catch (error: any) {
    console.log("erro:",error)
  } finally {
    // loading.value = false;
  }
};
</script>
<style lang='less' scoped>
@baseColor: #E2B578;
:deep(.ant-input),:deep(.ant-input-affix-wrapper){
  background-color: transparent;
  border-radius: 8px;
  height: 40px;
}
:deep(.ant-input-affix-wrapper){
  border-color: #434343;
  padding-top: 0px;
  padding-bottom: 0px;
  width: 350px;
}
:deep(.ant-input:focus),:deep(.ant-input-focused),
:deep(.ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):hover),
:deep(.ant-input-affix-wrapper:focus),:deep(.ant-input-affix-wrapper-focused){
  border-color: @baseColor;
  box-shadow: 0 0 0 2px rgb(226 181 120 / 20%);
}
:deep(.dark-css .ant-input){
  color: #8A8A8A;
  border-color: #434343;
}
:deep(.dark-css .anticon.ant-input-clear-icon) {
  color: #E0DBD2;
}
:deep(.white-css .ant-input){
  color: #BBBAB9;
  border-color: #EBEBEB;
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
:deep(.ant-pagination){
  text-align: center;
  margin-top: 40px;
}
:deep(.ant-pagination-item-active){
  border-color: @baseColor;
  background: @baseColor;
}
:deep(.white-css .ant-pagination-item a),
:deep(.white-css .ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-ellipsis),
:deep(.white-css .ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-link-icon){
  color: #7B7D7B ;
} 
:deep(.dark-css .ant-pagination-item a),
:deep(.dark-css .ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-ellipsis),
:deep(.dark-css .ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-link-icon){
  color: #E0DBD2 ;
}
:deep(.ant-pagination-disabled .ant-pagination-item-link), :deep(.ant-pagination-disabled:hover .ant-pagination-item-link) {
  color: #8A8A8A !important;
  cursor: not-allowed !important;
}
:deep(.ant-pagination-item a:hover), :deep(.ant-pagination-item-link:hover){
  color: #E2B578 !important;
}
:deep(.ant-pagination-item-active a){
  color: #FFFFFF !important;
}
:deep(.ant-pagination-prev button), :deep(.ant-pagination-next button){
  color: #BCBEBC;
}
:deep(.ant-pagination-options){
  display: none;
}
</style>