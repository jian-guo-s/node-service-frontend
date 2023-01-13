<template>
  <div>
    <section 
      class="section-banner"
      data-titleAnimation
    >
      <div 
        class="banner-content" 
      >
        <div 
          class="banner-title"
        >
          <div class="text">
            <div 
              class="title" 
              titleAnimation="item"
            >
              做懂你的IT人力共享平台
            </div>
            <div 
              class="describe" 
              titleAnimation="item"
            >
              专业人才｜远程协作｜灵活用工
            </div>
          </div>
          <div 
            class="button" 
            titleAnimation="item"
            @click="jumpDeveloperPage"
          >
            寻找开发者
          </div>
        </div>
        <section 
          class="bg-effect" 
          data-intro-phone
        >
          <img
            alt="icon" 
            data-intro-seq="1"
            src="../images/effect.gif" 
            style="z-index:11;"
            class="img1"
          >
          <!-- <img
            alt="icon" 
            data-intro-seq="1"
            src="../images/sequence_01.png" 
            style="z-index:11;"
            class="img1"
          >
          <img
            alt="icon" 
            data-intro-seq="2"
            src="../images/sequence_02.png" 
            style="z-index:10;"
            class="img2"
          >
          <img
            alt="icon" 
            data-intro-seq="3"
            src="../images/sequence_03.png" 
            style="z-index:9;"
            class="img3"
          >
          <img
            alt="icon" 
            data-intro-seq="4"
            src="../images/sequence_04.png" 
            style="z-index:8;"
            class="img4"
          >
          <img
            alt="icon" 
            data-intro-seq="5"
            src="../images/sequence_05.png" 
            style="z-index:7;"
            class="img5"
          >
          <img
            alt="icon" 
            data-intro-seq="6"
            src="../images/sequence_06.png" 
            style="z-index:6;"
            class="img6"
          >
          <img
            alt="icon" 
            data-intro-seq="7"
            src="../images/sequence_07.png" 
            style="z-index:5;"
            class="img7"
          >
          <img
            alt="icon" 
            data-intro-seq="8"
            src="../images/sequence_08.png" 
            style="z-index:4;"
            class="img8"
          >
          <img
            alt="icon" 
            data-intro-seq="9"
            src="../images/sequence_09.png" 
            style="z-index:3;"
            class="img9"
          >
          <img
            alt="icon" 
            data-intro-seq="10"
            src="../images/sequence_10.png" 
            style="z-index:2;"
            class="img10"
          >
          <img
            alt="icon" 
            data-intro-seq="11"
            src="../images/sequence_11.png" 
            style="z-index:1;"
            class="img11"
          >
          <img
            :style="{opacity: '1'}"
            alt="icon"
            src="../images/sequence_11.png" 
            style="z-index:0"
          > -->
        </section>
      </div>
    </section>
  </div>
</template>

<script>
export default ({
  setup() {
    const jumpDeveloperPage = () => {
      if (process.env.VUE_APP_MODE === 'production') {
          window.open(`https://talent-business.tntlinking.com`, '_blank')
      } else { 
          window.open(`https://talent-business.stage-ttchain.tntlinking.com`, '_blank')
      } 
    }
    const animation = (gsap, ScrollTrigger) => {
      const titleAnimation = gsap.timeline()
      titleAnimation.set('[titleAnimation="item"]', {
        y: 0,
        opacity: 1,
      })
      titleAnimation.to('[titleAnimation="item"]',{
        stagger: 0.3,
        y: -400,
        opacity: 0,
        duration: 2
      });

      ScrollTrigger.create({
          animation: titleAnimation,
          trigger: '[data-titleAnimation]',
          start: '360px 100px',
          end: '+=260px',
          // markers: true,
          scrub: 1,
      })


      // const effectDuration = 0.5;
      // effect = gsap.timeline({
      //   repeat: -1,
      //   yoyo: true,
      // });

      // effect.to('.img1', { opacity: 0,duration: 0 })
      // effect.from('.img2', { opacity: 1, duration:effectDuration, ease: 'power5' })
      // effect.to('.img2', { opacity: 0, duration:0 })
      // effect.from('.img3', { opacity: 1, duration:effectDuration, ease: 'power5' })
      // effect.to('.img3', { opacity: 0, duration:0 })
      // effect.from('.img4', { opacity: 1, duration:effectDuration, ease: 'power5' })
      // effect.to('.img4', { opacity: 0, duration:0 })
      // effect.from('.img5', { opacity: 1, duration:effectDuration, ease: 'power5' })
      // effect.to('.img5', { opacity: 0, duration:0 })
      // effect.from('.img6', { opacity: 1, duration:effectDuration, ease: 'power5' })
      // effect.to('.img6', { opacity: 0, duration:0 })
      // effect.from('.img7', { opacity: 1, duration:effectDuration, ease: 'power5' })
      // effect.to('.img7', { opacity: 0, duration:0 })
      // effect.from('.img8', { opacity: 1, duration:effectDuration, ease: 'power5' })
      // effect.to('.img8', { opacity: 0, duration:0 })
      // effect.from('.img9', { opacity: 1, duration:effectDuration, ease: 'power5' })
      // effect.to('.img9', { opacity: 0, duration:0 })
      // effect.from('.img10', { opacity: 1, duration:effectDuration, ease: 'power5' })
      // effect.to('.img10', { opacity: 0, duration:0 })
      // effect.from('.img11', { opacity: 1, duration:effectDuration * 2, ease: 'power5' })
      // effect.to('.img11', { opacity: 0, duration:0 })
    }
    return { animation, jumpDeveloperPage }
  },
})
</script>


<style scoped lang="scss">
  .section-banner {
    width: 100%;
    overflow: hidden;
    background: #0d142d url('../images/bg_banner.jpg') no-repeat center;
    background-size: 192rem 70rem;
    .banner-content {
      position: relative;
      width: 121.6rem;
      margin: 0 auto;
      height: 70rem;
      color: #fff;
      .banner-title {
        padding-top: 18.4rem;
        width: 51.5rem;
        .text {
          padding-bottom: 3.2rem;
          .title {
            line-height: 10.1rem;
            font-weight: 600;
            font-size: 7.2rem;
          }
          .describe {
            font-weight: 400;
            font-size: 2rem;
            line-height: 2.8rem;
          }
        }

        .button {
          width: 17.1rem;
          height: 5.3rem;
          line-height: 5.3rem;
          text-align: center;
          background: #4850ff;
          border-radius: 5.7rem;
          cursor:pointer;
        }
      }
      .bg-effect {
        position: absolute;
        top: 14.9rem;
        right: 0;
        width: 61rem;
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
        }
      }
    }
  }
</style>
