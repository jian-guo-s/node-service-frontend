<template>
  <div class="login-box">
    <div class="flex justify-between login-header">
      <img src="@/assets/images/logo-block.png" class="h-[28px] mt-[16px]" />
    </div>
    <div class="text-center login-content ">
      <img src="@/assets/images/logo.png" class="h-[92px]" />
      <div class="text-[32px] text-[#ffffff] font-bold mb-[32px]">Welcome to Hamster</div>
      <div class="login-btn mb-[24px] bg-[#ffffff] text-[#000000] cursor-pointer" @click="loginBox">
        <img src="@/assets/icons/Frame-white.svg" class="h-[24px]" />
        <span class="align-middle ml-[6px]">Continue with GitHub</span>
      </div>
      <div class="login-btn btn-dis mb-[24px] bg-[#333230] text-[#FFFFFF]">
        <img src="@/assets/icons/icon-gitLab.svg" />
        <span class="align-middle ml-[6px]">Continue with GitLab</span>
      </div>
      <div class="login-btn btn-dis bg-[#333230] text-[#FFFFFF]">
        <img src="@/assets/icons/icon-bitbucket.svg" />
        <span class="align-middle ml-[6px]">Continue with Bitbucket</span>
      </div>
    </div>
  </div>

</template>
<script lang='ts' setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { useThemeStore } from "@/stores/useTheme";
import { apiLogin } from "@/apis/login";
const theme = useThemeStore()
const router = useRouter()

const code = ref('');
const clientId = ref('67f15ceaf935341e04df');
const oauthUrl = ref('https://github.com/login/oauth/authorize')

const loginBox = () => {
  const state = new Date().getTime();
  const url = `${oauthUrl.value}?client_id=${clientId.value}&scope=user&state=${state}`;
  window.open(url);
}

const login = async () => {
  try {
    const { data } = await apiLogin({ code: code.value, clientId: clientId.value });
    localStorage.setItem('token', data.token);
    localStorage.setItem('userInfo', JSON.stringify(data));
    router.push('/projects')
  } catch (err) {
    message.error(err.message)
    // console.log('登录失败，请重新登录')
  }

}
onMounted(async () => {
  code.value = router.currentRoute.value.query?.code
  if (code.value) {
    login()
  }
})
</script>
<style lang='less' scoped>
.login-box {
  min-height: 100vh;
  padding: 0 32px;
  background: url("../../assets/images/login-bg.jpg") 100% 100% no-repeat;
  background-size: cover;

  .login-header {
    height: 64px;
  }

  .login-content {
    font-size: 16px;
    width: 400px;
    margin: 164px auto;

    .login-btn {
      border-radius: 8px;
      line-height: 56px;
    }

    .btn-dis {
      width: 100%;
      height: 56px;
      position: relative;

      &::before {
        content: 'coming soon';
        position: absolute;
        top: 0;
        right: 0;
        width: 89px;
        height: 24px;
        line-height: 24px;
        font-size: 12px;
        border-radius: 0 8px 0 8px;
        color: #ffffff;
        background-color: #E2B578;
      }
    }
  }
}
</style> 