import { Module } from "vuex";
import { IRootState, ILatestState } from "../types";
import {
  getNewMusicList,
  getNewDiscList,
} from "@/servers/latestMusic/latestAPI";
const rankModule: Module<ILatestState, IRootState> = {
  namespaced: true,
  state() {
    return {
      newMusicList: [],
      newDiscList: [],
    };
  },
  getters: {},
  mutations: {
    /* 存储新歌速递数据 */
    setNewMusicList(state, newMusicList: any[]) {
      state.newMusicList = newMusicList;
    },
    /* 存储新歌速递数据 */
    setNewDiscList(state, newDiscList: any[]) {
      state.newDiscList = newDiscList;
    },
  },
  actions: {
    /* 获取新歌速递数据 */
    async getNewMusicList({ commit }, type) {
      const { data: res } = await getNewMusicList(type);
      commit("setNewMusicList", res);
    },
    /* 获取新碟上架数据 */
    async getNewDiscList({ commit }, payload: any) {
      const { monthData: res } = await getNewDiscList(payload);
      commit("setNewDiscList", res);
    },
  },
};

export default rankModule;
