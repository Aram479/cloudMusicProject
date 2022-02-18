import { Module } from "vuex";
import { IRootState, IVideoState } from "../types";
import {
  getVideoTageR,
  getVideoTag,
  getVideoList,
  getVideoAllList,
  getVideoDetail,
  getVideoComment,
  getMvComment,
} from "@/servers/video/videoAPI";
import _ from "lodash";
const videoModule: Module<IVideoState, IRootState> = {
  namespaced: true,
  state() {
    return {
      tagRList: [], //基本标签
      tagList: [], //视频标签分类数据
      videoList: [], //视频列表
      videoAllList: [], //全部视频列表
      errMsg: "", // 暂无推荐提示
      videoDetail: {}, //视频所有相关数据
    };
  },
  getters: {},
  mutations: {
    /* 存储视频标签分类数据 */
    setVideoTag(state, tagList: any[]) {
      state.tagList = tagList;
    },
    /* 存储分类下视频列表数据 */
    setVideoList(state, videoList: any[]) {
      state.videoList = videoList;
    },
    /* 存储基本分类数据 */
    setVideoTageR(state, tagRList: any[]) {
      state.tagRList = tagRList;
    },
    /* push视频列表数据 */
    pushVideoList(state, videoList: any[]) {
      state.videoList = [...state.videoList, ...videoList];
    },
    /* 存储视频详情数据 */
    setVideoDetail(state, videoDetail: any) {
      state.videoDetail.detail = videoDetail;
    },
    /* 存储视频评论 */
    setVideoComment(state, comment: any) {
      state.videoDetail.comment = comment;
    },
  },
  actions: {
    /* 获取视频标签分类数据 */
    async getVideoTag({ commit }) {
      const { data: res } = await getVideoTag();
      commit("setVideoTag", res);
    },
    /* 获取分类下视频列表数据 */
    async getVideoList({ state, commit }, payload: any) {
      const res = await getVideoList(payload.id, payload.offset);
      state.errMsg = res.msg;
      const data = res.datas.map((item: any) => item.data);
      /* 如果offset存在,则合并下一组数组 */
      if (payload.offset) {
        commit("pushVideoList", data);
        return;
      }
      commit("setVideoList", data);
    },
    /* 获取基本分类数据 */
    async getVideoTageR({ commit }) {
      const { data: res } = await getVideoTageR();
      commit("setVideoTageR", res);
    },
    /* 获取所有视频列表数据 */
    async getVideoAllList({ state, commit }, offset?: number) {
      const res = await getVideoAllList(offset);
      state.errMsg = res.msg;
      const data = res.datas.map((item: any) => item.data);
      /* 如果offset存在,合并下一组数据 */
      if (offset) {
        commit("pushVideoList", data);
        return;
      }
      commit("setVideoList", data);
    },
    /* 获取视频/mv详情页面数据 */
    async getVideoDetail({ state, commit }, payload: any) {
      state.videoDetail = {};
      const [detail, player, related] = await getVideoDetail(payload);
      commit("setVideoDetail", {
        info: detail.data,
        player: player.data || player.urls[0],
        related: related.mvs || related.data,
      });
    },
    /* 视频评论数据 */
    async getVideoComment({ commit }, payload: any) {
      const res = await getVideoComment(payload);
      commit("setVideoComment", res);
    },
    /* mv评论数据 */
    async getMvComment({ commit }, payload: any) {
      const res = await getMvComment(payload);
      commit("setVideoComment", res);
    },
  },
};

export default videoModule;
