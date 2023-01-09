<template>
  <div class="contractSetails flex justify-between mb-[24px]">
    <Breadcrumb :currentName="'Hamster'"></Breadcrumb>
    <a-select class="select-dark" ref="select" v-model:value="contractDeployDetail.version" style="width: 180px">
      <a-select-option :value="item" v-for="item in versionData" :key="item">{{ item }}</a-select-option>
    </a-select>
  </div>
  <div class="dark:bg-[#1D1C1A] bg-[#ffffff] dark:text-white text-[#121211] p-[32px] rounded-[8px]">
    <a-tabs v-model:activeKey="activeKey" class="dark:text-white text-[#121211]">
      <a-tab-pane v-for="(item, key) in contractInfo" :key="key" :tab="key">
        <a-table :dataSource="item.deployInfo" :columns="columns" class="mb-[64px]"
          :customHeaderRow="customHeaderRowStyle" :pagination="false" :customRow="customRowClick">
          <template #bodyCell="{ column }">
            <template v-if="column.key === 'action'">
              <a @click.stop="deploy">Deploy</a>
            </template>
          </template>
        </a-table>
        <div class="">
          <div class="text-[24px] font-bold mb-[32px]">Contract List</div>
          <ContractList :abiInfo="item.abiInfo" :contractAddress="contractAddress" @checkContract="checkContract">
          </ContractList>
        </div>
      </a-tab-pane>
    </a-tabs>
    <!-- <noData :hasData="hasData"></noData> -->
  </div>

</template>
<script lang='ts' setup>
import { ref, computed, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import Breadcrumb from "../components/Breadcrumb.vue";
import noData from "./components/noData.vue";
import YAML from "yaml";
import * as ethers from "ethers";
import ContractList from "./components/ContractList.vue";
import { apiGetContractDeployDetail, apiGetProjectsVersions } from "@/apis/workFlows";
const router = useRouter();
const queryJson = reactive({
  id: router.currentRoute.value.params?.id,
  version: router.currentRoute.value.params?.version,
})
const activeKey = ref()
const hasData = ref(true);
const versionData = reactive([]);
const dataSource = ref([]);
const contractName = ref('');
const contractAddress = ref('');
const columns = [
  {
    title: 'Network',
    dataIndex: 'network',
    align: "center",
    key: 'network',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    align: "center",
    customRender: ({ text }) => {
      if (!text) {
        return '-'
      }
    },
    key: 'address',
  },
  {
    title: 'Action',
    align: "center",
    key: 'action',
  }];

const tabList = reactive([]);
const contractDeployDetail = reactive({})
const contractInfo = reactive({})

const getContractDeployDetail = async () => {
  const { data } = await apiGetContractDeployDetail(queryJson)
  console.log(data, 'data')
  for (let key in data.contractInfo) {
    tabList.push(key)
  }
  Object.assign(contractDeployDetail, data)
  Object.assign(contractInfo, data.contractInfo)

  activeKey.value = Object.keys(contractInfo)[0]
}

const getVersion = async () => {
  const { data } = await apiGetProjectsVersions({ id: queryJson.id });
  Object.assign(versionData, data)
}

const deploy = () => {

}

const checkContract = (name: string) => {
  contractName.value = name
  console.log(name, 'name')
}


const customRowClick = (record: any, index: number) => {
  return {
    style: {
      cursor: 'pointer',
      // backgroundColor: '#463F36',
    },
    onClick: async (event: Event) => {
      // ethers.utils.parseEther("0");

      // const { ethereum } = window;

      // let provider = new ethers.providers.Web3Provider(ethereum);
      // let abi = YAML.parse(contractInfo?.ConvertLib.abiInfo);
      contractAddress.value = record.address;
      // let contract = new ethers.Contract(contractAddress, abi, provider.getSigner());



      // let privateKey = '0x2752d11d9fa6459a66bb66d1a0ef8f4bddf27b09';
      // let wallet = new ethers.Wallet(privateKey, provider);k

      // let contractWithSigner = contract.connect(wallet);
      // let provider = new ethers.providers.Web3Provider(ethereum);
      // let tx = await contractWithSigner.setValue("I like turtles.");


      // await tx.wait();

      // 再次调用合约的 getValue()
      // let newValue = await contract['owner'].getValue();

      console.log(contract, 'contract');
      // let exec = contract.setThawingTime(4)

      // exec.then((val: any) => {
      //   console.log(val, 'val')
      // });
      let val = 3
      const data = new FormData();
      let exec;
      if (val) {
        let value = ethers.utils.parseEther("3");
        exec = contract[contractName.value](...data.values(), { value });
      } else {
        exec = contract[contractName.value](...data.values());
      }

      exec.then((v: any) => {
        console.log(v, 'vvvvvv')
      })

      // contract.getValue().then((val: any) => {
      //   console.log(val, 'val')
      // })
      // console.log(contract)
      // console.log(contract.getValue(), 'contract')
      // let currentValue = await contract.setThawingTime.getValue();

      // console.log(currentValue);
      // console.log(record.address, '99')
    }
  }
};



onMounted(() => {
  getVersion()
  getContractDeployDetail()
})

const customHeaderRowStyle = (record: any, index: number) => {
  // return {
  //   style: {
  //     backGroundColor: '#E2B578',
  //   }
  // }
}


</script>
<style lang='less' scoped>
@baseColor: #E2B578;

:deep(.ant-select-selection-item) {
  color: @baseColor;
}
</style>