import { Module } from "vuex";
import { IRootState, ILoginState } from "../types";
import { getPhone,getLoginStatus,getLogout } from "@/servers/login/loginAPI";
import localCache from "@/utils/cache";
const rankModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userData: localCache.getCache('userInfo') || {},
      token: localCache.getCache("token"),
      loginResErr: "",
    };
  },
  getters: {},
  mutations: {
    setUserData(state, userData: any) {
      state.userData = userData;
    },
    logoutDelData(state){
      localCache.delCache('userInfo')
      localCache.delCache('token')
      state.userData = {}
      state.token = ''
    }
  },
  actions: {
    /* 获取手机登录接口数据 */
    async getPhone({ state, commit }, login: any) {
      //捕获错误次数过多异常，
      try {
        const res = await getPhone(login);
        //状态码为200则登陆成功
        if (res.code == 200) {
          localCache.setCache("token", res.token);
          localCache.setCache("userInfo", res.profile);
          commit("setUserData", res.profile);
        }
      } catch (err) {
        state.loginResErr = "错误次数过多,请稍后再试！";
      }
      return getPhone(login);
    },
    /* 获取登录状态 */
    async getLoginStatus({state,commit}){
      const {data:res} = await getLoginStatus()
      if(res.account == null) {
        commit('logoutDelData') //清空登录数据
      }
    },
    /* 退出登录 */
    async getLogout({state,commit}){
      commit('logoutDelData')
      await getLogout()
    }
  },
};

export default rankModule;
