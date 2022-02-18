import axios from "axios";
import zpRequest from "../index";

enum videoAPI {
  /* 视频分类数据 */
  videoTagRUrl = "/video/category/list", //获取视频基本标签
  videoTagUrl = "/video/group/list", //获取视频所有标签
  videoListUrl = "/video/group", //获取标签下分类视频
  videoAllListUrl = "/video/timeline/all", //获取分类下所有视频

  /* 视频详情数据 */
  videoDetail = "/video/detail", //视频详情
  videoPlayer = "/video/url", //视频播放地址
  videoComment = "/comment/video", //视频评论数据 vid
  videoRelated = "/related/allvideo", //相关视频数据

  /* mv详情数据 */
  mvDetail = "/mv/detail", //mv详情
  mvPlayer = "/mv/url", //视频播放地址
  mvComment = "/comment/mv", //mv评论数据 vid
  mvRelated = "/simi/mv", //相关视频数据
}
/* 请求基本标签数据,需要登录 */
export function getVideoTageR() {
  return zpRequest.get({
    url: videoAPI.videoTagRUrl,
  });
}
/* 请求视频所有分类数据 */
export function getVideoTag() {
  return zpRequest.get({
    url: videoAPI.videoTagUrl,
  });
}
/* 请求分类下的视频列表数据,默认显示9104数据*/
export function getVideoList(id: number, offset?: number) {
  return zpRequest.get({
    url: videoAPI.videoListUrl,
    params: {
      id,
      offset,
    },
  });
}
/* 请求所有视频列表数据,需要登录 */
export function getVideoAllList(offset?: number) {
  return zpRequest.get({
    url: videoAPI.videoAllListUrl,
    params: {
      offset,
    },
  });
}
/* 请求视频/mv详情数据 */
export function getVideoDetail(data: any) {
  /* 类型为video请求video */
  if (data.type == "video") {
    return axios.all([
      zpRequest.get({ url: videoAPI.videoDetail, params: { id: data.id } }),
      zpRequest.get({ url: videoAPI.videoPlayer, params: { id: data.id } }),
      zpRequest.get({ url: videoAPI.videoRelated, params: { id: data.id } }),
    ]);
  }
  /* 否则请求mv */
  return axios.all([
    zpRequest.get({ url: videoAPI.mvDetail, params: { mvid: data.id } }),
    zpRequest.get({ url: videoAPI.mvPlayer, params: { id: data.id } }),
    zpRequest.get({ url: videoAPI.mvRelated, params: { mvid: data.id } }),
  ]);
}
/* 视频评论数据 */
export function getVideoComment(params: any) {
  return zpRequest.get({
    url: videoAPI.videoComment,
    params,
  });
}
/* mv评论数据 */
export function getMvComment(params: any) {
  return zpRequest.get({
    url: videoAPI.mvComment,
    params,
  });
}
