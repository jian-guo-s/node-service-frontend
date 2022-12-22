<template>
  <div class="process rounded-[12px] mt-[24px] dark:bg-[#1D1C1A] bg-[#ffffff] dark:text-white text-[#121211]">
    <div class="process-content">
      <div class="flex justify-between">
        <span class="process-content-title">{{ $t('workFlows.executionProcess') }}</span>
        <span class="text-[14px] cursor-pointer" @click="checkAllLogs">{{ $t('workFlows.viewFullLogs') }}</span>
      </div>
      <div class="process-scroll-box wrapper" ref="wrapper">
        <div v-for="item in processData" :key="item.name">
          <div class="inline-block border border-solid border-[#EFEFEF] p-[11px] rounded-[5px]"
            :class="item.status === 0 ? '' : 'cursorP'" @click="checkProcess(item, $event)">
            <img src="@/assets/icons/start.svg" class="mr-[24px]" />
            <!-- <img :src="getImageUrl(item.status)" class="w-[28px] mr-[24px] align-middle" v-if="item.status !== 1" /> -->
            <!-- <img src="@/assets/images/run.gif" class="w-[28px] mr-[24px] align-middle" v-else /> -->
            <span class="align-middle">
              <span class="text-[16px] font-semibold mr-[24px]">{{ item.name }}</span>
              <!-- <span class="text-[16px] text-[#7B7D7B]" v-if="item.status !== 0">{{ formatDurationTime(item.duration,
                "noThing")
            }}</span>  -->
            </span>
          </div>
          <!-- <img src="@/assets/icons/arrow-block.svg" class="w-[28px] space-mark ml-[20px] mr-[20px]" /> -->
          <img src="@/assets/icons/arrow-white.svg"
            class="w-[28px] space-mark ml-[20px] mr-[20px]  hidden dark:inline-block" />
          <img src="@/assets/icons/arrow-block.svg" class="w-[28px] space-mark ml-[20px] mr-[20px] dark:hidden" />
        </div>
      </div>
    </div>
  </div>
  <Processmodal ref="processModalRef"></Processmodal>
</template>
<script lang='ts' setup>
import { ref, onMounted, toRefs } from "vue";
import BScroll from "@better-scroll/core";
import Scrollbar from "@better-scroll/scroll-bar";
import Processmodal from "./ProcessModal.vue";
BScroll.use(Scrollbar);

const props = defineProps({
  processData: {
    type: Array,
    default: () => {
      return []
    }
  }
})
const processModalRef = ref();
const wrapper = ref()
const { processData } = toRefs(props);

const checkProcess = (item: any, e: Event) => {
  processModalRef.value.showVisible();
  if (item.status === 0) {
    e.stopPropagation();
  } else {
    // stagesData.title = item.name;
    // processModalRef.value.showVisible();
    // stagesData.content = []
    // await getStageLogsData(item);
  }
}

const checkAllLogs = () => {
  window.open(`/projects/:id/workflows/:workflowId/allLogs`)
}

onMounted(() => {
  let scroll = new BScroll(wrapper.value, {
    startX: 0,
    scrollX: true,
    scrollY: false,
    probeType: 1,
    scrollbar: {
      fade: false,
      interactive: true,
    },
  });
})
</script>
<style lang='less' scoped>
@backGroundCOlor: #1D1C1A;

.process {
  width: 100%;
  font-size: 14px;

  .process-scroll-box {
    white-space: nowrap;
    overflow: hidden;

    .process-scroll {
      display: inline-block;
      margin-bottom: 24px;

      .cursorP {
        cursor: pointer;
      }
    }
  }

  .process-content {
    padding: 32px;
    border-radius: 12px;
    margin-bottom: 24px;

    .process-content-title {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 32px;
    }

    .process-content-title:first {
      margin-bottom: 24px;
    }
  }

  .process-content:last-child {
    margin-bottom: 0px;
  }

  .execution_process_item:last-child {
    .space-mark {
      display: none;
    }
  }
}
</style>