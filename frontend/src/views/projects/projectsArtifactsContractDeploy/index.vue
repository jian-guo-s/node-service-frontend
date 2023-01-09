<template>
  <Breadcrumb :currentName="'Contract Deploy'">
    <template v-slot:tags>
      <span
        class="dark:text-white text-[#151210] text-[14px] px-[16px] py-[6px] ml-[16px] border border-solid border-[#EBEBEB] rounded-[32px]">Contract</span>
    </template>
  </Breadcrumb>
  <div
    class="artifactsDeploy dark:bg-[#1D1C1A] bg-[#FFFFFF] dark:text-white text-[#121211] grid grid-cols-5 gap-4 p-[32px] rounded-[12px] mt-[24px]">
    <a-form class="dark:text-white text-[#121211] col-span-3" ref="formRef" :model="formState" name="basic"
      :label-col="{ span: 0 }" :wrapper-col="{ span: 18 }" autocomplete="off" noStyle>
      <div class="text-[16px] font-bold mb-[20px]">Contract</div>
      <a-form-item class="" name="version" :rules="[{ required: true, message: 'Please input your Version!' }]">
        <div class="dark:text-white text-[#121211] mb-[12px]">Version</div>
        <a-select v-model:value="formState.version" style="width: 100%" placeholder="请选择">
          <a-select-option :value="item" v-for="item in versionData" :key="item">{{ item }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item name="name" class="mb-[32px]" :rules="[{ required: true, message: 'Please input your Name!' }]">
        <div class="dark:text-white text-[#121211] mb-[12px]">Name</div>
        <a-checkbox-group class="dark:text-white text-[#121211]" :class="theme.themeValue === 'dark' ? 'dark-css' : ''"
          v-model:value="formState.name" name="checkboxgroup" :options="projectsContractData">
        </a-checkbox-group>
        <!-- <Checkbox></Checkbox> -->
      </a-form-item>
      <div class="text-[16px] font-bold mb-[20px]">Network / Chain</div>
      <a-form-item name="chain" :rules="[{ required: true, message: 'Please input your Chain!' }]">
        <div class="dark:text-white text-[#121211] mb-[12px]">Chain</div>
        <a-select v-model:value="formState.chain" style="width: 100%" placeholder="请选择">
          <a-select-option :value="item" v-for="item in chainData" :key="item">{{ item }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item name="network" :rules="[{ required: true, message: 'Please input your Network!' }]">
        <div class="dark:text-white text-[#121211] mb-[12px]">Network</div>
        <a-select v-model:value="formState.network" style="width: 100%" placeholder="请选择" @change="changeNetwork">
          <a-select-option :value="item.id" v-for="item in networkData" :key="item.id">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-button class="btn" @click="deployClick" :loading="loading">{{ loading ? 'Deploying' : 'Deploy' }}</a-button>
    </a-form>
  </div>

  <SelectWallet :visible="visible" @cancelModal="cancelModal"></SelectWallet>
  <Wallets ref="showWallets" @setWalletBtn="setWalletBtn"></Wallets>
</template>
<script lang='ts' setup>
import { reactive, ref, onMounted } from "vue";
import type { FormInstance } from 'ant-design-vue';
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import * as ethers from "ethers";
import YAML from "yaml";
import Breadcrumb from "../components/Breadcrumb.vue";
import SelectWallet from "./components/SelectWallet.vue";
import Wallets from "@/components/Wallets.vue";
import { useThemeStore } from "@/stores/useTheme";
import { apiGetProjectsContract, apiGetProjectsVersions } from "@/apis/workFlows";
import { apiProjectsContractDeploy } from "@/apis/projects";

const formRef = ref<FormInstance>();
const theme = useThemeStore()
const router = useRouter()

const queryParams = reactive({
  id: router.currentRoute.value.params?.id,
  version: router.currentRoute.value.params?.version,
  contract: router.currentRoute.value.params?.contract,
})

const loading = ref(false);
const visible = ref(false)
const showWallets = ref();
const isConnectedWallet = ref(false);
const versionData = reactive([]);
const chainData = reactive(['Ethereum']);
const networkData = reactive([{ name: 'Testnet/Goerli', id: 5 }, { name: 'mainnet', id: 1 }]);
const projectsContractData = reactive([]);
const successContract = ref([]);

const formState = reactive({
  version: router.currentRoute.value.params?.version,
  name: [],
  chain: '',
  network: '',
});



// 查询版本号
const getVersion = async () => {
  const { data } = await apiGetProjectsVersions({ id: queryParams.id });
  Object.assign(versionData, data)
}

const getProjectsContract = async () => {
  const { data } = await apiGetProjectsContract({ id: queryParams.id, version: queryParams.version });
  data.map((item: any) => {
    item.label = item.name;
    item.value = item.id;
    item.abiInfoData = YAML.parse(item.abiInfo)
  })
  Object.assign(projectsContractData, data)
  if (queryParams.contract === '00') {
    data.map((item: any) => {
      formState.name.push(item.id)
    })
  } else {
    formState.name.push(Number(queryParams?.contract))
  }
}

//  创建合约
const contractFactory = async (abi: any, bytecode: any, contractId: number) => {
  const { ethereum } = window;
  // console.log(ethereum, 'ethereum');

  if (ethereum.chainId === "0x1") {
    switchToChain(5)
  }


  const provider = new ethers.providers.Web3Provider(ethereum);
  const accounts = await provider.send('eth_requestAccounts', []);
  const factory = new ethers.ContractFactory(
    abi,
    bytecode,
    provider.getSigner()
  );
  try {
    const contract = await factory.deploy();
    await contract.deployed();
    console.log(contract, 'contract')
    setProjectsContractDeploy(ethereum.chinaId, contract.address, contractId)
  } catch (errorInfo) {
    // 失败的处理
    message.info('该请求被拒绝');
    loading.value = false;
  }



  // console.log(contract, 'contract')




  // console.log(contract.setThawingTime('0'), '00')

  // contract.setThawingTime().then((val: any) => {
  //   console.log(val, 'val')
  // })

  // console.log(contract, 'contract')
  // contract.setValue(9)


  // let tx = await contractWithSigner.setValue("I like turtles.");
  // 查看: https://ropsten.etherscan.io/tx/0xaf0068dcf728afa5accd02172867627da4e6f946dfb8174a7be31f01b11d5364
  // console.log(tx.hash);
  // "0xaf0068dcf728afa5accd02172867627da4e6f946dfb8174a7be31f01b11d5364"

  // 操作还没完成，需要等待挖矿
  // await tx.wait();

  // 再次调用合约的 getValue()
  // let currentValue = await contract['owner'].getValue();

  // console.log(contract['owner']);
  // loading.value = false contracts-details/0

  // router.push(`/projects/${queryParams.id}/contracts-details/${queryParams.version}`)
}

const switchToChain = (chainId: number) => {
  window.ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: `0x${chainId.toString()}` }],
  });
}

