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
import Onboard from '@web3-onboard/core'
import { ethers } from 'ethers'

const {  alreadyConnectedWallets, connectedWallet, connectingWallet, connectWallet, disconnectWallet } = useOnboard()

if (connectedWallet?.provider) {
  const ethersProvider = new ethers.providers.Web3Provider(
    connectedWallet.provider,
    'any'
  )
}

// const walletsSub = onboard.state.select('wallets')
// const { unsubscribe } = walletsSub.subscribe(wallets => {
//   const connectedWallets = wallets.map(({ label }) => label)
//   window.localStorage.setItem(
//     'connectedWallets',
//     JSON.stringify(connectedWallets)
//   )
// })

// const previouslyConnectedWallets = JSON.parse(
//   window.localStorage.getItem('connectedWallets')
// )

// if (previouslyConnectedWallets) {
//   // Connect the most recently connected wallet (first in the array)
//   await onboard.connectWallet({ autoSelect: previouslyConnectedWallets[0] })

//   // You can also auto connect "silently" and disable all onboard modals to avoid them flashing on page load
//   await onboard.connectWallet({
//     autoSelect: { label: previouslyConnectedWallets[0], disableModals: true }
//   })
// }

const onClickConnect =  () => {
  const { provider, label } = connectedWallet.value || {}
  if (provider && label) {
    disconnectWallet({ label })
  } else {
    connectWallet()
  }
}
//暴露子组件的方法或者数据
defineExpose({ onClickConnect })
</script>

<style>
onboard-v2 .container{
  z-index: 1;
  position: fixed;
}
/* <!-- main {
  display: flex;
  align-items: center;
  justify-content: center;
}

button {
  border: none;
  border-radius: 6px;
  background: hsla(160, 100%, 37%, 1);
  color: white;
  padding: 14px 12px;
  margin-top: 40px;
  font-family: inherit;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
}--> */
</style> 
