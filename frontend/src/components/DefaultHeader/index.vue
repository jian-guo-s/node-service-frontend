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
            class="h-[16px] hidden dark:inline-block"
          />
          <img
            src="@/assets/icons/up.svg"
            class="h-[16px] dark:hidden"
          />
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="#RPCs">
                <img
                  src="@/assets/icons/RPCs.svg"
                  class="h-[24px]"
                />
                RPCs</a>
            </a-menu-item>
            <a-menu-item>
              <a href="#Apps">
                <img
                  src="@/assets/icons/Apps.svg"
                  class="h-[24px]"
                />
                Apps</a>
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
      <a-button v-if="!isLogin" @click="showWallet" class="ml-8" type="primary">Connect Wallet</a-button>
      <a-dropdown v-if="isLogin">
        <div class="ml-8 px-3 border border-solid border-[#E2B578] rounded-[8px] flex h-[40px] items-center">
          <img
              src="@/assets/icons/metamask-icon.svg"
              class="h-[20px] mr-2"
            />
          <div class="text-[#E2B578] dark:text-[#FFFFFF]">0xBb2…310a</div>
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;">
                <img
                  src="@/assets/icons/disconnect.svg"
                  class="h-[24px]"
                />
                Disconnect</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
  <a-modal v-model:visible="visibleWallet" title="Connect wallet to continue" :footer="null" :maskClosable="false" width="600px">
    <div class="grid grid-cols-3 gap-4">
      <div class="div-img">
        <img
          src="@/assets/images/metamask.png"
          class="img-css"
        />
      </div>
      <div class="div-img">
        <img
          src="@/assets/images/connect.png"
          class="img-css"
        />
      </div>
      <div class="div-img">
        <img
          src="@/assets/images/imToken.png"
          class="img-css"
        />
      </div>
      <div class="div-img">
        <img
          src="@/assets/images/math.png"
          class="img-css"
        />
      </div>
      <div class="div-img">
        <img
          src="@/assets/images/trust.png"
          class="img-css"
        />
      </div>
      <div class="div-img">
        <img
          src="@/assets/images/huobi.png"
          class="img-css"
        />
      </div>
    </div>
  </a-modal>
  <!-- <ConnectButton /> -->
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { onMounted,ref } from "vue";
// import { ConnectButton } from '@rainbow-me/rainbowkit';

const router = useRouter();
const visibleWallet = ref(false);
const isLogin = ref(false);

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

const showWallet = () => {
  visibleWallet.value = true;
}
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
}
:deep(.ant-btn-primary), :deep(.ant-btn-primary:hover), :deep(.ant-btn-primary:focus){
  border-color: @btnColor;
  background: @btnColor;
}
.div-img{
  width: 164px;
  height: 164px;
  border: 1px solid #EBEBEB;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.div-img:active{
  border: 1px solid #E2B578;
}
.img-css{
  height: 90px;
}
</style>
