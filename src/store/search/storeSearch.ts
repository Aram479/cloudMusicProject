import { Module } from "vuex";
import { IRootState, IsearchState } from "../types";
import { getSearchInfo, getHotSearch, getSearchType } from "@/servers/search/searchAPI";
const searchModule: Module<IsearchState, IRootState> = {
  namespaced: true,
  state() {
    return {
      searchInfo: {}, //搜索信息：热搜、专辑、歌手、音乐、歌单
      searchTypeInfo:{},
      searchHot:[]
    };
  },
  getters: {},
  mutations: {
    /* 存储搜索数据 */
    setSearchInfo(state, data: any) {
      state.searchInfo = data;
    },
    /* 存储热搜数据 */
    setHotInfo(state, hot: any[]) {
      state.searchHot = hot;
    },
    /* 存储搜索类型数据 */
    setSearchTypeInfo(state, type: any) {
      /* 提取叫count的key,存入total */
      for(const key in type){
        state.searchTypeInfo[key] = type[key];
        if(~key.indexOf('Count')){
          state.searchTypeInfo.total = type[key]
        }
      }
    },
  },
  actions: {
    /* 获取搜索数据 */
    async getSearchInfo({ state,commit }, keywords: string) {
      state.searchInfo = {}
      const { result: res } = await getSearchInfo(keywords);
      commit("setSearchInfo", res);
    },
    /* 获取热搜数据 */
    async getHotSearch({ state,commit }) {
      const { data: res } = await getHotSearch();
      commit("setHotInfo", res);
    },
    /* 获取各种搜索类型数据 */
    async getSearchType({ state,commit },payload:any) {
      state.searchTypeInfo = {}
      const {result:res}  = await getSearchType(payload);
      commit("setSearchTypeInfo", res);
    },
  },
};

export default searchModule;
