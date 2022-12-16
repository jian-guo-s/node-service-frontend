<template>
  <div class="process">
    <div class="process-content">
      <div class="flex justify-between">
        <span class="process-content-title">Execution Process</span>
        <span class="text-[14px] text-[#fff] cursor-pointer" @click="checkAllLogs">全部日志</span>
      </div>
      <div class="process-scroll-box wrapper" ref="wrapper">
        <div v-for="item in processData" :key="item.name">
          <div class="inline-block border border-solid border-[#EFEFEF] p-[12px] rounded-[5px]"
            :class="item.status === 0 ? '' : 'cursorP'" @click="checkProcess(item, $event)">
            <!-- <img :src="getImageUrl(item.status)" class="w-[28px] mr-[24px] align-middle" v-if="item.status !== 1" /> -->
            <!-- <img src="@/assets/images/run.gif" class="w-[28px] mr-[24px] align-middle" v-else /> -->
            <span class="align-middle">
              <span class="text-[16px] text-[#fff] font-semibold mr-[24px]">{{ item.name }}</span>
              <!-- <span class="text-[16px] text-[#7B7D7B]" v-if="item.status !== 0">{{ formatDurationTime(item.duration,
                "noThing")
            }}</span> -->
            </span>
          </div>
          <img src="@/assets/images/arrow-green.jpg" class="w-[28px] space-mark ml-[20px] mr-[20px]" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { ref, onMounted, toRefs } from "vue";
import BScroll from "@better-scroll/core";
import Scrollbar from "@better-scroll/scroll-bar";
BScroll.use(Scrollbar);

const props = defineProps({
  processData: {
    type: Array,
    default: () => {
      return []
    }
  }
})
const wrapper = ref()
const { processData } = toRefs(props);

const checkProcess = (item: any, e: Event) => {
  if (item.status === 0) {
    e.stopPropagation();
  } else {
    // stagesData.title = item.name;
    // processModalRef.value.showVisible();
    // stagesData.content = []
    // await getStageLogsData(item);
  }
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
.process {
  width: 100%;
  font-size: 14px;
  border-radius: 12px;

  // .process-detail-item {
  //   position: relative;

  //   &::before {
  //     content: "";
  //     position: absolute;
  //     top: 0px;
  //     right: -2px;
  //     width: 1px;
  //     height: 44px;
  //     border: 1px dashed #3f4641;
  //   }
  // }

  // .process-detail-title {
  //   color: #ffffff;
  //   font-weight: 600;
  // }

  // .process-detail-info {
  //   color: #bcbebc;
  // }

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
    padding: 24px;
    border: 1px solid #efefef;
    border-radius: 12px;
    margin-bottom: 24px;

    .process-content-title {
      font-size: 20px;
      font-weight: 600;
      color: #121211;
      margin-bottom: 12px;
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