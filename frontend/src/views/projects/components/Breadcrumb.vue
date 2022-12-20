<template>
  <div class="dark:text-white text-[#121211] text-[24px]">
    <span @click="backRoute" class="cursor-pointer backInfo">
      <img src="@/assets/icons/back-dark.svg" class="svg-img w-[24px] mr-[8px]" />
      <span class="font-bold align-middle">back</span>
    </span>
    <!-- <span> | </span> -->
    <span class="font-bold align-middle">{{ currentName }}</span>
  </div>
</template>
<script lang='ts' setup>
import { toRefs } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  currentName: {
    type: String,
    default: '',
  },
});
const router = useRouter();
const { currentName } = toRefs(props);

const backRoute = () => {
  router.go(-1)
}
</script>
<style lang='less' scoped>
.backInfo {
  position: relative;
  margin-right: 32px;

  &::before {
    content: "";
    position: absolute;
    top: 12px;
    right: -16px;
    width: 2px;
    height: 16px;
    background-color: #000000;
    border-radius: 1px;
  }
}

html[data-theme='dark'] {
  .backInfo::before {
    background-color: #ffffff;
  }
}
</style>