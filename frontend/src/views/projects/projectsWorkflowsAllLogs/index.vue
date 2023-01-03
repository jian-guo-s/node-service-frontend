<template>
  <div class="detailLogs dark:text-white text-[#121211] p-[32px]">
    logs
    <div v-for="it in jobLogsData.detailLogsList" :key="it">{{ it }}</div>
  </div>
</template>
<script lang='ts' setup>
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { apiGetDetailLogs } from "@/apis/workFlows";
const router = useRouter();
const jobLogsData = reactive({ detailLogsList: [] });

// const queryParams = router.currentRoute.value.params;
const queryParams = reactive({
  id: router.currentRoute.value.params?.id,
  workflowDetailId: router.currentRoute.value.params?.workflowDetailId,
})
const getDetailLogs = async () => {
  const { data } = await apiGetDetailLogs(queryParams)
  jobLogsData.detailLogsList = data.content?.split('\r')
}
onMounted(() => {
  getDetailLogs()
})
</script>
<style lang='less' scoped>
.detailLogs {
  min-height: 100vh;
}
</style>