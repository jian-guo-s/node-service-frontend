<template>
  <div :class="[ isWhite ? 'white-css' : 'dark-css']">
    <div class="mb-[32px] flex items-center">
      <div class="text-[24px] font-bold cursor-pointer flex items-center" @click="goBack">
        <img
          src="@/assets/icons/back-white.svg"
          class="h-[24px] dark:hidden mr-2"
        />
        <img
          src="@/assets/icons/back-dark.svg"
          class="h-[24px] hidden dark:inline-block mr-2"
        />
        back</div>
      <div class="ml-4">
        <img
          src="@/assets/icons/Line-white.svg"
          class="h-[16px] dark:hidden"
        />
        <img
          src="@/assets/icons/Line-dark.svg"
          class="h-[16px] hidden dark:inline-block"
        />
      </div>
      <div class="ml-4 text-[24px] font-bold">Select template</div>
    </div>
    <div class="mt-4 bg-[#FFFFFF] dark:bg-[#1D1C1A] rounded-[12px] p-[32px]">
      <div class="text-[24px] font-bold">NFTs</div>
      <div class="text-[#73706E] dark:text-[#E0DBD2] mb-2">NFT Collections, Editions, Drops and everything else NFT-related.</div>
      <div class="grid grid-cols-3 gap-4">
        <div class="border-box dark:bg-[#36322D] dark:border-[#434343] border-[#EBEBEB] rounded-[12px] border border-solid p-4">
          <div class="font-bold">Multiwrap</div>
          <div class="text-[14px] mt-2 text-[#BBBAB9]">Bundle multiple ERC721/ERC1155/ERC20 tokens into a single ERC721.</div>
          <div class="flex mt-4">
            <div class="flex items-center">
              <img
                src="@/assets/icons/version-white.svg"
                class="h-[20px] dark:hidden"
              />
              <img
                src="@/assets/icons/version-dark.svg"
                class="h-[20px] hidden dark:inline-block"
              />
              V1.0.0</div>
            <div class="flex items-center ml-4">
              <img
                src="@/assets/icons/audi-white.svg"
                class="h-[20px] dark:hidden"
              />
              <img
                src="@/assets/icons/audi-dark.svg"
                class="h-[20px] hidden dark:inline-block"
              />
              Audited</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";


const router = useRouter();

const isWhite = ref(false);
onMounted(() => {
  window.addEventListener('setItemEvent', event => {
    if (event.key === 'themeValue') {
      if (event.newValue === 'white') {
        isWhite.value = true;
      } else {
        isWhite.value = false;
      }
    }
  })
})

const goBack = () => {
   router.back();
}
</script>
<style lang='less' scoped>
.white-css .border-box{
  /* 投影 */
  box-shadow: 6px 6px 15px rgba(242, 238, 234, 0.1);
}
.white-css .border-box-checked{
  border-color: #E2B578;
}
</style>