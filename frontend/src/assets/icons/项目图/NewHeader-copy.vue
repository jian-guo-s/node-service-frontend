<template>

  <!-- Layout Header ( Navbar ) -->
  <a-layout-header v-if="token">

    <div class="header-col header-brand">
      <h6 @click="backHome" style="cursor: pointer">
        <img :src="logo" class="logo" alt="logo" @click="toManpowerPath">
      </h6>

    </div>
    <div class="header-col header-nav">
      <a-menu mode="horizontal" v-model="current">
        <a-menu-item v-for="item in menuList" @click="$router.push({name: item.name})" :key="item.name">
          <span class="submenu-title-wrapper">
            <img :src="current && current[0] === item.name ? item.meta.selected : item.meta.unselected" alt>
						<span style="margin-left: 4px">{{ item.meta.title }}</span>
					</span>
        </a-menu-item>
      </a-menu>

    </div>
    <div class="header-col header-btn">
      <a-dropdown placement="bottomRight">
        <span class="ant-dropdown-link">
          <a-avatar v-if="realHeadImgUrl" :size="41" :src="realHeadImgUrl"/>
          <a-avatar v-else-if="realName" :size="41" style="background-color: #192449">{{ realName.slice(-2) }}</a-avatar>
          <a-avatar v-else :size="41" :src="defaultLogo"/>
        </span>
        <a-menu style="margin-top: 12px" slot="overlay">
          <a-menu-item @click="toAccountCenter">
            <span>账户中心</span>
          </a-menu-item>
          <a-menu-item @click="toEnterpriseCenter" v-if="typeId === 2">
            <span>企业中心</span>
          </a-menu-item>
          <a-menu-item>
            <a @click="logout">退出登录</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>

  </a-layout-header>
  <a-layout-header v-else>
    <div class="header-col header-brand">
      <h6>
        <img :src="logo" class="logo" alt="logo" @click="toManpowerPath">
      </h6>

    </div>

    <div class="header-col header-nav">
      <span style="margin-left: 50px;cursor: pointer">寻找开发者</span>
      <span style="margin-left: 24px;cursor: pointer">成为开发者</span>
      <span style="margin-left: 24px;cursor: pointer">关于我们 </span>
    </div>

    <div class="header-col header-btn" style="margin-left: 20px">
      <router-link to="/login" class="nav-link">
        <a-button size="small" type="primary" class="px-30 border-dark" shape="round">企业登录</a-button>
      </router-link>
    </div>
    <div class="header-col header-btn" style="margin-left: 20px">
      <a-button size="small" type="dark" class="px-30 border-dark" shape="round">开发者登录</a-button>
    </div>
  </a-layout-header>

</template>

<script>
import cookie from 'js-cookie'
import {loginOut, memberInfo, getRecruiterInfo} from '@/services/api.js'
import {removeAccessToken} from "@/services/accessToken";
export default {
  data() {
    return {
      token: false,
      logo: require("@/../public/images/icons/title.png"),
      defaultLogo: require('@/../public/images/login-logo.png'),
      menuList: [],
      cookie: cookie.get('accessToken'),
      current: ['DeveloperRecommendationDetails'],
      typeId: "",
      realName: "",
      realHeadImgUrl: ""
    }
  },
  mounted() {
    if (this.cookie) {
      this.token = true;
      this.getMemberInfo()
    }
    this.getMenuList()
  },
  created() {
    if (this.$route.matched.length > 0) {
      this.current = [this.$route.matched[0].name]
    }
  },
  watch: {
    $route(to) {
      if (this.cookie) {
        this.token = true;
      }
      if (to.matched[0].meta.showTitle) {
        this.current = [to.matched[0].name]
      } else {
        this.current = undefined
      }
    }
  },
  methods: {
    getMemberInfo() {
      memberInfo().then((res) => {
        if (res.data && res.data.typeId) {
          this.typeId = res.data.typeId
          this.realName = res.data.realName
          this.realHeadImgUrl = res.data.avatarUrl
        }
      })
    },
    backHome() {
      this.$router.push({name: 'Home'});
    },
    getMenuList() {
      this.$router.options.routes.map(item => {
        if (item.meta.showTitle) {
          this.menuList.push(item)
        }
      })

      getRecruiterInfo().then(res => {
        if(res.data.typeId !== 1) {
          this.menuList.pop()
        }
      })

      // if (localStorage.getItem("userInfo")) {
      //   if (!(Number(JSON.parse(localStorage.getItem("userInfo")).typeId) === 1)) {
      //     this.menuList.pop()
      //   }
      // }
    },
    toAccountCenter() {
      window.location.href = `${process.env.VUE_APP_ACCOUNT_URL}/#/account-center/info`
    },
    toEnterpriseCenter() {
      window.location.href = `${process.env.VUE_APP_ACCOUNT_URL}/#/company-center/info`
    },
    logout() {
      loginOut().then(res => {
        if(res.code === 200) {
          removeAccessToken()
          this.token = false
          localStorage.setItem("token", "");
          localStorage.setItem("userInfo", "");
          this.$store.commit("setToken", "");
          this.$store.commit("setUserInfo", "");
          // this.$router.push({name: 'Login'});
          window.location.href = `${process.env.VUE_APP_ACCOUNT_URL}/#/login/wx?redirect=${process.env.VUE_APP_LOGIN_URL}`
        }
      })
    },
    toManpowerPath() {
      window.location.href = `${process.env.VUE_APP_MIN_MANPOWER_URL}/#/homePage`
    },
  },
  computed: {
    // avatarUrl: function () {
    //   if (this.$store.state.userInfo.avatarUrl) {
    //     return this.$store.state.userInfo.avatarUrl;
    //   } else {
    //     return localStorage.getItem("avatarUrl")
    //   }
    // },
    // realName: function () {
    //   if (this.$store.state.userInfo.realName) {
    //     return this.$store.state.userInfo.realName;
    //   } else {
    //     return JSON.parse(localStorage.getItem("userInfo")).realName || '';
    //   }
    // }
  }
}

</script>

<style lang="scss" scoped>
.ant-layout-header::v-deep {
  min-width: 1280px;
}

.layout-default .ant-layout-header::v-deep {
  height: 72px;
  display: flex;
  align-items: center;
  box-shadow: none;
  border: 1px solid #FFFFFF;
  box-sizing: border-box;
  backdrop-filter: blur(25px);

  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;

  .logo {
    height: 32px;
    width: auto;
    cursor: pointer;
  }

  .ant-menu-item {
    margin-right: 32px;
  }

  .header-nav {
    .ant-menu-horizontal {
      text-align: right;

      img {
        width: 24px;
        height: 24px;
      }

      .ant-menu-item {
        color: #7E89A3;
        font-size: 16px;
      }

      .ant-menu-item:hover {
        color: #4850FF;
      }

      .ant-menu-item-selected {
        color: #4850FF;
      }
    }
  }

}

.ant-dropdown-link {
  color: #005CFD;
  cursor: pointer;
}

.ant-menu-submenu-popup {
  width: 100%;
}
</style>
