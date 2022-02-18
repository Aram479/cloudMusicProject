import { Module } from "vuex";
import { IRootState, IRankListState } from "../types";
import { getRankList } from "@/servers/rankList/rankListAPI";
import { indexOf, qf, qq } from "@/hooks/rankList";
const rankModule: Module<IRankListState, IRootState> = {
  namespaced: true,
  state() {
    return {
      rankList: [], //榜单总数据
      officialList: [], //官方榜单
      styleList: [], //曲风榜
      globalList: [], //全球榜
    };
  },
  getters: {},
  mutations: {
    /* 存储歌单标签分类数据 */
    setRankList(state, rankList: any[]) {
      state.rankList = rankList;
      state.officialList = rankList.filter((item: any) => item.ToplistType);
      state.styleList = rankList.filter((item: any) => indexOf(item, qf));
      state.globalList = rankList.filter((item: any) => indexOf(item, qq));
    },
  },
  actions: {
    /* 获取榜单基本数据 */
    async getPlayListTag({ commit }) {
      const { list: res } = await getRankList();
      commit("setRankList", res);
    },
  },
};

export default rankModule;
