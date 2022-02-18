import zpRequest from "../index";

enum searchAPI {
  searchUrl = "/search/suggest", //搜索信息：专辑、歌手、音乐、歌单
  hotSearchUrl = "/search/hot/detail", //热搜，详细
  searchTypeUrl = "/search", //各种类型数据
}
/* 请求搜索数据 */
export function getSearchInfo(keywords: string) {
  return zpRequest.get({
    url: searchAPI.searchUrl,
    params: {
      keywords,
    },
  });
}
/* 请求热搜数据 */
export function getHotSearch() {
  return zpRequest.get({
    url: searchAPI.hotSearchUrl,
  });
}

/* 请求各种类型数据 */
export function getSearchType(params: any) {
  return zpRequest.get({
    url: searchAPI.searchTypeUrl,
    params,
  });
}
