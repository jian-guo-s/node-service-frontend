
import { login } from '@/api/work/index.js'
import { logout, getUserInfo } from '@/api/personalCenter/index.js'
import { getAccessToken, setAccessToken, removeAccessToken, getRefreshToken, setRefreshToken, removeRefreshToken } from '@/utils/auth'
import { getEquipment } from '@/utils/common.js'
import jwtDecode from "jwt-decode";
const user = {
    state: {
        access_token: getAccessToken(),
        refresh_token: getRefreshToken(),
        name: '',
        avatar: '',
    },

    mutations: {
        SET_ACCESS_TOKEN: (state, access_token) => {
            state.access_token = access_token
        },
        SET_REFRESH_TOKEN: (state, refresh_token) => {
            state.refresh_token = refresh_token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        changeAvatar(state, value) {
            state.avatar = value
        }
    },

    actions: {
        // 登录
        Login({ commit }, data) {
            return new Promise((resolve, reject) => {
                login(data).then(res => {
                    // console.log(res);
                    setAccessToken(res.access_token)
                    setRefreshToken(res.refresh_token)
                    commit('SET_ACCESS_TOKEN', res.access_token)
                    commit('SET_REFRESH_TOKEN', res.refresh_token)
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        GetUserinfo({ commit }) {
            const tokenData = jwtDecode(getRefreshToken())
            sessionStorage.setItem('tokenData', JSON.stringify(tokenData))
            return new Promise((resolve, reject) => {
                getUserInfo({ userId: tokenData.additionalInfo.userId }).then(res => {
                    // console.log(res, '90909')
                    const user = res.data
                    const avatar = user.headImgUrl ? user.headImgUrl : require("@/assets/svg/userInfo.svg");
                    commit('SET_NAME', user.username)
                    commit('SET_AVATAR', avatar)
                    localStorage.setItem("userInfomation", JSON.stringify(res.data))
                    resolve(res)
                }).catch(error => {
                    removeAccessToken()
                    removeRefreshToken()
                    sessionStorage.clear()
                    const path = getEquipment()
                    if(path === 'mobile'){
                        window.location.reload()
                    } else {
                        window.location.href = '/home'
                    }
                    // console.log(error, '用户信息错误')
                    reject(error)
                })
            })
        },


        // 退出系统
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_ACCESS_TOKEN', '')
                    commit('SET_REFRESH_TOKEN', '')
                    removeAccessToken()
                    removeRefreshToken()
                    sessionStorage.clear()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_ACCESS_TOKEN', '')
                commit('SET_REFRESH_TOKEN', '')
                removeAccessToken()
                removeRefreshToken()
                resolve()
            })
        }
    }
}

export default user

