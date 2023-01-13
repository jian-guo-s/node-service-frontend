<template> 
  <div class="education">
    <div class="education-title">
      <img src="@/assets/images/education.png" />
      <span class="title-text">教育经历</span>
    </div>
    <div class="education-list">
      <div class="educaton-list-item" >
        <img src="@/assets/images/education-school.png" />
        <div class="educaton-list-item-info">
          <div class="school-name">上海师范大学</div>
          <div class="educaton-list-item-text">本科｜全日制｜计算机科学与技术</div>
        </div>
        <div class="educaton-list-item-time">2014.07 - 2017.09</div>
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
.education {
  width: 100%;
  max-width: 848px;
  padding-bottom: 32px;
  margin-bottom: 32px;
  border-bottom: 1px solid #F6F8FC;
  .education-title {
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
  .education-list {
    background-color: #F9F9FD;
    padding: 32px;
    border-radius: 12px;
    .educaton-list-item {
      img {
        width: 50px;
        height: 50px;
        margin-right: 12px;
      }
      img, .educaton-list-item-info {
        display: inline-block;
        vertical-align: middle;
      }

      .educaton-list-item-info {
        .school-name {
          font-size: 15px;
          font-weight: 600;
          color:#202839;
        }
        .educaton-list-item-text {
          font-size: 13px;
          color: #444E64;
        }
      }


      .educaton-list-item-time {
        font-size: 13px;
        color: #7E89A3;
        float: right;
      }


    }
  }

}

</style>