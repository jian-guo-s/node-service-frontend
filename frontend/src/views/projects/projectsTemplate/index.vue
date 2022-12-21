<template>
  <div>
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
  </div>
</template>
<script lang='ts' setup>
</script>
<style lang='less' scoped>

</style>