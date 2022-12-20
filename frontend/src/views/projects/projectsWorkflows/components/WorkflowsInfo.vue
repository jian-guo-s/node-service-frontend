<template>
  <div class="workFlows dark:bg-[#1D1C1A] bg-[#ffffff] dark:text-white text-[#121211] rounded-[12px]">
    <a-row>
      <a-col :span="8">
        <div class="">
          <div class="process-detail-title">Code Repository</div>
          <div class="process-detail-info">https://github.com/hamster-shared/hamster.git</div>
          <div class="process-detail-info">
            <img src="@/assets/icons/dark-link.svg" class="mr-[8px] h-[16px]" />
            <span class="align-middle">master</span>
          </div>
        </div>
      </a-col>
      <a-col :span="8">
        <div class="process-detail-item">
          <div class="process-detail-title">Check Result</div>
          <div class="process-detail-info">Action succeed</div>
          <div class="process-detail-info">Action succeed</div>
        </div>
      </a-col>
      <a-col :span="8">
        <div class="process-detail-item">
          <div class="process-detail-title">Time</div>
          <div class="process-detail-info">1h ago action</div>
          <div class="process-detail-info">6m spend</div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang='ts' setup>
const props = defineProps({
  workflowsInfoData: { type: Object }
});
</script>
<style lang='less' scoped>
@backGroundCOlor: #1D1C1A;

.workFlows {
  font-size: 14px;
  padding: 32px;
}

.process-detail-item {
  position: relative;
  padding-left: 32px;

  &::after {
    content: "";
    position: absolute;
    top: 0px;
    left: 0;
    width: 1px;
    // height: 99px;
    height: calc(100% + 1px);
    border: 1px solid #302D2D;
  }
}

.process-detail-title {
  font-weight: 600;
  margin-bottom: 16px;
}

.process-detail-info {
  color: #bcbebc;
  margin-bottom: 16px;
}

.process-detail-info:last-child {
  margin-bottom: 0px;
}
</style>