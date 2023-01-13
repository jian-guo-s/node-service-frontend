<template>
  <div class="header" :class="{ navActive: scrollFlag }">
    <span class="header-left" @click="goHome">
      <img src="@/assets/svg/logo.svg" style="height: 100%; width: 100%; cursor: pointer" />
    </span>
    <span class="header-tab">
      <a href="#" style="margin-left: 0">
        <router-link to="/computingPower" active-class="active" exact>
          {{
            $t("work.powerMarket")
          }}
        </router-link>
      </a>
      <a href="#" style="margin-left: 64px" @click="codePage">
        {{
          $t("work.codeMarket")
        }}
      </a>
      <a href="#" style="margin-left: 64px" @click="manpowerPage">
        {{
          $t("work.humanMarket")
        }}
<!--        <router-link active-class="active">-->
<!--          -->
<!--        </router-link>-->
      </a>
<!--            <a href="#" style="margin-left: 64px">{{ $t("work.humanMarket") }}</a>-->
    </span>

    <span class="userInfo">
      <span v-if="!name" class="loginBox" @click="loginARegister">{{ $t("work.loginOrRegister") }}</span>

      <span v-if="name">
        <span class="goCodeForce" @click="goCodeForce">
          <svg-icon iconName="hot" class="hot"></svg-icon>
          <span>{{ $t("work.tradingCenter") }}</span>
        </span>
        <a-dropdown>
          <a class="ant-dropdown-link" @click.prevent>
            <img :src="avatar" />
          </a>
          <template #overlay>
            <a-menu>
              <div class="drop-title" @click="goHomePage">
                <div class="avatar">
                  <img :src="realHeadImgUrl ? realHeadImgUrl : avatar" />
                </div>

                <div>
                  <div class="up">
                    <span>{{ realName ? realName : name }}</span>
                    <div v-if="status === 1">{{ t("personalCenter.underReview") }}</div>
                    <img src="@/assets/images/Frame.png" alt v-else-if="status === 2" />
                  </div>
                  <div class="down">
                    {{
                      status === 0
                        ? $t("personalCenter.notCertified")
                        : identity
                    }}
                  </div>
                </div>

                <a-button @click="refAuthIndex.openModal()" class="btn" v-if="status === 0">去认证</a-button>

                <svg-icon v-else iconName="More2" class="more"></svg-icon>
              </div>
              <div class="drop-content">
                <a-menu-item>
                  <div class="menu-item" @click="toPage('my-purse')">{{ $t("work.myWallet") }}</div>
                </a-menu-item>
                <a-menu-item>
                  <div class="menu-item" @click="toPage('my-storage')">{{ $t("work.myStorage") }}</div>
                </a-menu-item>
                <a-menu-item>
                  <div class="menu-item" @click="toPage('my-order')">{{ $t("work.myOrder") }}</div>
                </a-menu-item>
                <a-menu-item>
                  <div
                    class="menu-item"
                    @click="goMyHourSalary"
                  >{{ $t("personalCenter.myHourlySalary") }}</div>
                </a-menu-item>
                <a-menu-item>
                  <div class="menu-item" @click="loginOut">{{ $t("work.logOut") }}</div>
                </a-menu-item>
              </div>
            </a-menu>
          </template>
        </a-dropdown>
      </span>
    </span>
  </div>
  <div class="header-modal">
