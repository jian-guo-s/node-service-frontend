<!-- <template>
  <main>
    <button @click="onClickConnect">
      {{
        connectingWallet
          ? 'Connecting...'
          : connectedWallet
          ? 'Disconnect'
          : 'Connect'
      }}
    </button>
  </main>
</template> -->
<script setup>
import { useOnboard } from '@web3-onboard/vue'

import { ethers } from 'ethers'

const { connectedWallet, connectingWallet, connectWallet, disconnectWallet } = useOnboard()

if (connectedWallet?.provider) {
  const ethersProvider = new ethers.providers.Web3Provider(
    connectedWallet.provider,
    'any'
  )
  console.log(ethersProvider)
}

const onClickConnect = () => {
  const { provider, label } = connectedWallet.value || {}
  if (provider && label) {
    disconnectWallet({ label })
  } else {
    connectWallet()
  }
}
//暴露子组件的方法或者数据
defineExpose({onClickConnect})
</script>

