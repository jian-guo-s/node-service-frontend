<template>
  <div>
    <section 
      class="section-service" 
      data-blockAnimation

    >
      <div class="service-content">
        <div 
          class="service-title"
        >
          热门专业服务
        </div>
        <ul 
          class="service-list"
        >
          <li 
            class="item server-item"
          >
            <div class="image">
              <img 
                src="../images/icon_backstage.png" 
                alt=""
              >
            </div>
            <span class="name">
              后端开发
            </span>
            <span class="descire">
              Java 、PHP、Spring Boot、Docker
            </span>
          </li>
          <li 
            class="item server-item" 
            blockAnimation="item"
          >
            <div class="image">
              <img 
                src="../images/icon_computer.png" 
                alt=""
              >
            </div>
            <sapn class="name">
              前端开发
            </sapn>
            <span 
              class="descire"
            >
              Vue 、Angular、React、小程序
            </span>
          </li>
          <li 
            class="item server-item" 
            blockAnimation="item"
          >
            <div class="image">
              <img 
                src="../images/icon_code.png" 
                alt=""
              >
            </div>
            <span class="name">
              移动开发
            </span>
            <span class="descire">
              IOS、Android、Kotlin
            </span>
          </li>
          <li 
            class="item server-item" 
            blockAnimation="item"
          >
            <div class="image">
              <img 
                src="../images/icon_test.png" 
                alt=""
              >
            </div>
            <span class="name">
              测试
            </span>
            <span class="descire">
              功能测试、性能测试、自动化测试
            </span>
          </li>
        </ul>
      </div>
    </section>    
  </div>
</template>

<script>
export default ({
  setup() {
    const animation = (gsap, ScrollTrigger) => {
      const blockAnimation = gsap.timeline()
      blockAnimation.set('.server-item', {
        y: 400,
        opacity: 0,
      })
      blockAnimation.to('.server-item',{
        stagger: 0.5,
        y: 0,
        duration: 2,
        opacity:1
      });

      ScrollTrigger.create({
          animation: blockAnimation,
          trigger: '[data-blockAnimation]',
          start: 'top center',
          end: '+=200px',
          // markers: true,
          scrub: 1.5,
      })

    }
    return { animation }
  },
})
</script>


<style scoped lang="scss">
  .section-service {
    background-color: #fff;
    margin: 0 auto;
    .service-content {
      margin: 0 auto;
      width: 100%;
      width: 121.6rem;
      height: 62rem;
      .service-title {
        padding: 9.6rem 0 12.8rem;
        font-weight: 600;
        font-size: 4.8rem;
        text-align: center;
      }
      .service-list {
        display: flex;
        justify-content: space-between;
        .item {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 28.5rem;
          padding: 3.2rem 0;
          background-color: #fff0f0;
          border-radius: 1.6rem;
          .image {
            width: 7.2rem;
            img {
              width: 100%;
            }
          }
          .name {
            font-weight: 600;
            font-size: 2rem;
            line-height: 2.8rem;
            padding: 0.8rem;
          }
          .describe {
            font-weight: 400;
            font-size: 1.3rem;
            line-height: 1.8rem;
          }
        }
        .item:nth-of-type(2) {
          background-color: #fffcf0;
        }
        .item:nth-of-type(3) {
          background-color: #fef0ff;
        }
        .item:nth-of-type(4) {
          background-color: #f0f3ff;
        }
      }
    }
  }
</style>
