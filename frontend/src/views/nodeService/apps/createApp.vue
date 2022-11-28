<template>
  <a-modal v-model:visible="showCreate" title="Creat App" :footer="null" :closable="false" width="600px">
    <a-form :model="formData" layout="vertical" ref="formRef" :rules="formRules">
      <a-form-item label="Name" name="name" >
        <a-input v-model:value="formData.name" placeholder="Please enter Name" allow-clear autocomplete="off" />
      </a-form-item>
      <a-form-item label="Description" name="description" >
        <a-input v-model:value="formData.description" placeholder="Please enter Description" allow-clear autocomplete="off" />
      </a-form-item>
      <a-form-item label="Chain" name="chain" >
        <a-input v-model:value="formData.chain" placeholder="Please enter Chain" allow-clear autocomplete="off" />
      </a-form-item>
      <a-form-item label="Network" name="network" >
        <a-input v-model:value="formData.network" placeholder="Please enter Network" allow-clear autocomplete="off" />
      </a-form-item>
    </a-form>
    <div class="text-center">
      <a-button type="primary" @click="cancel" ghost>Cancel</a-button>
      <a-button class="ml-4" type="primary" @click="createApp" :loading="loading">Create App</a-button>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
  import { toRefs, reactive, computed, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { apiAddApp } from "@/apis/rpcs";
  
  const router = useRouter();
  const props = defineProps({
    showCreate: Boolean,
  });
  const { showCreate } = toRefs(props);
  const emit = defineEmits(["setShowCreate"]);

  const loading = ref(false);
  const formRef = ref();
  const formData = reactive({
    name: '',
    description: '',
    chain: '',
    network: '',
    account: 'jlvihv',
  });

  // Form rules
  const formRules = computed(() => {

    const requiredRule = (message: string) => ({ required: true, trigger: 'change', message });
    
    return {
      name: [requiredRule('Name')],
      description: [requiredRule('Description')],
      chain: [requiredRule('Chain')],
      network: [requiredRule('Network')],
    };
  });

  const createApp = async () => {
    console.log("create...");
    await formRef.value.validate();

    loading.value = true;

    try {
      const data = await apiAddApp(formData);
      console.log(data)
    } catch (error: any) {
      console.log("erro:",error)
    } finally {
      loading.value = false;
      router.push({ path: '/apps' });
    }
  }

  const cancel = async () => {
    emit("setShowCreate");
  }
</script>
<style scoped lang="less">
@btnColor: #E2B578;
:deep(.ant-input){
  background-color: transparent;
  border-radius: 8px;
  color: #BBBAB9;
  border-color: #EBEBEB;
  padding: 4px 11px !important;
}
:deep(.ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):hover), 
:deep(.ant-input-affix-wrapper-focused),
:deep(.ant-input-affix-wrapper:focus) {
  border-color: @btnColor;
}
:deep(.ant-input-affix-wrapper-focused),
:deep(.ant-input-affix-wrapper:focus){
  box-shadow: 0 0 0 2px rgb(226 181 120 / 20%);
}

:deep(.ant-input-affix-wrapper){
  border-radius: 8px;
  border-color: #EBEBEB;
}
:deep(.ant-btn){
  border-radius: 8px;
}
:deep(.ant-btn-primary){
  width: 120px;
  height: 40px;
}
:deep(.ant-btn-primary), :deep(.ant-btn-primary:hover), :deep(.ant-btn-primary:focus){
  border-color: @btnColor;
  background: @btnColor;
}

:deep(.ant-btn-background-ghost.ant-btn-primary), :deep(.ant-btn-background-ghost.ant-btn-primary:hover), :deep(.ant-btn-background-ghost.ant-btn-primary:focus){
  border-color: @btnColor;
  color: @btnColor;
}
</style>