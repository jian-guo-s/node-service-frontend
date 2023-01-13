import router from "./router";
import {message} from "ant-design-vue";
import {getRecruiterInfo, memberInfo } from "./services/api";
import cookie from 'js-cookie'
import {setAccessToken} from "./services/accessToken";

const whiteList = ['/login/wx','/login/phone', '/login/bind-phone', '/page/privacy', '/page/agreement', '/page/article', '/page/personal_info_list', '/page/guide_page', '/page/homepage_phone', '/page/homepage_pc', '/app/page/homepage_phone', '/page/register', '/page/register-successful', '/mobile','/page/sign_contract','/test']
const completeInfoList = ['CompleteUserInfo', 'CheckVerificationCode']
const newCompanyList = ['FrameworkAgreement', 'CompleteUserInfo', 'NewCompany', 'CheckVerificationCode']

router.beforeEach(async (to, from, next) => {
  localStorage.setItem("routerName", to.path)
  if (to.meta.title) {
    document.title = '天天数链.人力' + to.meta.title;
  } else {
    document.title = '天天数链.人力';
  }
  // console.log(cookie.get('accessToken'),'getcookie')
  if (cookie.get('accessToken') && document.body.offsetWidth > 980) {
    // if (localStorage.getItem("token") && document.body.offsetWidth > 980) {

    if(whiteList.indexOf(to.path) !== -1) {
      next()
      return
    }

    memberInfo().then(res => {
      // console.log(res)
      const typeId = res.data.typeId
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      localStorage.setItem("avatarUrl", res.data.avatarUrl);

      if(typeId === 2) {
        getRecruiterInfo().then((res) => {
          if(res.code === 200) {
            // localStorage.setItem("userInfo", JSON.stringify(res.data));
            // localStorage.setItem("avatarUrl", res.data.avatarUrl);
            localStorage.setItem("status", res.data.status);
          }

          switch (Number(localStorage.getItem("status"))) {
            case 1:
              if (newCompanyList.indexOf(to.name) === -1) {
                message.warning("该路径目前不可访问,请先完善信息")
                next({name: 'CompleteUserInfo'});
              } else {
                next()
              }
              break;
            case 2:
              if (newCompanyList.indexOf(to.name) === -1) {
                message.warning("该路径目前不可访问,请先完善信息")
                next({
                  name: 'CompleteUserInfo',
                  query: {
                    realName: res.data.realName,
                    position: res.data.position,
                    companyName: res.data.companyName,
                    id: res.data.companyId,
                    email: res.data.email
                  }
                });
              } else {
                next()
              }
              break;
            case 3:
              if (completeInfoList.indexOf(to.name) === -1) {
                next()
              } else {
                message.warning("该路径目前不可访问")
                next(false)
              }
              break;
          }
        }).catch(err => {
          localStorage.setItem("preRouter", to.path)
          // window.location.href = 'http://localhost:9999/#/login/phone?redirect=http://localhost:8081/#/developer-recommendation/index'
          window.location.href = `${process.env.VUE_APP_ACCOUNT_URL}/#/login/wx?redirect=${process.env.VUE_APP_LOGIN_URL}`
          message.destroy()
          message.warning("请先登录")
        })
      } else {
        //   去升级
        if(to.path === '/developer-recommendation/index') {
          next(`/page/upgrade`)
        } else {
          next()
        }
      }
    })
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
      // in the free login whitelist, go directly
    } else {
      localStorage.setItem("preRouter", to.path)
      // next(`/login/wx`)
      // window.location.href = 'http://localhost:9999/#/login/phone?redirect=http://localhost:8081/#/developer-recommendation/index'
      window.location.href = `${process.env.VUE_APP_ACCOUNT_URL}/#/login/wx?redirect=${process.env.VUE_APP_LOGIN_URL}`
      message.destroy()
      message.warning("请先登录")
    }
  }

})

router.afterEach(() => {
  window.scrollTo(0, 0);
})





