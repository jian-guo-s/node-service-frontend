<template>
  <div>
    <section 
      class="section-step"
      data-circleAnimation
    >
      <div 
        class="step-content" 
      >
        <div 
          class="step-title" 
        >
          需要做点什么吗
        </div>
        <div class="step-main">
          <ul 
            class="list" 
          >
            <li 
              class="item"
              circleAnimation="item"
            >
              <div class="text-box">
                <div class="image">
                  <img 
                    src="../images/icon_document.png" 
                    alt=""
                  >
                </div>
                <sapn class="title">
                  入驻申请
                </sapn>
                <span class="describe">
                  登录企业端或者联系顾问，审核：企业名称、营业执照
                </span>
              </div>
            </li>
            <li 
              class="item" 
              circleAnimation="item"
            >
              <div class="text-box">
                <div class="image">
                  <img 
                    src="../images/icon_send.png" 
                    alt="img"
                  >
                </div>
                <sapn class="title">
                  发布需求
                </sapn>
                <span class="describe">
                  四要素精准匹配：
                </span>
                <span class="describe">
                  技能等级、工作年限、行业经验、技术栈
                </span>
              </div>
            </li>
            <li 
              class="item" 
              circleAnimation="item"
            >
              <div class="text-box">
                <div class="image">
                  <img 
                    src="../images/icon_group.png" 
                    alt=""
                  >
                </div>
                <sapn class="title">
                  项目面试
                </sapn>
                <span class="describe">
                  质量三层把关，再交由企业面试，大大提升匹配率
                </span>
              </div>
            </li>
            <li 
              class="item" 
              circleAnimation="item"
            >
              <div class="text-box">
                <div class="image">
                  <img 
                    src="../images/icon_design.png" 
                    alt=""
                  >
                </div>
                <sapn class="title">
                  签约开发者
                </sapn>
                <span class="describe">
                  签约保障，安全放心
                </span>
              </div>
            </li>
            <li 
              class="item" 
              circleAnimation="item"
            >
              <div class="text-box">
                <div class="image">
                  <img 
                    src="../images/icon_promotion.png" 
                    alt=""
                  >
                </div>
                <sapn class="title">
                  验收结算
                </sapn>
                <span class="describe">
                  进度与质量周日级别同步，次月月初结算上月费用
                </span>
              </div>
            </li>
          </ul>
        </div>
        <div 
          class="step-line" 
          data-lineAnimation
        >
          <img 
            src="../images/img_line.png" 
            alt="line"
          >
        </div>
      </div>
    </section> 
  </div>
</template>

<script>
export default ({
  setup() {
    const animation = (gsap, ScrollTrigger) => {
      const circleAnimation = gsap.timeline()
      circleAnimation.set('[circleAnimation="item"]', {
        y: 400,
        opacity: 0,
      })
      circleAnimation.set('[data-lineAnimation]', {
        opacity: 0,
      })
      circleAnimation.to('[circleAnimation="item"]', {
        stagger: 0.5,
        y: 0,
        opacity: 1,
        duration: 3
      });
      circleAnimation.to('[data-lineAnimation]', {
        opacity: 1,
        duration: 1
      });  

      ScrollTrigger.create({
        animation: circleAnimation,
        trigger: '[data-circleAnimation]',
        start: 'top center',
        end: '+=200px',
        // markers: true,
        scrub: 3,
      })

    }
    return { animation }
  },
})
</script>

<style scoped lang="scss">
  .section-step {
    background-color: #fff;
    margin: 0 auto;
    max-width: 192rem;
    min-width: 121.6rem;
    .step-content {
      position: relative;
      margin: 0 auto;
      width: 121.6rem;
      height: 78.4rem;
      background: url('../images/bg_circle.png') no-repeat bottom center;
      background-size: 99.7rem 22.3rem;
      .step-title {
        padding: 9.6rem 0 9rem;
        font-weight: 600;
        font-size: 4.8rem;
        text-align: center;
      }
      .step-main {
        position: relative;
        z-index: 2;
        .list {
          display: flex;
          justify-content: space-between;
          height: 36rem;
          .item {
            position: relative;
            width: 22.4rem;
            height: 27rem;
            background: url('../images/img_circle_01.png') no-repeat;
            background-size: 100%;
            .text-box {
              box-sizing: border-box;
              position: absolute;
              bottom: 0;
              display: flex;
              padding: 0 2rem;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              width: 22.4rem;
              height: 22.4rem;
              .image {
                width: 3.2rem;
                height: 3.2rem;
                padding-bottom: 1rem;
                img {
                  width: 100%;
                }
              }
              .title {
                line-height: 2.8rem;
                font-weight: 600;
                font-size: 2rem;
                padding-bottom: 0.8rem;
              }
              .describe {
                text-align: center;
                line-height: 18px;
                font-weight: 400;
                font-size: 13px;
                color: #7e89a3;
              }
            }
          }
          .item:nth-of-type(2) {
            align-self: flex-end;
            background-image: url('../images/img_circle_02.png');
          }
          .item:nth-of-type(3) {
            background-image: url('../images/img_circle_03.png');
          }
          .item:nth-of-type(4) {
            align-self: flex-end;
            background-image: url('../images/img_circle_04.png');
          }
          .item:nth-of-type(5) {
            background-image: url('../images/img_circle_05.png');
          }
        }
      }
      .step-line {
        position: absolute;
        top: 40rem;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 78.6rem;
        height: 15.6rem;
        z-index: 1;
        img {
          width: 100%;
        }
      }
    }
  }
</style>
