<template>
  <div
    class="contractList dark:text-white text-[#121211] grid grid-cols-3 gap-4 border border-solid dark:border-[#434343] border-[#EBEBEB] rounded-[12px]">
    <div class="contractList-left p-[32px]">
      <div class="mb-[64px]">
        <div class="mb-[16px]">
          <img src="@/assets/icons/send-white.svg" class="mr-[8px] hidden dark:inline-block" />
          <img src="@/assets/icons/send-block.svg" class="mr-[8px] dark:hidden" />
          <span class="font-bold align-middle">Send</span>
        </div>
        <div>
          <div
            class="contractList-title dark:text-[#E0DBD2] text-[#73706E] h-[51px] leading-[51px] rounded-[12px] pl-[30px] cursor-pointer"
            :class="checkValue === val.name ? 'checked' : ''" v-for="val in sendAbis" :key="val.name"
            @click="checkContract(val.name, val)">
            {{ val.name }}</div>
        </div>
      </div>
      <div class="mb-[16px]">
        <img src="@/assets/icons/send-white.svg" class="mr-[8px] hidden dark:inline-block" />
        <img src="@/assets/icons/send-block.svg" class="mr-[8px] dark:hidden" />
        <span class="font-bold align-middle">Call</span>
      </div>
      <div>
        <div
          class="contractList-title dark:text-[#E0DBD2] text-[#73706E] h-[51px] leading-[51px] rounded-[12px] pl-[30px] cursor-pointer"
          :class="checkValue === val.name ? 'checked' : ''" v-for="val in callAbis" :key="val.name"
          @click="checkContract(val.name, val)">
          {{ val.name }}</div>
      </div>

    </div>
    <div class="col-span-2 p-[32px]">
      <div class="flex justify-between mb-[32px]">
        <span class="text-[16px] font-blod leading-[43px]">{{ checkValue }}</span>
        <a-button class="btn" @click="deployBtn">Deploy</a-button>
      </div>
      <div>
        <ContractForm :inputs="inputs" :outputs="outputs"></ContractForm>
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { ref, reactive, onMounted, toRefs } from "vue";
import YAML from "yaml";
import * as ethers from "ethers";
import ContractForm from "./ContractForm.vue";

const props = defineProps({
  abiInfo: String,
})

const { abiInfo } = toRefs(props)
const inputs = reactive([]);
const outputs = reactive([])

// const abiInfoData = YAML.parse(abiInfo.value)
const abiInfoData = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "version",
        "type": "uint8"
      }
    ],
    "name": "Initialized",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_allocationProportion",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_graphStakingAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_grtTokenAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_thawingTime",
        "type": "uint256"
      }
    ],
    "name": "setConfigInfo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getGraphStakingAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getGrtTokenAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getAllocationProportion",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getThawingTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_allocationProportion",
        "type": "uint256"
      }
    ],
    "name": "setAllocationProportion",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_thawingTime",
        "type": "uint256"
      }
    ],
    "name": "setThawingTime",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

console.log(abiInfoData, '0000')

// abiInfoData = abiInfoData.map()
const sendAbis = reactive([])
const callAbis = reactive([])
const checkValue = ref('');


abiInfoData.map(item => {
  if (item.constant) {
    sendAbis.push(item)
  } else {
    callAbis.push(item)
  }
  checkValue.value = sendAbis[0]?.name
})

const deployBtn = () => {
  const value = ethers.utils.parseEther("5");
  console.log(value)
}

// console.log(abis, 'abis')
const initData = () => {
  // abis.map((item: any) => {
  //   if (item.name === 'multiply' || item.name === 'get') {
  //     sendAbis.push(item)
  //   } else {
  //     callAbis.push(item)
  //   }
  // })
}

const checkContract = (name: string, val: any) => {
  checkValue.value = name
  Object.assign(inputs, val.inputs)
  Object.assign(outputs, val.outputs)
}

onMounted(() => {
  initData()
})

</script>
<style lang='less' scoped>
@baseColor: #E2B578;

.contractList {
  font-size: 14px;

  .contractList-left {
    border-right: 1px solid #EBEBEB;
  }
}

.btn {
  width: 131px;
  height: 43px;
}

html[data-theme='dark'] {
  .checked {
    background-color: #36322D;
  }

  .contractList-left {
    border-right: 1px solid #434343;
  }
}

.checked {
  background-color: #F9F9F9;
}
</style>