<!--    loginModalTitle-->
    <modal-component
      ref="modalComponentRef"
      :title="loginModalTitle"
      :cancel-function="initData"
      @cancelModal="cancelWeChatTimer"
    >
      <div class="modal-content1" v-show="!isWechatLogin">
        <a-form ref="codeState" :model="codeForm" :rules="codeRules">
          <a-form-item :label="$t('work.phoneNumber')" name="mobile">
            <a-input
              v-model:value="codeForm.mobile"
              :disabled="disabled"
              type="text"
              autocomplete="off"
              placeholder
              @change="changeMobile"
            />
          </a-form-item>
        </a-form>

        <a-form ref="loginState" :model="loginForm" :rules="rules">
          <a-form-item :label="$t('work.verificationCode')" name="smsCode">
            <a-input v-model:value="loginForm.smsCode" type="text" autocomplete="off" placeholder>
              <template #suffix>
                <span v-show="getCodeButton" class="getCode" @click="getCode">
                  {{
                    $t("work.getCode")
                  }}
                </span>
                <span v-show="!getCodeButton" class="getCode">{{ time }}后重试</span>
              </template>
            </a-input>
          </a-form-item>
          <a-button block @click="toLogin" :loading="loading">
            {{
              buttonInfo
            }}
          </a-button>
        </a-form>

        <div class="agreement">{{ $t("work.signAgreement") }}</div>
        <div class="login-way-box" @click="loginWay(true, $t('work.wxLoginOrRegister'))">
          <span class="login-way-info">{{ $t("work.codeScanningLogin") }}</span>
          <img src="@/assets/login/Group1741.png" />
        </div>
      </div>

      <div class="modal-content1 modal-content2" v-show="isWechatLogin">
        <iframe
          class="wechat_qr_code"
          height="450px"
          width="450px"
          frameborder="0"
          v-if="wechatQRCodeFlag"
          :src="wechatQRCodeUrl"
        ></iframe>
        <div class="follow">扫码关注公众号完成登录</div>
        <div class="agreement">{{ $t("work.signAgreement") }}</div>
        <div class="login-way-box" @click="loginWay(false, $t('work.mobileLoginOrRegister'))">
          <span class="login-way-info">{{ $t("work.mobileLogin") }}</span>
          <img src="@/assets/login/Group1743.png" />
        </div>
      </div>
    </modal-component>
    <InterestTagModal ref="refTagModal" />
    <AuthIndex ref="refAuthIndex" />
  </div>
</template>

<script>
import ModalComponent from "../../components/modal/index";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { nextTick } from "vue";
import { message, Modal } from "ant-design-vue";
import { login, getToken } from "@/api/work/index.js";
import { wechatQrcode, weChatAccessToken } from "@/api/personalCenter/index.js";
import {
  getAccessToken,
  setAccessToken,
  setRefreshToken,
  removeAccessToken,
  removeRefreshToken,
} from "@/utils/auth";
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  toRefs,
} from "vue";
import { computed } from "@vue/runtime-core";
import InterestTagModal from "@/views/mainWork/pc/components/InterestTagModal.vue";
import { getCertificationCurrent } from "@/api/manpowerAttestation/index.js";
import AuthIndex from "../../views/personal-center/pc/manpower-certification/components/AuthIndex.vue";
import { getRefreshToken } from "@/utils/auth.js"

