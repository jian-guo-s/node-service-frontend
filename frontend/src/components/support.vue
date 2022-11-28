<template>
  <div class="fixed right-0 top-[50%] -mt-[57px] z-10 mr-4">
    <img
      src="@/assets/images/support.png"
      class="w-[114px]"
      @click="getSupport"
    />
  </div>
</template>
<script lang="ts" setup>

const getSupport = () => {
  console.log("get support ...");
}
</script>