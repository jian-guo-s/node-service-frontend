<template>
  <div class="dark:text-white text-[#121211] grid grid-cols-5 gap-4">
    <a-form class="dark:text-white text-[#121211] col-span-3" :model="formState" name="basic" :label-col="{ span: 2 }"
      :wrapper-col="{ span: 16 }" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
      <div class="text-[24px] mb-[12px]">Contract</div>
      <a-form-item class="" label="Version" name="Version">
        <a-select v-model:value="versionValue" style="width: 100%" @change="handleChange">
          <a-select-option :value="item" v-for="item in versionData" :key="item">{{ item }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Name" name="Name">
        <a-checkbox-group class="dark:text-white text-[#121211]" v-model:value="contractValue" name="checkboxgroup"
          :options="nameOptions" @change="changeContractValue" />
      </a-form-item>
      <div class="text-[24px] mb-[12px]">Network / Chain</div>
      <a-form-item label="Chain" name="Chain">
        <a-select ref="select" v-model:value="chainValue" style="width: 100%" @change="handleChange">
          <a-select-option :value="item" v-for="item in versionData" :key="item">{{ item }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Network" name="Network">
        <a-select ref="select" v-model:value="networkValue" style="width: 100%" @change="handleChange">
          <a-select-option :value="item" v-for="item in versionData" :key="item">{{ item }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-button @click="deployClick">Deploy</a-button>
    </a-form>
    <div class="col-span-2">大图</div>
  </div>
  <SelectWallet :visible="visible" @cancelModal="cancelModal"></SelectWallet>
</template>
<script lang='ts' setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import SelectWallet from "./components/SelectWallet.vue"

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

const deployClick = () => {
  if (!isContractWallets) {
    console.log('已连接')
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
:deep(.ant-form label) {
  color: #fff !important;
}
</style>