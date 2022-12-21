<template>
  <div
    class="contractList dark:text-white text-[#121211] grid grid-cols-3 gap-4 border border-solid dark:border-[#434343] border-[#EBEBEB] rounded-[12px]">
    <div class="contractList-left p-[32px]">
      <div class="mb-[64px]">
        <div class="mb-[16px]">
          <img src="@/assets/icons/send-white.svg" class="mr-[8px] hidden dark:inline-block" />
          <img src="@/assets/icons/send-block.svg" class="mr-[8px] dark:hidden" />
          <span class="font-bold align-middle">Send</span>
        </div>
        <div>
          <div
            class="contractList-title dark:text-[#E0DBD2] text-[#73706E] h-[51px] leading-[51px] rounded-[12px] pl-[30px] cursor-pointer"
            :class="checkValue === it ? 'checked' : ''" v-for="it in 2" :key="it" @click="checkContract(it)">
            {{ it }}</div>
        </div>

      </div>
      <div>
        <img src="@/assets/icons/send-white.svg" class="mr-[8px] hidden dark:inline-block" />
        <img src="@/assets/icons/send-block.svg" class="mr-[8px] dark:hidden" />
        <span class="font-bold align-middle">Call</span>
      </div>
    </div>
    <div class="col-span-2 p-[32px]">
      <div class="flex justify-between mb-[32px]">
        <span class="text-[16px] font-blod leading-[43px]">set(x)</span>
        <a-button class="btn">Deploy</a-button>
      </div>
      <div>
        <ContractForm :inputs="abis[0].inputs"></ContractForm>
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { ref, reactive, onMounted } from "vue";
import MathTest from "../../json/MathTest.json";
import SimpleStorage from "../../json/SimpleStorage.json";
import ContractForm from "./ContractForm.vue";
console.log(SimpleStorage.abi, 'SimpleStorage')

const abis = MathTest.abi
const sendAbis = reactive([])
const callAbis = reactive([])
const checkValue = ref(1);


console.log(abis, 'abis')
const initData = () => {
  abis.map((item: any) => {
    if (item.name === 'multiply' || item.name === 'get') {
      sendAbis.push(item)
    } else {
      callAbis.push(item)
    }
  })
}

const checkContract = (val: number) => {
  checkValue.value = val
}

onMounted(() => {
  initData()
})

</script>
<style lang='less' scoped>
@baseColor: #E2B578;

.contractList {
  font-size: 14px;

  .contractList-left {
    border-right: 1px solid #EBEBEB;
  }
}

.btn {
  width: 131px;
  height: 43px;
}

html[data-theme='dark'] {
  .checked {
    background-color: #36322D;
  }

  .contractList-left {
    border-right: 1px solid #434343;
  }
}

.checked {
  background-color: #F9F9F9;
}
</style>