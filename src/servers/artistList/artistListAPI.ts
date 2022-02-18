import zpRequest from "../index";

enum artistAPI {
  artistSortUrl = "/artist/list", //歌手分类地址
}
/* 请求歌手分类数据 */
export function getArtistTag(params: any) {
  return zpRequest.get({
    isLoading: true,
    url: artistAPI.artistSortUrl,
    params,
  });
}
