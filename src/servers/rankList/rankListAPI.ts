import zpRequest from "../index";

enum rankAPI {
  rankListUrl = "/toplist/detail", //榜单地址
  rankDetailListUrl = "/playlist/detail", //榜单详情地址
}
/* 请求榜单数据 */
export function getRankList() {
  return zpRequest.get({
    url: rankAPI.rankListUrl,
  });
}
/* 请求榜单详情数据,目前没用 */
export function getRankDetailList(id: number) {
  return zpRequest.get({
    url: rankAPI.rankDetailListUrl,
    params: {
      id,
    },
  });
}
