<template>
  <div class="default-header bg-[#FFFFFF] dark:bg-[#1D1C1A] flex justify-between">
    <div class="flex items-center cursor-pointer">
      <img
        src="@/assets/images/logo.png"
        class="h-[46px]"
        @click="goHome"
      />
      <div class="dark:text-[#FFFFFF] font-bold text-[24px] ml-2">HAMSTER</div>
    </div>
    <div class="flex items-center">
      <a-dropdown>
        <div class="dark:text-[#FFFFFF] text-[16px] cursor-pointer">
          NodeService
          <img
            src="@/assets/icons/up-b.svg"
            class="h-[16px]"
          />
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;">RPCs</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">Apps</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <div class="cursor-pointer flex h-[36px] ml-8">
        <div @click="changeTheme('dark')" class="w-[36px] border border-solid border-[#E2B578] dark:border-[#FFFFFF] flex items-center justify-center rounded-tl-[6px] rounded-bl-[6px]">
          <img
            src="@/assets/icons/dark.svg"
            class="h-[20px]"
          />
        </div>
        <div @click="changeTheme('white')" class="bg-[#E2B578] dark:bg-transparent w-[36px] dark:border dark:border-solid dark:border-[#8A8A8A] flex items-center justify-center rounded-tr-[6px] rounded-br-[6px]">
          <img
            src="@/assets/icons/white-h.svg"
            class="h-[20px] hidden dark:inline-block"
          />
          <img
            src="@/assets/icons/white.svg"
            class="h-[20px] dark:hidden"
          />
        </div>
      </div>
      <a-button class="ml-8" type="primary">Connect Wallet</a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const router = useRouter();
const goHome = () => {
  router.push("/RPCs");
};

const changeTheme = (val: string) => {
  if (val === 'white') {
    document.documentElement.classList.remove('dark')
  } else {
    document.documentElement.classList.add('dark')
  }
}

onMounted(() => {
  changeTheme('dark');
});
</script>

<style lang="less" scoped>
@btnColor: #E2B578;
.default-header {
  position: fixed;
  top: 0;
  padding: 0 32px;
  width: 100%;
  height: 64px;
  z-index: 1;
}

.ant-btn {
  border-radius: 8px;
  height: 40px;

  &:hover,
  &:focus {
    color: @btnColor;
    border-color: @btnColor;
  }
}
:deep(.ant-btn-primary), :deep(.ant-btn-primary:hover), :deep(.ant-btn-primary:focus){
  border-color: @btnColor;
  background: @btnColor;
}
.ant-dropdown-menu{
  border-radius: 6px;
}
</style>
