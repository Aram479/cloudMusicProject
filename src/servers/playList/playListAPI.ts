import zpRequest from "../index";

enum playListAPI {
  playListTagUrl = "/playlist/catlist",
  playListUrl = "/top/playlist", //歌单列表页面地址
  /* 用户歌单列表 */
  userSheet = '/user/playlist'
}
/* 请求页面数据 */
export function getPlayListTag() {
  return zpRequest.get({
    url: playListAPI.playListTagUrl,
  });
}
/* 请求页面数据 */
export function getPlayList(params: any) {
  return zpRequest.get({
    url: playListAPI.playListUrl,
    params,
  });
}

/* 请求用户歌单数据 */
export function getUserSheet(params: any) {
  return zpRequest.get({
    url: playListAPI.userSheet,
    params,
  });
}
