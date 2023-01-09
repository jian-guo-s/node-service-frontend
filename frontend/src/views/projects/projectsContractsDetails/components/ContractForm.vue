<template>
  <!-- <div class="mb-[24px]" v-for="item in inputs">
    <div class="mb-[12px]">
      <span class="dark:text-[#FFFFFF] text-[#151210] text-[16px] font-bold">{{ item.name }}</span>
    </div>
    <a-input class="dark:text-white text-[121211]" :class="theme.themeValue === 'dark' ? 'dark-css' : ''"
      placeholder="请输入" allowClear></a-input>
  </div>
  <div class="mb-[24px]">
    <div class="flex justify-between  mb-[12px]">
      <span class="dark:text-[#FFFFFF] text-[#151210]  text-[16px] font-bold">outputs</span>
      <span class="text-[#E2B578] text-[16px] cursor-pointer">
        <img src="@/assets/icons/copy.svg" />
        copy</span>
    </div>
    <a-textarea class="dark:text-white text-[121211]" placeholder="请输入" :rows="4"
      :class="theme.themeValue === 'dark' ? 'dark-css' : ''" />
  </div> -->
  <div class="flex justify-between mb-[32px]">
    <span class="text-[16px] font-blod leading-[43px]">{{ checkValue }}</span>
    <a-button class="btn" @click="deployBtn">Deploy</a-button>
  </div>
  <a-form class="dark:text-white text-[#121211] col-span-3" ref="formRef" :model="formState" name="basic"
    :label-col="{ span: 0 }" :wrapper-col="{ span: 24 }" autocomplete="off" noStyle id="formState">
    <div v-for="item in inputs">

      <a-form-item class="" name="" :rules="[{ required: true, message: 'Please input your Version!' }]">
        <div class="mb-[12px]">
          <span class="dark:text-[#FFFFFF] text-[#151210] text-[16px] font-bold">{{ item.name }}</span>
        </div>
        <a-input class="dark:text-white text-[121211]" :class="theme.themeValue === 'dark' ? 'dark-css' : ''"
          placeholder="请输入" allowClear></a-input>
      </a-form-item>
    </div>
    <div class="mb-[24px]">
      <div class="flex justify-between  mb-[12px]">
        <span class="dark:text-[#FFFFFF] text-[#151210]  text-[16px] font-bold">outputs</span>
        <span class="text-[#E2B578] text-[16px] cursor-pointer">
          <img src="@/assets/icons/copy.svg" />
          copy</span>
      </div>
      <a-textarea class="dark:text-white text-[121211]" placeholder="请输入" :rows="4"
        :class="theme.themeValue === 'dark' ? 'dark-css' : ''" />
    </div>
  </a-form>

</template>
<script lang='ts' setup>
import { reactive, toRefs, watch, ref } from 'vue';
import { useThemeStore } from "@/stores/useTheme";
import * as ethers from "ethers";
import YAML from "yaml";
const theme = useThemeStore()

const props = defineProps({
  contractAddress: String,
  checkValue: String,
  abiInfo: String,
  inputs: { type: Array, default: () => { return [] } },

})

const formRef = ref(null)
const formState = reactive({
  contractAddress: '',
  checkValue: '',
  abiInfo: '',
});

const { checkValue, contractAddress, abiInfo, inputs } = toRefs(props)
Object.assign(formState, { contractAddress: contractAddress?.value, checkValue: checkValue?.value, abiInfo: abiInfo?.value })
console.log(formState, 'formState')

const copy = (text: string) => {
  // var inp = document.createElement("input");
  // inp.style.position = "absolute";
  // inp.style.opacity = 0;
  // document.body.appendChild(inp);
  // inp.value = text;
  // inp.select();
  // document.execCommand("copy", false);
  // inp.remove();
}
const deployBtn = async () => {
  const { ethereum } = window;
  console.log(formRef.value, contractAddress?.value, 'formRef')


  let provider = new ethers.providers.Web3Provider(ethereum);
  let abi = YAML.parse(formState.abiInfo);
  let contract = new ethers.Contract(formState.contractAddress, abi, provider.getSigner());
  console.log(contract, 'contract')
  // const form = document.getElementById('formState');

  const data = new FormData(formRef.value.target);

  let exec;
  if (data.get("__value")) {
    const value = ethers.utils.parseEther(data.get("__value") || "0");
    data.delete("__value");
    exec = contract[formState.checkValue](...data.values(), { value });
  } else {
    exec = contract[formState.checkValue](...data.values());
  }

  // console.log(exec, 'exec')
  // exec.then((val: any) => {
  //   console.log(val, 'val')
  // }).catch((err: any) => {
  //   console.log(err, 'err')
  // })

}

watch(
  () => props,
  (oldV, newV) => {
    if (newV) {
      console.log(newV, 'new')
    }
  }, { deep: true }
);
</script>
<style lang='less' scoped>
.btn {
  width: 131px;
  height: 43px;
}

.ant-input-affix-wrapper {
  background: transparent;
  border-radius: 8px;
  border: 1px solid #EBEBEB;
}

:deep(.ant-input) {
  height: 32px;
  background: transparent;
  color: #121211;
}

html[data-theme="dark"] {
  .ant-input-affix-wrapper {
    border: 1px solid #302D2D;
    color: #ffffff;
  }
}

.dark-css {
  :deep(.ant-input) {
    color: #ffffff;
  }

  :deep(.anticon.ant-input-clear-icon) {
    color: #E0DBD2;
  }
}

input::-webkit-input-placeholder,
input:-moz-placeholder,
input::-moz-placeholder,
input:-ms-input-placeholder {
  color: #E0DBD2;
}
</style>