<template>
  <main class="main">
    <HanderBanner ref="handerRef" />
    <BodyServer ref="serverRef" />
    <BodyAdvantage ref="advantageRef" />
    <BodyStep ref="stepRef" />
  </main>
</template>

<script>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { defineComponent, onMounted, onBeforeUnmount, ref} from 'vue';
import HanderBanner from './components/HanderBanner.vue'
import BodyServer from './components/BodyServer.vue'
import BodyAdvantage from './components/BodyAdvantage.vue'
import BodyStep from './components/BodyStep.vue'

export default defineComponent({
  components: {
    HanderBanner,
    BodyServer,
    BodyAdvantage,
    BodyStep
  },
  setup() {
    const handerRef = ref()
    const serverRef = ref()
    const advantageRef = ref()
    const stepRef = ref()

    onMounted(()=>{
      gsap.registerPlugin(ScrollTrigger);  
      ScrollTrigger.getAll().forEach(item => {
        item.refresh()
        item.scroll(0)
      })
      // ScrollTrigger.refresh()
      handerRef.value.animation(gsap, ScrollTrigger)
      serverRef.value.animation(gsap, ScrollTrigger)
      advantageRef.value.animation(gsap, ScrollTrigger)
      stepRef.value.animation(gsap, ScrollTrigger)
    })

    onBeforeUnmount(() => {})
    return { 
      handerRef,
      serverRef,
      advantageRef,
      stepRef
    };
  },
});
</script>

<style scoped lang="scss">
.main {
  overflow: hidden;
}
</style>