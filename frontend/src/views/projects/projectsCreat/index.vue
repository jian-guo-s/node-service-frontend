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
        <a-form :class="theme.themeValue === 'dark' ? 'dark-css' : 'white-css'" :model="formData" layout="vertical" ref="formRef" :rules="formRules">
          <a-form-item label="Project Name" name="name" >
            <a-input v-model:value="formData.name" placeholder="Project Name" allow-clear autocomplete="off" />
          </a-form-item>
          <a-form-item label="Project Type" name="type" >
            <a-radio-group v-model:value="formData.type" name="type">
              <a-radio value="1">Contract</a-radio>
              <a-radio value="2">FrontEnd</a-radio>
              <a-radio value="3">Blockchain Node（coming soon）</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="Contract Code">
            <a-radio-group v-model:value="formData.contractCode" name="contractCode">
              <a-radio value="1">Creat a new repository by template</a-radio>
              <a-radio value="2">Use an existing repository</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="Contract Programming Language " name="frameType" >
            <a-radio-group v-model:value="formData.frameType" name="frameType">
              <a-radio value="1">Solidity</a-radio>
              <a-radio value="2">ink!</a-radio>
              <a-radio value="3">Move（coming soon）</a-radio>
              <!-- <a-radio value="4">vue.js</a-radio>
              <a-radio value="5">nuxt.js</a-radio>
              <a-radio value="6">next.js</a-radio>
              <a-radio value="7">vite</a-radio>
              <a-radio value="8">Angular</a-radio> -->
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
import { computed, reactive, ref } from 'vue';
import { useRouter } from "vue-router";
import { apiDupProjectName } from "@/apis/projects";
import { message } from 'ant-design-vue';
import { useThemeStore } from "@/stores/useTheme";
const theme = useThemeStore()

const router = useRouter();
const formRef = ref();
const formData = reactive({
  name: '',
  type: '1',
  contractCode: '1',
  frameType: '1',
});

// Form rules
const formRules = computed(() => {
  const checkDupName = async () => {
    try {
      //校验仓库名称是否存在
      const userInfo = localStorage.getItem('userInfo');
      const params = {
        owner: JSON.parse(userInfo)?.username,
        name: formData.name,
      }
      const res = await apiDupProjectName(params);
      if (res.data === false) {
        return Promise.reject("Project Name duplication");
      } else {
        return Promise.resolve()
      }
    } catch (error: any) {
      console.log("erro:",error)
      return Promise.reject("Project Name check failure");
    }
  }

  const requiredRule = (message: string) => ({ required: true, trigger: 'change', message });
  
  return {
    name: [requiredRule('Please enter Project Name'),{ validator: checkDupName, trigger: "change" }],
  };
});
const goNext = async () => {
  await formRef.value.validate();
  
  try {
    const createProjectTemp = {
      name: formData.name,
      type: formData.type,
      frameType: formData.frameType,
    }
    window.localStorage.setItem("createProjectTemp", JSON.stringify(createProjectTemp));
    router.push("/projects/template");
  } catch (error: any) {
    console.log("erro:",error)
    message.error(error.response.data.message);
  } finally {
    // visibleModal.value = false;
  }
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
:deep(.dark-css .ant-input){
  color: #E0DBD2;
}
:deep(.dark-css .ant-input-affix-wrapper){
  border-color: #434343;
}
:deep(.white-css .ant-input-affix-wrapper){
  border-color: #EBEBEB;
}

:deep(.ant-btn-primary){
  width: 120px;
  height: 40px;
}
</style>