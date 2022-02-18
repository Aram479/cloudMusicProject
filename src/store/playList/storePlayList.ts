import { Module } from "vuex";
import { IRootState, IPlayListState } from "../types";
import {
  getPlayListTag,
  getPlayList,
  getUserSheet,
} from "@/servers/playList/playListAPI";
import localCache from "@/utils/cache";
import _ from "lodash";
const playModule: Module<IPlayListState, IRootState> = {
  namespaced: true,
  state() {
    return {
      tagList: [], //歌单标签分类数据
      playList: [], //歌单数据
      userSheet: [], //用户歌单
      total: 0, //歌单总数量
    };
  },
  getters: {},
  mutations: {
    /* 存储歌单标签分类数据 */
    setPlayListTag(state, tagList: any[]) {
      state.tagList = tagList;
    },
    /* 存储歌单列表数据 */
    setPlayList(state, playListInfo: any) {
      state.playList = playListInfo.playlists;
      state.total = playListInfo.total;
    },
    /* 存储用户歌单数据 */
    setUserSheet(state, userSheet: any[]) {
      state.userSheet = userSheet;
    },
  },
  actions: {
    /* 获取歌单标签分类数据 */
    async getPlayListTag({ commit }) {
      const { sub: res } = await getPlayListTag();
      commit("setPlayListTag", res);
    },
    /* 获取精品歌单数据 */
    async getPlayList({ commit }, payload) {
      const res = await getPlayList(payload);
      commit("setPlayList", res);
    },
    /* 获取用户歌单数据 */
    async getUserSheet({ commit }, payload) {
      const userInfo = localCache.getCache("userInfo");
      if (userInfo) {
        const { playlist: res } = await getUserSheet(payload);
        const create = res.filter(
          (item: any) => item.userId == userInfo.userId
        );
        const collect = res.filter(
          (item: any) => item.userId !== userInfo.userId
        );
        commit("setUserSheet", { create, collect });
      }
    },
  },
};

export default playModule;
