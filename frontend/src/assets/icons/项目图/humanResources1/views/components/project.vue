<template> 
  <div class="project">
    <div class="project-title">
      <img src="@/assets/images/project.png" />
      <span class="title-text">项目经历</span>
    </div>
    <div class="project-list">
      <div class="project-list-item" v-for="item in 2" :key="item">
        <div class="project-list-item-title">
          <span class="title">天天数链哈哈{{item}}</span>
          <span>2021.09 - 至今</span>
        </div>
        <div class="project-list-item-position">后端开发工程师 | 全职 </div>
        <div>湖北武汉天天数链有限公司｜IT互联网行业 </div>
        <div class="project-list-item-tag">
          <a-tag color="#F3F5FB" v-for="item in 5" :key="item">JAVA</a-tag>
        </div>
        <div class="project-list-item-desc">新开发是用于解决远程分布式协作问题的一站式云开发协作平台，功能涵盖了协作任务、持续集成、代码托管、制品仓库，基于微服务、Devops、容器云等云原生关键技术、在云端串联起应用研发过程中的各个环节，实现让团队、企业远程高效完成工作，在市场竞争中赢得先机。</div>
      </div>
    </div>
    
  </div>
</template>
<script>
export default {
  setup() {
    
  },
}
</script>
<style lang="scss" scoped>
.ant-tag {
  color: #58637B;
}
.project {
  font-size: 13px;
  color: #444E64;
  width: 100%;
  max-width: 848px;
  .project-title {
    margin-bottom: 24px;
    img {
      widows: 24px;
      height: 24px;
      vertical-align: middle;
      margin-right: 8px;
    }
    .title-text {
      font-size: 20px;
      font-weight: 600;
      color: #202839;
      vertical-align: middle;
    }
  }
  .project-list {
    .project-list-item {
      margin-bottom: 32px;
      .project-list-item-title {
        display: flex;
        justify-content: space-between;
        .title {
          font-size: 15px;
          font-weight: 600;
          color: #202839;

        }
      }
      .project-list-item-position {
        margin: 4px 0 8px;
      }
      .project-list-item-tag {
        margin: 8px 0 16px;
      }
      .project-list-item-desc {
        font-size: 12px;
        color: #ADB6CA;
      }
    }
  }
  
}

</style>