<script setup lang="ts">
import { useOnboard } from '@web3-onboard/vue'
import Onboard, { type WalletState } from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'

const { connectedWallet, connectWallet, disconnectWallet } = useOnboard()
const injected = injectedModule()
let walletStates: WalletState[]

const onboard = Onboard({
  wallets: [injected],
  chains: [
    {
      id: '0x1',
      token: 'Hamster Moonbeam',
      label: 'Hamster Moonbeam',
      rpcUrl: `https://rpc.moonbeam.hamster-test.newtouch.com`,
    },
  ],
  notify: {
    desktop: {
      enabled: true,
      transactionHandler: transaction => {
        console.log({ transaction })
        if (transaction.eventCode === 'txPool') {
          return {
            type: 'success',
            message: 'Your transaction from #1 DApp is in the mempool',
          }
        }
      },
      position: 'bottomLeft'
    },
    mobile: {
      enabled: true,
      transactionHandler: transaction => {
        console.log({ transaction })
        if (transaction.eventCode === 'txPool') {
          return {
            type: 'success',
            message: 'Your transaction from #1 DApp is in the mempool',
          }
        }
      },
      position: 'topRight'
    }
  },
  accountCenter: {
    desktop: {
      position: 'bottomRight',
      enabled: true,
      minimal: true
    },
    mobile: {
      position: 'topRight',
      enabled: true,
      minimal: true
    }
  },
})

// 尝试自动连接钱包，如果连不上，返回 null
async function autoConnectSavedWallet(): Promise<WalletState[] | null> {
  const connectedWallets = window.localStorage.getItem('alreadyConnectedWallets')
  // 如果 local storage 里没有保存的钱包，直接返回
  if (connectedWallets == null || connectedWallets === '[]') {
    return null
  }
  // 否则，自动连接第一个钱包
  const previouslyConnectedWallets = JSON.parse(
    connectedWallets
  )
  if (previouslyConnectedWallets) {
    onboard.connectWallet({ autoSelect: previouslyConnectedWallets[0] })
    const walletStates = await onboard.connectWallet({
      autoSelect: { label: previouslyConnectedWallets[0], disableModals: true }
    })
    return walletStates
  } else {
    return null
  }
}

// 进入页面即要求连接钱包
const walletStatesOrNull = await autoConnectSavedWallet()
if (walletStatesOrNull == null) {
  walletStates = await onboard.connectWallet()
} else {
  walletStates = walletStatesOrNull
}

const onClickConnect = () => {
  const { provider, label } = connectedWallet.value || {}
  if (provider && label) {
    disconnectWallet({ label })
  } else {
    connectWallet()
  }
}

// 实现获取用户钱包地址的方法，把此方法暴露出去，方便外面调用
const getAccountAddress = (): string => {
  const { accounts } = walletStates[0]
  return accounts[0].address
}

//暴露子组件的方法或者数据
defineExpose({ onClickConnect })
</script>

<style>
onboard-v2 .container {
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