export default defineComponent({
  name: "pcHeader",
  components: {
    ModalComponent,
    InterestTagModal,
    AuthIndex
  },
  setup() {
    const { t } = useI18n();
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    const store = useStore();
    const codeState = ref();
    const loginState = ref();
    const modalComponentRef = ref();
    const refTagModal = ref();
    let status = ref(0);
    let identity = ref("");
    const wechatQrCode = ref();
    const refAuthIndex = ref()
    let realName = ref("");
    let realHeadImgUrl = ref("");


    const manpowerPage = () => {
      window.location.href = process.env.VUE_APP_MANPOWER_LINK
    }
		
    const codePage = () => {
      window.location.href = process.env.VUE_APP_CODE_LINK
    }
    const state = reactive({
      // loginModalTitle: t("work.mobileLoginOrRegister"),
      loginModalTitle: t("work.wxLoginOrRegister"),
      buttonInfo: t("work.signIn"),
      currentPath: "",
      time: 60,
      timer: null,
      getCodeButton: true,
      isWechatLogin: true,
      loading: false,
      visible: false,
      scrollFlag: false,
      disabled: false,
      wechatQRCodeFlag: false,
      weChatAccessTokenTimer: "",
      wechatQRCodeUrl: "",
      wechatTicketForm: {
        ticket: "",
      },
      codeForm: {
        mobile: "",
      },
      loginForm: {
        grant_type: "sms_code",
        scope: "all",
        smsCode: "",
        mobile: "",
        // device: "PC",
        // unionid: "",
        loginChannel: 'Member'
      },
      obj: null,
    });

    const rules = {
      smsCode: [
        {
          required: true,
          message: t("work.enterCode"),
          validator: function (rule, value) {
            if (value === "") {
              return Promise.reject(t("work.enterCode"));
            } else if (value) {
              return Promise.resolve();
            }
          },
          trigger: "change",
        },
      ],
    };

    const codeRules = {
      mobile: [
        {
          required: true,
          message: t("work.enterPhone"),
          trigger: "blur",
        },
        {
          pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
          message: t("work.enterCorrectPhone"),
          trigger: "change",
        },
      ],
    };

    const getCode = () => {
      state.loginForm.smsCode = "";
      codeState.value
        .validate()
        .then(() => {
          state.getCodeButton = false;
          state.disabled = true;
          state.timer = setInterval(() => {
            state.time--;
            if (state.time <= 0) {
              state.time = 60;
              state.getCodeButton = true;
              state.disabled = false;
              clearInterval(state.timer);
            }
          }, 1000);

          getToken(state.codeForm)
            .then(() => {
              proxy.$message.success(t("work.textSendSuccsee"));
            })
            .catch((err) => {
              state.disabled = false;
              proxy.$message.error(err.message);
            });
        })
        .catch(() => {
          return false;
        });
    };

    const toLogin = () => {
      if (getAccessToken()) {
        removeAccessToken();
        removeRefreshToken();
        sessionStorage.clear();
      }

      const result = codeState.value
        .validate()
        .then(() => {
          return true;
        })
        .catch(() => {
          return false;
        });

      if (!result) return;
      state.loginForm.mobile = state.codeForm.mobile;

      loginState.value
        .validate()
        .then(() => {
          state.loading = true;
          login(state.loginForm)
            .then(async (res) => {
              if(res.code !== 200) return
              proxy.$message.success(t("work.loginSuccess"));
              state.loading = false;
              modalComponentRef.value.cancel();
              setAccessToken(res.data.access_token);
              setRefreshToken(res.data.refresh_token);
              await store.dispatch("GetUserinfo");
              getCurrent()
              setTimeout(() => {
                if (
                  !(
                    JSON.parse(localStorage.getItem("userInfomation"))
                      .sysDictVOList.length !== 0
                  )
                ) {
                  refTagModal.value.openModal("login");
                }
              }, 100);
            })
            .catch((err) => {
              proxy.$message.error(err.message);
              state.loading = false;
            });
        })
        .catch(() => {
          return false;
        });
    };

    const goHome = () => {
      router.replace("/home");
    };

    const goCodeForce = () => {
      // router.push({ name: "manpower" });
      router.push({ name: "computingPowerMarket" });
    };

    const changeMobile = () => {
      state.loginForm.smsCode = "";
      state.loginForm.mobile = "";
    };

    const loginARegister = async () => {
      modalComponentRef.value.openModal();
      state.isWechatLogin = true;
      await nextTick();
      queryWechatTicket();
      weChatTimer();
    };

    const initData = () => {
      proxy.$nextTick(() => {
        codeState.value.resetFields();
        loginState.value.resetFields();
      });
    };

    const loginOut = () => {
      Modal.confirm({
        title: t("common.tips"),
        centered: true,
        content: t("common.confirmExit"),
        okText: t("common.determine"),
        cancelText: t("common.cancel"),
        onOk() {
          store
            .dispatch("LogOut")
            .then(() => {
              location.reload();
            })
            .catch(() => { });
        },
        onCancel() {
          // console.log("Cancel");
        },
      });
    };

    const loginWay = (val, title) => {
      state.isWechatLogin = val;
      state.loginModalTitle = title;
      state.buttonInfo = t("work.signIn");
      if (!state.wechatQRCodeUrl) {
        queryWechatTicket();
      }
      if (state.isWechatLogin) {
        weChatTimer();
      } else {
        cancelWeChatTimer();
      }
    };

    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop) {
        state.scrollFlag = true;
      } else {
        state.scrollFlag = false;
      }
    };

    //获取场景二维码的ticket
    const queryWechatTicket = () => {
      let data = {
        clientKey: process.env.VUE_APP_WECHAT_QRCODE_CLIENT,
        // channel: 'Master_PC_Web',
        channel: 'Member',
      }
      wechatQrcode(data).then((res) => {
        if (res.data.ticket) {
          state.wechatQRCodeFlag = true;
          state.wechatTicketForm.ticket = res.data.ticket;
          state.wechatQRCodeUrl = res.data.qrcodeUrl;
        } else {
          return;
        }
      });
    };

    //定时轮询获取微信号关注信息
    const weChatTimer = () => {
      state.weChatAccessTokenTimer = window.setInterval(() => {
        setTimeout(queryWeChatAccessTokenFlag, 0);
      }, 1500);
    };

    //取消定时轮询任务
    const cancelWeChatTimer = () => {
      clearInterval(state.weChatAccessTokenTimer);
    };

    //是否需要轮询
    const queryWeChatAccessTokenFlag = () => {
      if (state.wechatTicketForm.ticket) {
        queryWeChatAccessToken();
      }
    };

    //轮询获取微信公众号的信息
    const queryWeChatAccessToken = () => {
      weChatAccessToken(state.wechatTicketForm).then((res) => {
        if (res.data && res.data.unionid) {
          cancelWeChatTimer();
          if (res.data.mobile) {
            state.loading = true;
            state.loginForm.mobile = res.data.mobile;
            state.loginForm.smsCode = res.data.access_token;
            login(state.loginForm)
              .then((res) => {
                if(res.code !== 200) return
                proxy.$message.success(t("work.loginSuccess"));
                state.loading = false;
                modalComponentRef.value.cancel();
                setAccessToken(res.data.access_token);
                setRefreshToken(res.data.refresh_token);

                store.dispatch("GetUserinfo");
                getCurrent()
                router.replace(state.currentPath);
              })
              .catch(() => {
                state.loading = false;
              });
          } else {
            state.loginModalTitle = t("work.bindMobile");
            state.buttonInfo = t("work.binding");
            state.loginForm.wechatId = res.data.unionid;
            state.isWechatLogin = false;
            modalComponentRef.value.openModal();
          }
        }
      });
    };

    // 获取认证信息
    const getCurrent = () => {
      getCertificationCurrent().then((res) => {
        if (res.data.status === 3) {
          res.data.status = 0;
        }
        status.value = res.data.status;
        identity.value = res.data.identity;
        realName.value = res.data.realName
        realHeadImgUrl.value = res.data.realHeadImgUrl
      });
    }

    onMounted(() => {
      state.currentPath = router.currentRoute.value.path;
      window.addEventListener("scroll", handleScroll, false);

      const refreshToken = getRefreshToken()
      if (refreshToken) {
        getCurrent()
      }
    });

    onUnmounted(() => {
      clearInterval(state.timer);
      window.removeEventListener("scroll", handleScroll, false);
    });

    const toPage = (name) => {
      router.push({ name: name });
      sessionStorage.setItem("menuActiveName", name);
    };

    const goMyHourSalary = () => {
      if (status.value !== 2) {
        message.warning("认证完成后可修改时薪")
        return
      }
      router.push({ name: 'myHourSalary' })
    }

     const goHomePage = () => {
      if (status.value === 2) {
        router.push({ name: "profile" })
      }
    }

    return {
      name: computed(() => store.state.user.name),
      avatar: computed(() => store.state.user.avatar),
      realHeadImgUrl,
      realName,
      codeState,
      loginState,
      t,
      rules,
      wechatQrCode,
      codeRules,
      ...toRefs(state),
      goHome,
      goCodeForce,
      loginARegister,
      changeMobile,
      getCode,
      toLogin,
      loginOut,
      loginWay,
      handleScroll,
      toPage,
      queryWechatTicket,
      weChatTimer,
      cancelWeChatTimer,
      queryWeChatAccessTokenFlag,
      queryWeChatAccessToken,
      modalComponentRef,
      initData,
      refTagModal,
      status,
      refAuthIndex,
      identity,
      goMyHourSalary,
      goHomePage,
      manpowerPage, codePage,
    };
  },
});
</script>

