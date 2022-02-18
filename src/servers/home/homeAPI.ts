import zpRequest from "../index";

enum homeAPI {
  homeSwiperUrl = "/banner", //轮播图数据地址
  commendPlayListUrl = "/personalized", //歌单数据地址
  alonePlayListUrl = "/personalized/privatecontent/list", //独家放送
  newMusicUrl = "/personalized/newsong", //最新音乐地址
  commendMvUrl = "/personalized/mv", //推荐mv地址
  djprogramUrl = "/dj/personalize/recommend", //主播电台
}
/* 请求页面数据 */
export function getHomeSwiper() {
  return zpRequest.get({
    url: homeAPI.homeSwiperUrl,
    params: {
      type: 0,
    },
  });
}
/* 获取推荐歌单数据 */
export function getHomeCmddPlayList() {
  return zpRequest.get({
    url: homeAPI.commendPlayListUrl,
    params: {
      limit: 10,
    },
  });
}
/* 获取独家放送数据 */
export function getAlonePlayList(limit:number = 4,offset:number = 0) {
  return zpRequest.get({
    url: homeAPI.alonePlayListUrl,
    params: {
      limit,
      offset
    },
  });
}
/* 获取最新音乐数据 */
export function getnewMusicList() {
  return zpRequest.get({
    url: homeAPI.newMusicUrl,
  });
}
/* 获取推荐mv数据 */
export function getCmdMvList() {
  return zpRequest.get({
    url: homeAPI.commendMvUrl,
  });
}
/* 获取主播数据 */
export function getDjprogramList() {
  return zpRequest.get({
    url: homeAPI.djprogramUrl,
    params: {
      limit: 6,
    },
  });
}
