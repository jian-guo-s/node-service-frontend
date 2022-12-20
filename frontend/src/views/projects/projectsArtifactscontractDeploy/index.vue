<template>
  <Breadcrumb :currentName="'Contract Deploy'"></Breadcrumb>
  <div
    class="artifactsDeploy dark:bg-[#1D1C1A] bg-[#FFFFFF] dark:text-white text-[#121211] grid grid-cols-5 gap-4 p-[32px] rounded-[12px] mt-[24px]">
    <a-form class="dark:text-white text-[#121211] col-span-3" :model="formState" name="basic" :label-col="{ span: 0 }"
      :wrapper-col="{ span: 18 }" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed" noStyle>
      <div class="text-[16px] font-bold mb-[20px]">Contract</div>
      <a-form-item class="">
        <div class="dark:text-white text-[#121211] mb-[12px]">Version</div>
        <a-select v-model:value="versionValue" style="width: 100%" @change="handleChange" placeholder="请选择">
          <a-select-option :value="item" v-for="item in versionData" :key="item">{{ item }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item name="Name" class="mb-[32px]">
        <div class="dark:text-white text-[#121211] mb-[12px]">Name</div>
        <a-checkbox-group class="dark:text-white text-[#121211]" :class="theme.themeValue === 'dark' ? 'dark-css' : ''"
          v-model:value="contractValue" name="checkboxgroup" :options="nameOptions" @change="changeContractValue" />
      </a-form-item>
      <div class="text-[16px] font-bold mb-[20px]">Network / Chain</div>
      <a-form-item>
        <div class="dark:text-white text-[#121211] mb-[12px]">Chain</div>
        <a-select v-model:value="chainValue" style="width: 100%" @change="handleChange" placeholder="请选择">
          <a-select-option :value="item" v-for="item in versionData" :key="item">{{ item }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item name="Network">
        <div class="dark:text-white text-[#121211] mb-[12px]">Network</div>
        <a-select v-model:value="networkValue" style="width: 100%" @change="handleChange" placeholder="请选择">
          <a-select-option :value="item" v-for="item in versionData" :key="item">{{ item }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-button class="btn" @click="deployClick">Deploy</a-button>
    </a-form>
  </div>
  <SelectWallet :visible="visible" @cancelModal="cancelModal"></SelectWallet>
</template>
<script lang='ts' setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import * as ethers from "ethers";
// import MathTest from "../../json/MathTest.json";
// import SimpleStorage from "../../json/SimpleStorage.json";
import Breadcrumb from "../components/Breadcrumb.vue";
import MathTest from "../json/MathTest.json";
import SimpleStorage from "../json/SimpleStorage.json";
import SelectWallet from "./components/SelectWallet.vue";
import { useThemeStore } from "@/stores/useTheme";

const theme = useThemeStore()
const router = useRouter()
const id = router.currentRoute.value.params.id;
const versionValue = ref(router.currentRoute.value.params.version);
// const contractValue = router.currentRoute.value.params.contract;
const contractValue = ref('SimpleStorageA');
const chainValue = ref(undefined);
const networkValue = ref(undefined);
const isContractWallets = ref(false);
const visible = ref(false)
const versionData = reactive(['3.1.1', '2.1.1', '1.1.1', '0.1.1']);
const nameOptions = reactive(['SimpleStorageA', 'SimpleStorageB']);

const handleChange = (val: any) => {
  console.log(val, 'val')
  versionValue.value = val
}

const deployClick = async () => {
  if (!isContractWallets) {
    // 创建合约
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const accounts = await provider.send('eth_requestAccounts', []);
    // console.log(ethereum, 'ethereum')

    const factory = new ethers.ContractFactory(
      MathTest.abi,
      MathTest.bytecode,
      provider.getSigner()
    );

    const contract = await factory.deploy();
    await contract.deployed();

  } else {
    visible.value = true
  }
}

const changeContractValue = (checkedValue: any) => {
  console.log(checkedValue, 'checkedValue')
}

const cancelModal = (val: boolean) => {
  visible.value = val
}
</script>
<style lang='less' scoped>
@backGroundCOlor: #1D1C1A;
@baseColor: #E2B578;

.dark-css {
  :deep(label) {
    color: #ffffff !important;
  }
}

.artifactsDeploy {
  font-size: 14px;
}

:deep(.ant-form label) {
  color: #121211;
}

.btn {
  width: 131px;
  height: 43px;
}

:deep(.ant-checkbox-wrapper-checked:hover) {
  border-radius: 4px;
}

:deep(.ant-checkbox-checked:hover) {
  border-radius: 4px;
}

:deep(.ant-checkbox-inner) {
  width: 20px;
  height: 20px;
  border-radius: 4px;
}

:deep(.ant-checkbox-wrapper:hover) {
  border-radius: 4px;
}

:deep(.ant-select-single:not(.ant-select-customize-input) .ant-select-selector) {
  // background-color: #000000 !important;
  // border: 1px solid @baseColor !important;
}





input::-webkit-input-placeholder,
input:-moz-placeholder,
input::-moz-placeholder,
input:-ms-input-placeholder {
  color: #bcbebc;
}
</style>