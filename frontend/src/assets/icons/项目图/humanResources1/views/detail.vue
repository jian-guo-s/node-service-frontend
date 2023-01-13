<template>
  <div class="detail">
    <div class="detail-info">
      <div class="detail-info-left">
        <img src="../../../assets/images/people.jpg" />
        <div class="detail-info-box">
          <div class="info-name">张居正</div>
          <div class="info-position">后端开发工程师</div>
          <div class="info-workYear">工作经验：3年</div>
          <div class="info-education">最高学历：本科｜全日制</div>
        </div>
      </div>
      <div class="detail-info-right">
        <a-button>预约面试</a-button>
        <a-button>创建合约</a-button>
      </div>
    </div>

    <div class="skills">
      <Skills></Skills>
    </div>
    <div>
      <Education></Education>
    </div>
    <div>
      <Project></Project>
    </div>
    
  </div>
</template>
<script>
import { onMounted, reactive, toRefs } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import Skills from '../views/components/skills.vue'
import Education from '../views/components/educaion.vue'
import Project from '../views/components/project.vue'
export default{
  name: 'talentDetail',
  components: {
    Skills,
    Education,
    Project
  },
  setup() {
    const route = useRoute()
    const state = reactive({
      id: '',
    })

    onMounted(() => {
      state.id = route.params.id
    })
    
    return {
      ...toRefs(state)
    }

    
  },
}
</script>
<style lang="scss" scoped>
.detail {
  color: #58637B;
  font-size: 14px;
  max-width: 1222px;
  padding-top: 60px;
  margin: 0 auto;
  justify-content: space-between;
  .detail-info {
    //  display: flex;
  }
  .detail-info-left {
    width: 848px;
    display: inline-block;
    img, .detail-info-box {
      display: inline-block;
      vertical-align: middle;
    }
    img {
      width: 292px;
      height: 296px;
    } 
    .detail-info-box {
      .info-name {
        font-size: 32px;
        font-weight: 700;
        color: #000000;

      }
      .info-position {
        font-size: 16px;

      }

      .info-workYear {

      }

      .info-education {

      }

    }
  }
  .detail-info-right {
    float: right;
    height: 100%;
    padding: 16px;
    border: 1px solid #EDEFF1;
    border-radius: 12px;
    box-shadow: 0px 6px 10px rgba(235, 239, 255, 0.15);
    .ant-btn {
      display: block;
      width: 240px;
      height: 40px;
      border-radius: 6px;
      &:first-child {
        color: #ffffff;
        background-color: #4850FF;
        margin-bottom: 16px;
      }
      &:last-child {
        border: 1px solid #EDEFF1
      }
    }
  }
}

</style>
