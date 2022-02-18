import { Module } from "vuex";
import { IRootState, IHomeState } from "../types";
import {
  getHomeSwiper,
  getHomeCmddPlayList,
  getAlonePlayList,
  getnewMusicList,
  getCmdMvList,
  getDjprogramList,
} from "@/servers/home/homeAPI";
const homeModule: Module<IHomeState, IRootState> = {
  namespaced: true,
  state() {
    return {
      swiperList: [], //轮播图数据
      commendList: [], //推荐歌单数据
      aloneList: [], //独家放送数据
      newMusicList: [], //最新音乐数据
      commendMvList: [], //推荐mv数据
      djprogramList: [], //主播电台数据
    };
  },
  getters: {},
  mutations: {
    /* 存储轮播图数据 */
    setSwiperList(state, swiperList: any[]) {
      state.swiperList = swiperList;
    },
    /* 存储推荐歌单数据 */
    setCommendList(state, commendList: any[]) {
      state.commendList = commendList;
    },
    /* 存储独家放送数据 */
    setAloneList(state, aloneList: any[]) {
      state.aloneList = aloneList;
    },
    /* 存储最新音乐数据 */
    setNewMusicList(state, newMusicList: any[]) {
      state.newMusicList = newMusicList;
    },
    /* 存储推荐mv数据 */
    setCmdMvList(state, commendMvList: any[]) {
      state.commendMvList = commendMvList;
    },
    /* 存储主播电台数据 */
    setDjprogramList(state, djprogramList: any[]) {
      state.djprogramList = djprogramList;
    },
  },
  actions: {
    /* 获取轮播图数据 */
    async getSwiperList({ commit }) {
      const { banners: res } = await getHomeSwiper();
      //调用方法存储轮播图数据
      commit("setSwiperList", res);
    },
    /* 获取推荐歌单数据 */
    async getCommendList({ commit }) {
      const { result: res } = await getHomeCmddPlayList();
      commit("setCommendList", res);
    },
    /* 获取独家放送数据 */
    async getAloneList({ commit }, payload?: any) {
      const { result: res } = await getAlonePlayList(
        payload?.limit,
        payload?.offset
      );
      commit("setAloneList", res);
    },
    /* 获取最新音乐数据 */
    async getnewMusicList({ commit }) {
      const { result: res } = await getnewMusicList();
      commit("setNewMusicList", res);
    },
    /* 获取推荐mv数据 */
    async getCmdMvList({ commit }) {
      const { result: res } = await getCmdMvList();
      commit("setCmdMvList", res);
    },
    /* 获取主播电台数据 */
    async getDjprogramList({ commit }) {
      const { data: res } = await getDjprogramList();
      commit("setDjprogramList", res);
    },
  },
};

export default homeModule;
