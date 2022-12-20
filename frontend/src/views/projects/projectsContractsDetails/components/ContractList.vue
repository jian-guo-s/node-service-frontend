<template>
  <div
    class="contractList dark:text-white text-[#121211] grid grid-cols-3 gap-4 border border-solid border-[#434343] p-[32px] rounded-[12px]">
    <div>
      <div>
        <img src="@/assets/icons/send-white.svg" class="mr-[8px]" />
        <span class="font-bold text-[#ffffff] align-middle">Send</span>
      </div>
    </div>
    <div class="col-span-2">
      <div class="flex justify-between">
        <span class="text-[16px] font-blod">set(x)</span>
        <a-button class="btn">Deploy</a-button>
      </div>
      <div>

      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { ref, reactive, onMounted } from "vue";
import MathTest from "../../json/MathTest.json";
import SimpleStorage from "../../json/SimpleStorage.json";
console.log(SimpleStorage.abi, 'SimpleStorage')

const abis = MathTest.abi
const sendAbis = reactive([])
const callAbis = reactive([])


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
onMounted(() => {
  initData()
})

</script>
<style lang='less' scoped>
.contractList {
  font-size: 14px;
}

@baseColor: #E2B578;

.btn {
  width: 131px;
  height: 43px;
  background-color: @baseColor;
  color: #fff;
  border-color: @baseColor;
}

.btn:hover,
.btn:focus {
  background-color: @baseColor;
  color: #fff;
}
</style>