<style lang="scss" scoped>
.navActive {
  background: rgba(13, 26, 77, 0.7);
  backdrop-filter: blur(30px);
}
.header {
  font-size: 14px;
  margin: 0 auto;
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  position: fixed;
  width: 100%;
  height: 72px;
  left: 50%;
  transform: translateX(-50%);
  top: -4px;
  .header-left {
    width: 128px;
    height: 32px;
    position: absolute;
    top: 20px;
    left: 64px;
  }
  .header-tab {
    height: 20px;
    width: 628px;
    position: absolute;
    left: 320px;
    top: 26px;
    border-radius: 0px;
    a {
      height: 20px;
      //width: 56px;
      float: left;
      color: #adb6ca;
      font-family: PingFang SC;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      cursor: pointer;
    }
    .active {
      color: #fdfeff;
      font-weight: 600 !important;
    }
  }
  .userInfo {
    position: absolute;
    top: 26px;
    right: 64px;
    .goCodeForce {
      margin-right: 32px;
      cursor: pointer;
    }
    span {
      &:last-child {
        color: #fb8b39;
        span {
          font-size: 14px;
          font-weight: 600;
          vertical-align: middle;
        }
      }
    }
    .hot {
      width: 20px;
      height: 20px;
      color: #fb8b39;
      vertical-align: middle;
      margin-right: 4px;
    }
    img {
      height: 32px;
      width: 32px;
      vertical-align: middle;
      cursor: pointer;
      border-radius: 50%;
    }
    .loginBox {
      display: inline-block;
      color: #ffffff !important;
      margin-right: 8px;
      cursor: pointer;
    }
  }
}
.ant-modal {
  max-width: 100%;
  top: 0;
  padding-bottom: 0;
  margin: 0;
  .modal-header {
    display: flex;
    justify-content: space-between;
    padding: 32px 32px 20px;
    .title-font {
      font-size: 18px;
      font-weight: 600;
    }
    img {
      cursor: pointer;
    }
  }
  .modal-content2 {
    position: relative;
    .agreement,
    .follow {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-size: 12px;
      color: #adb6ca;
      text-align: center;
    }
    .follow {
      bottom: 40px;
      font-size: 14px;
      font-weight: 600;
      color: $font-color-first-title;
    }
    .agreement {
      color: #adb6ca;
      bottom: 12px;
    }
    .login-way-box {
      bottom: -32px !important;
      right: -32px !important;
      cursor: pointer;
    }
  }
  .modal-content1 {
    height: 258px;

    .login-way-box {
      position: absolute;
      bottom: 0;
      right: 0;
      cursor: pointer;
      img {
        width: 54px;
        height: 54px;
      }
      .login-way-info {
        font-size: 12px;
        position: relative;
        padding: 2px 12px;
        display: inline-block;
        color: #fb8b39;
        border: 1px solid #fb8b39;
        border-radius: 3px;
        cursor: pointer;
        &:before {
          position: absolute;
          content: "";
          width: 0px;
          height: 0px;
          top: 6px;
          right: -8px;
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
          border-left: 8px solid #fb8b39;
        }
        &:after {
          position: absolute;
          content: "";
          width: 0px;
          height: 0px;
          top: 6px;
          right: -6px;
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
          border-left: 8px solid #ffffff;
        }
      }
    }
    .getCode {
      font-weight: 400;
      color: #4850ff;
      &:first-child {
        cursor: pointer;
      }
    }
    .wechat_qr_code {
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
      -webkit-transform-origin: 0 0;
      transform-origin: 148px -28px;
    }
  }
  .ant-modal-body {
    .ant-form {
      .code-box {
        border: 1px solid #e5e5e5;
        text-align: center;
        border-radius: 4px;
        line-height: 40px;
        margin-left: 12px;
        cursor: pointer;
        .ant-btn {
          width: 100%;
          background-color: #ffffff;
          margin-top: 0;
          height: 40px;
          color: #333333;
        }
      }
      .ant-btn {
        background-color: #4850ff;
        margin: 20px 0 32px;
        height: 40px;
        color: #ffffff;
      }
    }
    .agreement {
      font-size: 12px;
      color: #adb6ca;
      text-align: center;
    }
  }
}