const setProjectsContractDeploy = async (chinaId: string, address: string, contractId: number) => {
  const queryJson = {
    id: queryParams.id,
    contractId: contractId,
    projectId: Number(queryParams.id),
    version: formState.version,
    // network: formState.network,
    network: 'Testnet/Goerli',
    address: address,
  }
  const { data } = await apiProjectsContractDeploy(queryJson)
  return data
}

const deployClick = async () => {
  // 有值说明已连接钱包
  const isWalletAccount = window.localStorage.getItem("alreadyConnectedWallets");
  // console.log(isWalletAccount, 'isWalletAccount')
  if (isWalletAccount == null || isWalletAccount === '[]') {
    // visible.value = true
    setWalletBtn(true)
  } else {
    // 连接钱包后再创建合约
    try {
      loading.value = true
      const values = await formRef?.value.validateFields();
      const { name } = formState
      // let promise = []
      name.map((item: number) => {
        let selectItem: any = projectsContractData.find(val => { return val.id === item });
        contractFactory(selectItem.abiInfoData, selectItem.byteCode, item)
        // promise.push(contractFactory(selectItem.abiInfoData, selectItem.byteCode, item))
      })

      // const res = await Promise.all(promise)
      // console.log(res, 'res')


    } catch (errorInfo) {
      loading.value = false
      console.log('Failed:', errorInfo);
    }
  }
}

const changeContractValue = (checkedValue: any) => {
  // formState.contractId = checkedValue.id
  console.log(checkedValue, 'checkedValue')
}

const cancelModal = (val: boolean) => {
  visible.value = val
}

const setWalletBtn = (val: boolean) => {
  isConnectedWallet.value = val;
  // const account = window.localStorage.getItem("walletAccount");
  // walletAccount.value = account?.substring(0, 5) + "..." + account?.substring(account.length - 4);
}


const changeNetwork = (val: string) => {
  console.log(val, 'val')
}

onMounted(async () => {
  await getProjectsContract()
  getVersion()
})

</script>
<style lang='less' scoped>
@backGroundCOlor: #1D1C1A;
@baseColor: #E2B578;

.dark-css {
  :deep(label) {
    color: #ffffff !important;
  }
}

.artifactsDeploy {
  font-size: 14px;
}

:deep(.ant-form label) {
  color: #121211;
}

.btn {
  width: 131px;
  height: 43px;
}

:deep(.ant-checkbox-wrapper-checked:hover) {
  border-radius: 4px;
}

:deep(.ant-checkbox-checked+span) {
  color: #E2B578;
}

:deep(.ant-checkbox-inner),
:deep(.ant-checkbox-checked .ant-checkbox-inner) {
  background-color: transparent;
}

:deep(.ant-checkbox-checked:after) {
  border-radius: 4px;
  background-color: transparent;
}

:deep(.ant-checkbox-inner) {
  width: 20px;
  height: 20px;
  border-radius: 4px;
}

:deep(.ant-checkbox-checked .ant-checkbox-inner:after) {
  border: 5px solid #E2B578;
  transform: rotate(0deg) scale(1);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 2px;
}

:deep(.ant-checkbox-wrapper:hover) {
  border-radius: 4px;
}

input::-webkit-input-placeholder,
input:-moz-placeholder,
input::-moz-placeholder,
input:-ms-input-placeholder {
  color: #bcbebc;
}

:deep(.ant-form-item-has-error .ant-select:not(.ant-select-disabled):not(.ant-select-customize-input) .ant-select-selector) {
  background-color: transparent;
}

:deep(.ant-select-clear) {
  // background-color: #00000040;
}
</style>