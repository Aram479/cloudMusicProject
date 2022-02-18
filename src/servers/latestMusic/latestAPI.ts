import zpRequest from "../index";

enum latestAPI {
  newMusicUrl = "/top/song", //新歌速递地址
  newDiscUrl = "/top/album", //新碟上架地址
}
/* 请求新歌速递数据 */
export function getNewMusicList(type: number = 0) {
  return zpRequest.get({
    url: latestAPI.newMusicUrl,
    params: {
      type,
    },
  });
}
/* 请求新碟上架数据 */
export function getNewDiscList(params: any) {
  return zpRequest.get({
    url: latestAPI.newDiscUrl,
    params,
  });
}