.ant-dropdown {
  .ant-dropdown-link {
    img {
      border-radius: 50%;
    }
  }

  ul {
    padding: 0;
  }
  .menu-item {
    line-height: 32px;
    min-width: 126px;
  }
  .drop-content {
    margin: 0px 10px;
  }
  .drop-title {
    display: flex;
    align-items: center;
    height: 85px;
    width: 290px;
    padding: 20px;
    margin-top: 15px;
    margin-bottom: 10px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    background: url("../../assets/login/Group1727.png") 100% 100% no-repeat;

    .btn {
      background: linear-gradient(97.75deg, #fbebd6 8.74%, #eaac64 94.77%);
      border-radius: 39px;
      height: 33px;
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 17px;
      color: #202839;
      margin-left: auto;
    }

    .avatar {
      background: linear-gradient(
        180deg,
        #eea940 6.38%,
        #ffffff 44.55%,
        #ffebc6 93.62%
      );
      width: 45px;
      height: 45px;
      border-radius: 50%;
      padding: 3px;
      margin-right: 8px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .up {
      display: flex;
      align-items: center;
      span {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 22px;
        color: #202839;
      }

      div {
        background: #fb8b39;
        border-radius: 2px;
        padding: 2px 8px;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 17px;
        color: #ffffff;
        margin-left: 4px;
      }

      img {
        margin-left: 2px;
        width: 24px;
        height: 24px;
      }

      margin-bottom: 6px;
    }

    .down {
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 17px;
      color: #58637b;
    }

    .more {
      margin-left: auto;
      color: #202839;
      width: 24px;
      height: 24px;
    }
  }
}

.login_container {
  text-align: center;
  height: 230px;
}
</style>
