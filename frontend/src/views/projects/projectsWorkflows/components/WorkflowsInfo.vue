<template>
  <div class="dark:text-white text-[#121211]">
    <a-row>
      <a-col :span="8">
        <div class="process-detail-item">
          <div class="process-detail-title">Code Repository</div>
          <div class="process-detail-info">https://github.com/hamster-shared/hamster.git</div>
          <div class="process-detail-info">master</div>
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
  workflowsInfoData: {type: Object }
});
</script>
<style lang='less' scoped>
.process-detail-item {
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0px;
    right: -2px;
    width: 1px;
    height: 44px;
    border: 1px dashed #3f4641;
  }

  .process-detail-title {
    color: #ffffff;
    font-weight: 600;
  }

  .process-detail-info {
    color: #bcbebc;
  }
}
</style>