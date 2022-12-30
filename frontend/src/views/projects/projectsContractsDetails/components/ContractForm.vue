<template>
  <div class="mb-[24px]" v-for="item in inputs">
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
  </div>
</template>
<script lang='ts' setup>
import { toRefs } from 'vue';
import { useThemeStore } from "@/stores/useTheme";
const theme = useThemeStore()

const props = defineProps({
  inputs: { type: Array, default: () => { return [] } },
  // outputs: { type: Array, default: () => { return [] } },
})

const { inputs } = toRefs(props)
console.log(inputs, 'inputInfo')
</script>
<style lang='less' scoped>
.ant-input-affix-wrapper {
  background: transparent;
  border-radius: 8px;
  border: 1px solid #EBEBEB;
  // color: #121211;
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