<template>
  <div>
    <section 
      class="section-advantage" 
      data-listAnimation
    >
      <div class="advantage-content">
        <div 
          class="advantage-title"
        >
          触手可及全世界专业开发者
        </div>
        <div class="advantage-main">
          <ul 
            class="list" 
          >
            <li 
              class="item" 
              listAnimation="item"
            >
              <div class="icon">
                <img 
                  src="../images/icon_messages.png" 
                  alt=""
                >
              </div>
              <div class="text">
                <div class="title">
                  远程协作，灵活解决开发人力紧缺问题
                </div>
                <div class="descrice">
                  团队灵活组建，按需用工，最快3天到岗处理您的项目
                </div>
              </div>
            </li>
            <li 
              class="item" 
              listAnimation="item"
            >
              <div class="icon">
                <img 
                  src="../images/icon_files.png" 
                  alt=""
                >
              </div>
              <div class="text">
                <div class="title">
                  灵活用工模式能够节省用工成本多达50%
                </div>
                <div class="descrice">
                  每个价位找到高质量的服务，无需考虑社保费用、场地费用，只有基于项目的定价
                </div>
              </div>
            </li>
            <li 
              class="item" 
              listAnimation="item"
            >
              <div class="icon">
                <img 
                  src="../images/icon_badge.png" 
                  alt=""
                >
              </div>
              <div class="text">
                <div class="title">
                  全程专业服务保障
                </div>
                <div class="descrice">
                  项目按天管理、代码安全保障、用工灵活调换、专属顾问全程跟进，用工无后顾之忧
                </div>
              </div>
            </li>
          </ul>
          <div 
            class="image" 
            data-imageAnimation="image"
          >
            <img 
              src="../images/img_imac.png" 
              alt="img"
            >
          </div>
        </div>
      </div>
    </section>   
  </div>
</template>

<script>
export default ({
  setup() {
    const animation = (gsap, ScrollTrigger) => {
     const listAnimation = gsap.timeline()
      listAnimation.set('[listAnimation="item"]', {
        y: 300,
        opacity: 0,
      })
      listAnimation.set('[data-imageAnimation]', {
        y: 200,
        opacity: 0,
      })
      listAnimation.to('[listAnimation="item"]', {
        stagger: 1,
        y: 0,
        duration: 3,
        opacity: 1,
      });

      listAnimation.to('[data-imageAnimation]',{
        y: 0,
        opacity: 1,
        duration: 3
      }, 1); 

      ScrollTrigger.create({
        animation: listAnimation,
        trigger: '[data-listAnimation]',
        start: 'top center',
        end: '+=200',
        // markers: true,
        scrub: 2,
      })
    }
    return { animation }
  },
})
</script>


<style scoped lang="scss">
  .section-advantage {
    background-color: #f4f7ff;
    margin: 0 auto;
    .advantage-content {
      margin: 0 auto;
      width: 121.6rem;
      height: 80.9rem;
      .advantage-title {
        padding: 9.6rem 0 12.8rem;
        font-weight: 600;
        font-size: 4.8rem;
        text-align: center;
      }
      .advantage-main {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .list {
          .item {
            display: flex;
            padding-bottom: 4.8rem;
            .icon {
              width: 5.8rem;
              height: 5.8rem;
              img {
                width: 100%;
              }
              margin-right: 1.2rem;
            }
            .text {
              .title {
                line-height: 2.8rem;
                padding-bottom: 1.2rem;
                font-weight: 600;
                font-size: 2rem;
                color: #202839;
              }
              .descrice {
                line-height: 1.8rem;
                font-weight: 400;
                font-size: 1.3rem;
                color: #7e89a3;
              }
            }
          }
          .item:nth-last-child(1) {
            padding-bottom: 0;
          }
        }
        .image {
          width: 60.1rem;
          height: 40.6rem;
          img {
            width: 100%;
          }
        }
      }
    }
  }
</style>
