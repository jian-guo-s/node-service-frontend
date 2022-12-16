<template>
  <div>
    <div class="flex justify-between">
      <div>
        <div class="dark-input hidden dark:inline-block w-full">
          <a-input v-model:value="search" placeholder="Search here..." />
        </div>
        <div class="white-input dark:hidden w-full">
          <a-input v-model:value="search" placeholder="Search here..." />
        </div>
      </div>
      <a-button type="primary" @click="goCreateProject">Creat Project</a-button>
    </div>
    <Overview :viewType="viewType" />
  </div>
</template>
<script lang='ts' setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";
import Overview from "./components/Overview.vue";


const router = useRouter();
const search = ref('');
const viewType = ref("list");


const goCreateProject = () => {
  router.push("/projects/creat");
}
</script>
<style lang='less' scoped>
@baseColor: #E2B578;
:deep(.ant-input){
  background-color: transparent;
  border-radius: 8px;
  height: 40px;
}
:deep(.ant-input:focus),:deep(.ant-input-focused){
  border-color: @baseColor;
  box-shadow: 0 0 0 2px rgb(226 181 120 / 20%);
}
:deep(.dark-input .ant-input){
  color: #8A8A8A;
  border-color: #434343;
}
:deep(.white-input .ant-input){
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
</style>