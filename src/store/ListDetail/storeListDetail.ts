import { Module } from "vuex";
import { IRootState, IDetailState } from "../types";
import {
  getPlayListDetai,
  getListAllMusic,
  getListCommentUrl,
  getArtistDetail,
  getArtistAlbum,
  getArtistMv,
  getArtistDesc,
  getAlbumDetail,
  getAlbumCmt,
} from "@/servers/allListDetail/listDetailAPI";
const listDetailModule: Module<IDetailState, IRootState> = {
  namespaced: true,
  state() {
    return {
      listDetail: {}, //歌单详细信息
      commentList: {}, //歌单所有评论信息
      artistDetail: {}, //歌手详情数据
      albumDetail: {}, //专辑详情数据
    };
  },
  getters: {},
  mutations: {
    /* 存储歌单详情 */
    setListDetail(state, listDetail: any) {
      state.listDetail = listDetail;
    },
    /* 为歌单详情添加所有歌曲数据 */
    setListDetailSong(state, songs: any[]) {
      state.listDetail.tracks = songs;
    },
    /* 存储歌单所有评论 */
    setListCommentUrl(state, commentList: any) {
      state.commentList.comments = commentList.comments; //全部评论
      state.commentList.hotComments = commentList.hotComments; //热门评论
      state.commentList.total = commentList.total; //评论总条数
    },

    /* 存储歌手详情 */
    setArtistDetail(state, artist: any) {
      state.artistDetail.artist = artist;
    },
    /* 存储歌手50首 */
    setArtistAlbum(state, album: any) {
      state.artistDetail.album = album;
    },
    /* 存储歌手mv */
    setArtistMv(state, mv: any) {
      state.artistDetail.mv = mv;
    },
    /* 存储歌手描述 */
    setArtistDesc(state, desc: any) {
      state.artistDetail.desc = desc;
    },
    /* 存储专辑详情 */
    setAlbumDetail(state, albumDetail: any) {
      state.albumDetail.detail = albumDetail;
    },
    /* 存储专辑评论 */
    setAlbumCmt(state, comment: any) {
      state.albumDetail.comments = comment; //全部评论
    },
  },
  actions: {
    /* 获取歌单详情接口数据 */
    async getPlayListDetai({ commit }, id: number) {
      const { playlist: res } = await getPlayListDetai(id);
      commit("setListDetail", res);
    },
    /* 获取歌单详情所有歌曲数据 */
    async getListAllMusic({ commit }, payload: any) {
      const { songs: res } = await getListAllMusic(payload);
      commit("setListDetailSong", res);
    },
    /* 获取歌单所有评论 */
    async getListCommentUrl({ commit }, payload: any) {
      const res = await getListCommentUrl(payload);
      commit("setListCommentUrl", res);
    },

    /* 歌手详情数据 */
    async getArtistDetail({ commit }, id: number) {
      const { data: res } = await getArtistDetail(id);
      commit("setArtistDetail", res.artist);
    },
    /* 歌手50首数据 */
    async getArtistAlbum({ commit }, id: number) {
      const { songs: res } = await getArtistAlbum(id);
      commit("setArtistAlbum", res);
    },
    /* 歌手Mv数据 */
    async getArtistMv({ commit }, id: number) {
      const { mvs: res } = await getArtistMv(id);
      commit("setArtistMv", res);
    },
    /* 歌手描述数据 */
    async getArtistDesc({ commit }, id: number) {
      const { introduction: res } = await getArtistDesc(id);
      commit("setArtistDesc", res);
    },
    /* 专辑详情数据 */
    async getAlbumDetail({ commit }, id: number) {
      const res = await getAlbumDetail(id);
      commit("setAlbumDetail", res);
    },
    /* 获取专辑所有评论 */
    async getAlbumCmt({ commit }, payload: any) {
      const res = await getAlbumCmt(payload);
      commit("setAlbumCmt", res);
    },
  },
};

export default listDetailModule;
