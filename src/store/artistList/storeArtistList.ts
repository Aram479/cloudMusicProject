import { Module } from "vuex";
import { IRootState, IArtistListState } from "../types";
import { getArtistTag } from "@/servers/artistList/artistListAPI";
import _ from "lodash";
const artistModule: Module<IArtistListState, IRootState> = {
  namespaced: true,
  state() {
    return {
      songerList: [], //歌手列表数据
    };
  },
  getters: {},
  mutations: {
    /* 存储歌手列表数据 */
    setArtistTag(state, songerList: any[]) {
      state.songerList = songerList;
    },
  },
  actions: {
    /* 获取歌手列表数据 */
    async getArtistTag({ commit }, payload: any) {
      const { artists: res } = await getArtistTag(payload);
      commit("setArtistTag", res);
    },
  },
};

export default artistModule;
