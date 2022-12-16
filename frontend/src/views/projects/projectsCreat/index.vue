<template>
  <div>
    <div class="mb-[32px] flex items-center">
      <div class="text-[24px]">back</div>
      <div class="ml-4 text-[24px] dark:font-bold font-normal cursor-pointer">Creat Project</div>
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
          <div class="text-center">
            <a-button type="primary" @click="goNext">Next</a-button>
          </div>
        </a-form>
        <div> img</div>
      </div>  
    </div>
  </div>
</template>
<script lang='ts' setup>
import { computed, onMounted, reactive, ref } from 'vue';

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
</script>
<style lang='less' scoped>

:deep(.white-css .ant-form-item-label > label) {
  color: red;
}
:deep(.dark-css .ant-form-item-label > label) {
  color: white;
}
</style>