/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { getPlayListDetai,getAlbumDetail,getSongsDetail } from "@/servers/allListDetail/listDetailAPI";
import { IArtist } from "@/components/player/types/artists";
import { IListState } from "@/components/player/types/playerType";
import { ActionContext, Module } from "vuex";
import { IRootState } from "../types";
import {
  IPlayerState,
  IPlaylistDetail,
  IPlaySong,
  ISetSongListByIdsPayload,
  ISetSongListPayload,
  ISongDetail,
} from "@/components/player/types/player";

const ModulePlayer: Module<IPlayerState, IRootState> = {
  namespaced: true,
  state: (): IPlayerState => ({
    isPause: true /** 歌曲是否已暂停 */,
    playBackType: {
      listState: "icon-24gf-playlist3",
      listStateDesc: "顺序播放",
      listStateIcon: "icon-24gf-playlist3",
    },
    playBackTypeList: [
      {
        listState: "icon-24gf-playlist3",
        listStateDesc: "顺序播放",
        listStateIcon: "icon-24gf-playlist3",
      },
      {
        listState: "icon-xunhuanbofang",
        listStateDesc: "列表循环",
        listStateIcon: "icon-xunhuanbofang",
      },
      {
        listState: "icon-danquxunhuan",
        listStateDesc: "单曲循环",
        listStateIcon: "icon-danquxunhuan",
      },
      {
        listState: "icon-random",
        listStateDesc: "随机播放",
        listStateIcon: "icon-random",
      },
    ],
    volume: 0.6,
    currentDuration: 0,
    currentTime: 0,
    currentId:0,
    currentSong: undefined,
    songList: [],
    isShowSongDetail: false,
  }),
  mutations: {
    setIsPause(state: IPlayerState, isPause: boolean) {
      state.isPause = isPause;
    },
    setPlayBackType(state: IPlayerState, playBackType: IListState) {
      const result = state.playBackTypeList.findIndex(
        (listState) => listState.listState === playBackType.listState
      );
      if (result !== -1) {
        const currentIndex =
          result === state.playBackTypeList.length - 1 ? 0 : result + 1;
        state.playBackType = state.playBackTypeList[currentIndex];
      } else {
        state.playBackType = state.playBackTypeList[0];
      }
    },
    /**
     * 调整音量
     * @param volume 音量，0-1之间的数字
     */
    setVolume(state: IPlayerState, volume: number) {
      let volumeNum = 0;
      if (volume < 0) {
        volumeNum = 0;
      } else if (volume > 1) {
        volumeNum = 1;
      } else {
        volumeNum = volume;
      }
      state.volume = volumeNum;
    },
    /** 设置歌曲时长 */
    setCurrentDuration(state: IPlayerState, duration: number) {
      state.currentDuration = duration;
    },
    /** 设计歌曲播放到的时间点 */
    setCurrentTime(state: IPlayerState, time: number) {
      state.currentTime = time;
    },
    setCurrentSong(state: IPlayerState, song: IPlaySong | undefined) {
      state.isPause = false;
      state.currentSong = song;
      state.currentId = song!.id
    },
    setCurrentSongById(state: IPlayerState, songId: number) {
      state.isPause = false;
      state.currentSong = state.songList.find((song) => song.id === songId);
    },
    setCurrentSongByName(state: IPlayerState, songName: string) {
      state.isPause = false;
      state.currentSong = state.songList.find((song) => song.name === songName);
    },
    setCurrentSongByIndex(state: IPlayerState, index: number) {
      state.isPause = false;
      state.currentSong = state.songList[index];
    },
    setSongList(state: IPlayerState, list: IPlaySong[]) {
      state.songList = list;
    },
    /* 展示歌曲详情 */
    setIsShowSongDetail(state: IPlayerState, isShow: boolean) {
      state.isShowSongDetail = isShow;
    },
  },
  actions: {
    /** 根据id获取歌曲详情 */
    async setCurrentSong(
      context: ActionContext<IPlayerState, IRootState>,
      id: number
    ) {
      const {songs:songs} = await getSongsDetail(id)
      const songList: IPlaySong[] = songs.map((song:any) => ({
        id: song.id,
        name: song.name,
        subName: song.alia[0],
        coverImg: song.al.picUrl,
        album: {
          id: song.al.id,
          name: song.al.name,
          picUrl: song.al.picUrl,
        },
        artists: song.ar.map(
          (item:any) => ({ id: item.id, name: item.name } as IArtist)
        ),
        songUrl: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`,
      }));
      context.commit("setSongList", songList);
      context.commit("setCurrentSong", songList[0]);
    },
    async setSongListByIds(
      context: ActionContext<IPlayerState, IRootState>,
      payload: ISetSongListByIdsPayload
    ) {
      const { ids, currentId } = payload;
      const songIdStr = ids
        .map((id) => String(id))
        .reduce((initValue, currentValue) => initValue + "," + currentValue);
      // const songDetailUrl = `/api/song/detail?ids=${songIdStr}`;
      /** 根据id数组获取歌曲详情 */
      const {songs:songs} = await getSongsDetail(songIdStr)
      const songList: IPlaySong[] = songs.map((song:any) => ({
        id: song.id,
        name: song.name,
        subName: song.alia[0],
        coverImg: song.al.picUrl,
        album: {
          id: song.al.id,
          name: song.al.name,
          picUrl: song.al.picUrl,
        },
        artists: song.ar.map(
          (item:any) => ({ id: item.id, name: item.name } as IArtist)
        ),
        songUrl: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`,
        duration: Math.floor((song.dt || 0) / 1000),
      }));
      context.commit("setSongList", songList);
      if (currentId) {
        const currentSong = songList.find((song) => song.id === currentId);
        context.commit("setCurrentSong", currentSong);
      } else {
        context.commit("setCurrentSong", songList[0]);
      }
    },
    /** 根据id获取歌单的歌曲详情 */
    async setSongList(
      context: ActionContext<IPlayerState, IRootState>,
      payload: ISetSongListPayload
    ) {
      const { id, noSetCurrentSong } = payload;
      /** 根据id获取歌单详情 */
      const {playlist:playlist} = await getPlayListDetai(id)
      const songIdStr = playlist.trackIds
        .map((item:any) => String(item.id))
        .reduce((initValue:any, currentValue:any) => initValue + "," + currentValue);
      // const songDetailUrl = `/api/song/detail?ids=${songIdStr}`;
      /** 根据id数组获取歌曲详情 */
      const {songs:songs} = await getSongsDetail(songIdStr)

      const songList: IPlaySong[] = songs.map((song:any) => ({
        id: song.id,
        name: song.name,
        subName: song.alia[0],
        coverImg: song.al.picUrl,
        album: {
          id: song.al.id,
          name: song.al.name,
          picUrl: song.al.picUrl,
        },
        artists: song.ar.map(
          (item:any) => ({ id: item.id, name: item.name } as IArtist)
        ),
        songUrl: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`,
        duration: Math.floor((song.dt || 0) / 1000),
      }));
      context.commit("setSongList", songList);
      if (!noSetCurrentSong) {
        context.commit("setCurrentSong", songList[0]);
      }
    },
    /** 清空播放列表 */
    async setSongListByAlbumId(
      context: ActionContext<IPlayerState, IRootState>,
      albumId: number
    ) {
      /** 根据专辑id获取专辑下的歌曲id，并设置第一首歌为当前播放的歌曲 */
      const albumSongs = await getAlbumDetail(albumId)
      const albumSongIds = albumSongs.map((song:any) => song.id);
      const currentId = albumSongIds[0];
      const songIdStr = albumSongIds
        .map((id:number) => String(id))
        .reduce((initValue:any, currentValue:any) => initValue + "," + currentValue);
      // const songDetailUrl = `/api/song/detail?ids=${songIdStr}`;
      /** 根据id数组获取歌曲详情 */
      const {songs:songs} = await getSongsDetail(songIdStr)
      const songList: IPlaySong[] = songs.map((song:any) => ({
        id: song.id,
        name: song.name,
        subName: song.alia[0],
        coverImg: song.al.picUrl,
        album: {
          id: song.al.id,
          name: song.al.name,
          picUrl: song.al.picUrl,
        },
        artists: song.ar.map(
          (item:any) => ({ id: item.id, name: item.name } as IArtist)
        ),
        songUrl: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`,
        duration: Math.floor((song.dt || 0) / 1000),
      }));
      context.commit("setSongList", songList);
      if (currentId) {
        const currentSong = songList.find((song) => song.id === currentId);
        context.commit("setCurrentSong", currentSong);
      } else {
        context.commit("setCurrentSong", songList[0]);
      }
    },
  },
  getters: {},
};

export default ModulePlayer;
