<template> 
  <div class="skills">
    <div class="skills-title">
      <img src="@/assets/images/skills.png" />
      <span class="title-text">IT技能图谱</span>
    </div>
    <div class="skills-info"></div>
    

  </div>
</template>
<script>
export default {
  setup() {
    
  },
}
</script>
<style lang="scss" scoped>
.skills {
  .skills-title {
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
}

</style>