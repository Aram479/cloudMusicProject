import zpRequest from "../index";

enum listDetailAPI {
  /* 歌单数据 */
  playListDetailUrl = "/playlist/detail", //歌单详情地址,歌曲不完整
  listAllMusicUrl = "/playlist/track/all", //歌单所有歌曲地址
  listCommentUrl = "/comment/playlist", //歌单所有评论，需分页

  /* 歌手数据 */
  artistDetailUrl = "/artist/detail", //歌手详情数据
  artistAlbumUrl = "/artist/top/song", //歌手50首热门歌曲
  artistMvUrl = "/artist/mv", //歌手mv数据
  artistDescUrl = "/artist/desc", //歌手描述

  /* 专辑数据 */
  albumDetailUrl = "/album", //专辑详情，头部详情
  albumCmtUrl = '/comment/album', //专辑评论

  /* 单曲详情数据 */
  songDetailUrl = "/song/detail",
  lyricUrl = '/lyric'
}
/* 请求歌单详情数据,需登录 */
export function getPlayListDetai(id: number) {
  return zpRequest.get({
    url: listDetailAPI.playListDetailUrl,
    params: {
      id,
    },
  });
}
/* 请求歌单详情所有歌曲 */
export function getListAllMusic(params: any) {
  return zpRequest.get({
    url: listDetailAPI.listAllMusicUrl,
    params,
  });
}

/* 请求歌单所有评论，分页 */
export function getListCommentUrl(params: any) {
  return zpRequest.get({
    url: listDetailAPI.listCommentUrl,
    params,
  });
}

/* 请求歌手详情数据 */
export function getArtistDetail(id: number) {
  return zpRequest.get({
    url: listDetailAPI.artistDetailUrl,
    params: {
      id,
    },
  });
}

/* 请求歌手专辑数据 */
export function getArtistAlbum(id: number) {
  return zpRequest.get({
    url: listDetailAPI.artistAlbumUrl,
    params: {
      id,
    },
  });
}

/* 请求歌手MV数据 */
export function getArtistMv(id: number) {
  return zpRequest.get({
    url: listDetailAPI.artistMvUrl,
    params: {
      id,
    },
  });
}

/* 请求歌手描述数据 */
export function getArtistDesc(id: number) {
  return zpRequest.get({
    url: listDetailAPI.artistDescUrl,
    params: {
      id,
    },
  });
}

/* 请求专辑详情数据 */
export function getAlbumDetail(id: number) {
  return zpRequest.get({
    url: listDetailAPI.albumDetailUrl,
    params: {
      id,
    },
  });
}

/* 请求专辑详情数据 */
export function getAlbumCmt(params: any) {
  return zpRequest.get({
    url: listDetailAPI.albumCmtUrl,
    params,
  });
}

/* 请求单曲详情数据 */
export function getSongsDetail(ids: number|string) {
  return zpRequest.get({
    isLoading:true,
    url: listDetailAPI.songDetailUrl,
    params:{
      ids,
    }
  });
}

/* 请求单曲歌词数据 */
export function getLyric(id: number) {
  return zpRequest.get({
    url: listDetailAPI.lyricUrl,
    params:{
      id,
    }
  });
}
