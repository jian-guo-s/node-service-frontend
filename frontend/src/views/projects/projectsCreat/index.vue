<template>
  <div>
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
      <div class="ml-4 text-[24px] font-bold">Creat Project</div>
    </div>
    <div class="mt-4 dark:bg-[#1D1C1A] bg-[#FFFFFF] rounded-[16px] py-[24px] px-[32px]">
      <div class="flex justify-between">
        <a-form :class="[ isWhite ? 'white-css' : 'dark-css']" :model="formData" layout="vertical" ref="formRef" :rules="formRules">
          <a-form-item label="Project Name" name="projectName" >
            <a-input v-model:value="formData.projectName" placeholder="Project Name" allow-clear autocomplete="off" />
          </a-form-item>
          <a-form-item label="Project Type" name="projectType" >
            <a-radio-group v-model:value="formData.projectType" name="projectType">
              <a-radio value="Contract">Contract</a-radio>
              <a-radio value="FrontEnd">FrontEnd</a-radio>
              <a-radio value="Blockchain Node（coming soon）">Blockchain Node（coming soon）</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="Contract Code" name="contractCode" >
            <a-radio-group v-model:value="formData.contractCode" name="contractCode">
              <a-radio value="1">Creat a new repository by template</a-radio>
              <a-radio value="2">Use an existing repository</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="Contract Programming Language " name="language" >
            <a-radio-group v-model:value="formData.language" name="language">
              <a-radio value="Solidity">Solidity</a-radio>
              <a-radio value="ink!">ink!</a-radio>
              <a-radio value="Move（coming soon）">Move（coming soon）</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-button type="primary" @click="goNext">Next</a-button>
        </a-form>
        <div></div>
      </div>  
    </div>
  </div>
</template>
<script lang='ts' setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from "vue-router";

const router = useRouter();
const isWhite = ref(false);
const formData = reactive({
  projectName: '',
  projectType: 'Contract',
  contractCode: '',
  language: '',
});

// Form rules
const formRules = computed(() => {

  const requiredRule = (message: string) => ({ required: true, trigger: 'change', message });
  
  return {
    name: [requiredRule('projectName')],
  };
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

const goNext = () => {
  console.log("next...");
}

const goBack = () => {
   router.back();
}
</script>
<style lang='less' scoped>
@baseColor: #E2B578;
:deep(.white-css .ant-form-item-label > label) {
  color: #151210;
}
:deep(.dark-css .ant-form-item-label > label) {
  color: white;
}
:deep(.ant-input),:deep(.ant-input-affix-wrapper){
  background-color: transparent;
  border-radius: 8px;
  height: 40px;
}
:deep(.ant-input-affix-wrapper){
  padding-top: 0px;
  padding-bottom: 0px;
  width: 550px;
}
:deep(.ant-input:focus),:deep(.ant-input-focused),
:deep(.ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):hover),
:deep(.ant-input-affix-wrapper:focus),:deep(.ant-input-affix-wrapper-focused){
  border-color: @baseColor;
  box-shadow: 0 0 0 2px rgb(226 181 120 / 20%);
}
:deep(.dark-css .ant-input),
:deep(.dark-css .anticon.ant-input-clear-icon),
:deep(.dark-css .ant-radio-wrapper) {
  color: #E0DBD2;
}
:deep(.white-css .ant-radio-wrapper){
  color: #BBBAB9;
}
:deep(.dark-css .ant-radio-inner),
:deep(.dark-css .ant-input-affix-wrapper){
  border-color: #434343;
}
:deep(.white-css .ant-radio-inner),
:deep(.white-css .ant-input-affix-wrapper){
  border-color: #EBEBEB;
}
:deep(.ant-radio-inner){
  background-color: transparent;
  border-radius: 4px;
  height: 20px;
  width: 20px;
}
:deep(.ant-radio-checked .ant-radio-inner),
:deep(.ant-radio-wrapper:hover .ant-radio), 
:deep(.ant-radio:hover .ant-radio-inner), 
:deep(.ant-radio-input:focus + .ant-radio-inner){
  border-color: @baseColor;
}
:deep(.ant-radio-input:focus + .ant-radio-inner){
  box-shadow: 0 0 0 1px @baseColor;
  
}
:deep(.ant-radio-inner::after){
  background-color: @baseColor;
  border-radius: 2px;
}
:deep(.ant-radio-wrapper-checked){
  color: @baseColor !important;
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