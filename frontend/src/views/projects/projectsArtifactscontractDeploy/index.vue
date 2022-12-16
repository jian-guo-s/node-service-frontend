<template>
  <div
    class="artifactsDeploy dark:bg-[#1D1C1A] bg-[#FFFFFF] dark:text-white text-[#121211] grid grid-cols-5 gap-4 p-[32px] rounded-[12px]">
    <a-form class="dark:text-white text-[#121211] col-span-3" :model="formState" name="basic" :label-col="{ span: 0 }"
      :wrapper-col="{ span: 18 }" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed" noStyle>
      <div class="text-[16px] font-bold mb-[20px]">Contract</div>
      <a-form-item class="" name="Version">
        <div class="dark:text-white text-[#121211] mb-[12px]">Version</div>
        <a-select v-model:value="versionValue" style="width: 100%" @change="handleChange">
          <a-select-option :value="item" v-for="item in versionData" :key="item">{{ item }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item name="Name">
        <div class="dark:text-white text-[#121211] mb-[12px]">Name</div>
        <a-checkbox-group class="dark:text-white text-[#121211]" v-model:value="contractValue" name="checkboxgroup"
          :options="nameOptions" @change="changeContractValue" />
      </a-form-item>
      <div class="text-[16px] font-bold mb-[20px]">Network / Chain</div>
      <a-form-item name="Chain">
        <div class="dark:text-white text-[#121211] mb-[12px]">Chain</div>
        <a-select ref="select" v-model:value="chainValue" style="width: 100%" @change="handleChange">
          <a-select-option :value="item" v-for="item in versionData" :key="item">{{ item }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item name="Network">
        <div class="dark:text-white text-[#121211] mb-[12px]">Network</div>
        <a-select ref="select" v-model:value="networkValue" style="width: 100%" @change="handleChange">
          <a-select-option :value="item" v-for="item in versionData" :key="item">{{ item }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-button @click="deployClick">Deploy</a-button>
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
import MathTest from "../json/MathTest.json";
import SimpleStorage from "../json/SimpleStorage.json";
import SelectWallet from "./components/SelectWallet.vue";


const router = useRouter()
const id = router.currentRoute.value.params.id;
const versionValue = ref(router.currentRoute.value.params.version);
// const contractValue = router.currentRoute.value.params.contract;
const contractValue = ref('SimpleStorageA');
const chainValue = ref('');
const networkValue = ref('');
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

.artifactsDeploy {
  font-size: 14px;
}

:deep(.ant-form label) {
  color: #fff !important;
}
</style>