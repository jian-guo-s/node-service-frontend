<template>
  <div class="homepage">
    <div class="title">专业的远程开发者将为您的企业提供全职服务</div>
    <div class="search-box">
      <div class="search-item">
        <span :class="[actived == item.id? 'actived':'']" @click="changeSelected(item.id)" v-for="item in positionList" :key="item.id">{{item.name}}</span>
      </div>
    </div>
    <div class="list-box">
      <a-row :gutter="{xs: 0, sm: 8, md: 12, lg: 18}">
        <a-col v-for="item in 8" :key="item">
          <div class="list-item" @click="goDetail(item)">
            <img src="../../../assets/images/people.jpg" />
            <div class="item-info">
              <div class="item-name">
                <span class="name">{{'张三'}}</span>
                <span class="money">{{'13k/月'}}</span>
              </div>
              <div class="item-position">
                <span>{{'后端开发工程师 | '}}</span>
                <span>{{'武汉'}}</span>
              </div>
              <div class="item-skills">
                <!-- <span class="skill-item" v-for="it in 5" :key="it">{{'JAVA'}}</span> -->
                <a-tag color="#F4F7FF" v-for="it in 5" :key="it">{{'JAVA'}}</a-tag>
              </div>
            </div>
            
          </div>
        </a-col>
      </a-row>
    </div>

    <div class="consult-title">想了解更多开发者 可咨询<span style="color: #4850FF">人才顾问</span></div>
  </div>
</template>
<script>
import {reactive, ref, toRefs} from 'vue'
import { useRouter } from 'vue-router'

export default{
  name: 'homepage',
  setup() {
    const router = useRouter()
    const positionList = ref([{name: '全部', id: 1},{name: '后端开发', id: 2,},{name: '前端开发', id: 3}, {name: '移动开发', id: 4},{name:'测试', id: 5}])
    const peopleList = ref([{name:'张三',skills:['Java'], money: '13', position: '后端开发',city: '上海'}])
    const state = reactive({
      actived: 1,
    })

    const changeSelected = (id) => {
      state.actived = id
      console.log(id, state.actived)
    }

    const goDetail = (id) => {
      router.push({name: 'talentDeatil',params: {id: id}})
    }

    return {
      ...toRefs(state),
      positionList,
      peopleList,
      changeSelected,
      goDetail,
    }

    
  },
}
</script>
<style lang="scss" scoped>
.ant-tag {
  color: #58637B;
}
.homepage {
  width: 100%;
  max-width: 1222px;
  margin: 0 auto;
  color: #58637B;
  font-size: 14px;
  background-color: #fff;
  padding-top: 60px;
  .title {
    font-size: 48px;
    color: #000000;
  }
  .search-box {
    font-size: 16px;
    // color: #58637B;
    margin-bottom: 32px;
    .search-item {
      margin-top: 64px;
      span {
        margin-right: 64px;
        // color: #58637B;
        cursor: pointer;
      }
      .actived {
        color: #4850FF;
        position: relative;
        &::before {
          content:'';
          width: 38px;
          position: absolute;
          top: 30px;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 2px;
          border-bottom: 3px solid #4850FF;

        }
      }
    }
  }
  .list-box {
    .list-item {
      margin-bottom: 32px;
      cursor: pointer;
      border-radius: 16px;
    }

    img {
      width: 220px;
      max-width: 100%;
      border-radius: 16px 16px 0 0;

    }
     .item-info {
      padding: 32px 12px 12px;
      border: 1px solid #EDEFF1;
      border-radius:0 0 16px 16px;
     }
    .item-name {
      display: flex;
      justify-content: space-between;
      font-size: 24px;
      font-weight: 700;
      .name {
        color: #000000;
      }
      .money {
        color: #FF3306;
      }

    }
    .item-position {
       margin: 12px 0;
    }
    
  }
  .consult-title {
    text-align: center;
    font-size: 16px;
    margin: 32px 0 64px;
  }

}

</style>
