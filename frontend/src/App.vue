<template>
  <div id="app">
    <a-config-provider>
      <component :is="layout">
        <router-view />
      </component>
    </a-config-provider>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterView, useRoute } from "vue-router";
import { init } from '@web3-onboard/vue'
import injectedModule from '@web3-onboard/injected-wallets'

const routes = useRoute();
const layout = computed(() => {
  return "layout-" + (routes.meta.layout || "default").toLowerCase();
});

const injected = injectedModule()
const infuraKey = '<INFURA_KEY>'
const rpcUrl = `https://rpc.moonbeam.hamster-test.newtouch.com/${infuraKey}`

init({
  wallets: [injected],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl
    }
  ]
})
</script>

<!-- <template>
  <RouterView />
</template> -->
