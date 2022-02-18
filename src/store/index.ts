import { createStore } from "vuex";
import { IRootState } from "./types";
import createPersistedState from "vuex-persistedstate"; //持久存储到localStorage
import Home from "./home/storeHome";
import PlayList from "./playList/storePlayList";
import RankList from "./rankList/storeRankList";
import Artist from "./artistList/storeArtistList";
import Latest from "./latest/storeLatest";
import Video from "./video/storeVideo";
import Detail from "./ListDetail/storeListDetail";
import Search from "./search/storeSearch";
import player from "./player/storePlayer";
import Login from "./login/storeLogin";
const dataSet = createPersistedState({
  /** 被持久化的状态格式为：模块名.状态名 */
  paths: [
    /** 播放器 */
    "player.isPause",
    "player.playBackType",
    "player.playBackTypeList",
    "player.volume",
    "player.currentSong",
    "player.currentDuration",
    "player.currentTime",
    "player.songList",
    "player.isShowSongDetail",
    "PlayList.userSheet",
  ],
});
const store = createStore<IRootState>({
  state() {
    return {};
  },
  mutations: {},
  actions: {},
  modules: {
    Home,
    PlayList,
    RankList,
    Artist,
    Latest,
    Video,
    Detail,
    Search,
    player,
    Login,
  },
  plugins: [dataSet],
});
export default store;
